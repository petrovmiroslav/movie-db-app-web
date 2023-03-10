import React, { useEffect, useMemo, useState } from "react";
import { PageLayout } from "../layouts/PageLayout/PageLayout";
import { GetServerSidePropsType, PageWithLayout } from "../utils/next";
import { dehydrate, QueryClient } from "@tanstack/query-core";
import { configurationQueries } from "../features/configuration/configuration.queries";
import { useInfiniteQuery } from "@tanstack/react-query";
import { moviesQueries } from "../features/movies/movies.queries";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { useRouter } from "next/router";
import { typeCheckers } from "../utils/types";
import { getNextPageNumber } from "../utils/pagination";
import { InView } from "react-intersection-observer";
import { Movie } from "../features/movies/movies.types";
import { Results } from "../sections/Search/Results/Results";
import uniqBy from "lodash/uniqBy";
import css from "../sections/Search/Search.module.scss";
import { Header } from "../sections/Search/Header/Header";
import { genresQueries } from "../features/genres/genres.queries";

const debounceQueryDelay = 500;

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSidePropsType = async (context) => {
  const { query } = context;
  const { q = "" } = query ?? {};
  const qParam = typeCheckers.array(q) ? q.join() : q;

  const queryClient = new QueryClient();

  await Promise.allSettled([
    queryClient.prefetchQuery(configurationQueries.configuration),
    queryClient.prefetchInfiniteQuery(moviesQueries.search({ query: qParam })),
    queryClient.prefetchQuery(genresQueries.movie),
  ]);

  const queryClientDehydratedState = JSON.parse(
    JSON.stringify(dehydrate(queryClient))
  );

  return {
    props: {
      queryClientDehydratedState,
    },
  };
};

const Search: PageWithLayout = () => {
  const router = useRouter();
  const { q } = router.query;
  const initialQuery = typeCheckers.string(q) ? q : "";

  const [queryInputValue, setQueryInputValue] = useState(initialQuery);
  const trimmedQueryInputValue = queryInputValue.trim();
  const debouncedQuery = useDebouncedValue(
    trimmedQueryInputValue,
    debounceQueryDelay
  );
  const isTransitioning = trimmedQueryInputValue !== debouncedQuery;
  const queryParam = !isTransitioning ? debouncedQuery : "";

  const { data, fetchNextPage } = useInfiniteQuery({
    ...moviesQueries.search({ query: queryParam }),
    getNextPageParam: getNextPageNumber,
  });

  // const isPreloaderShown =
  //   (trimmedQueryInputValue && isTransitioning) || isLoading;

  const moviesList = useMemo<Movie[] | undefined>(() => {
    const pages = data?.pages;
    if (!pages?.length) return;

    const list = pages?.flatMap((page) => page?.results ?? []);

    return list && uniqBy(list, (movie) => movie.id);
  }, [data?.pages]);

  useEffect(() => {
    // sync query from state with url query
    const paramToReplace = trimmedQueryInputValue;
    if (initialQuery === paramToReplace) return;
    const pathname = router.pathname;
    const replace = router.replace;
    replace(
      {
        pathname,
        query: paramToReplace ? { q: paramToReplace } : undefined,
      },
      undefined,
      { scroll: false, shallow: true }
    );
  }, [trimmedQueryInputValue, router.replace, router.pathname, initialQuery]);

  return (
    <div className={css.container}>
      <Header
        searchInputValue={queryInputValue}
        onSearchInputValueChange={setQueryInputValue}
      />

      <Results moviesList={moviesList} />
      <InView
        rootMargin="0px 0px 100%"
        onChange={(inView) => inView && fetchNextPage()}
      />
    </div>
  );
};

Search.getLayout = (page) => {
  return <PageLayout>{page}</PageLayout>;
};

// noinspection JSUnusedGlobalSymbols
export default Search;
