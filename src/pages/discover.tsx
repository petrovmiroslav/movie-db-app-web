import React, { useEffect, useMemo, useState } from "react";
import { PageLayout } from "../layouts/PageLayout/PageLayout";
import { PageHeader } from "../components/PageHeader/PageHeader";
import {
  checkIsClientSideDataFetching,
  GetServerSidePropsType,
  PageWithLayout,
} from "../utils/next";
import { dehydrate, QueryClient } from "@tanstack/query-core";
import { configurationQueries } from "../features/configuration/configuration.queries";
import { useInfiniteQuery } from "@tanstack/react-query";
import { moviesQueries } from "../features/movies/movies.queries";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { useRouter } from "next/router";
import { DiscoverMovieApiParams } from "../features/movies/movies.api";
import { areObjectsEqual } from "../utils/objects";
import { getNextPageNumber } from "../utils/pagination";
import { Movie } from "../features/movies/movies.types";
import { Results } from "../sections/Discover/Results/Results";
import { InView } from "react-intersection-observer";
import uniqBy from "lodash/uniqBy";
import { genresQueries } from "../features/genres/genres.queries";
import { getServerSideTranslations } from "../utils/i18n/i18n";
import { useTranslation } from "next-i18next";
import { getThemeFromCookiesSSR } from "../features/theme/utils/utils";
import css from "../sections/Discover/Discover.module.scss";

const debounceQueryDelay = 800;

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSidePropsType = async (context) => {
  const { query } = context;

  const queryClient = new QueryClient();

  if (!checkIsClientSideDataFetching(context)) {
    await Promise.allSettled([
      queryClient.prefetchQuery(configurationQueries.configuration),
      queryClient.prefetchInfiniteQuery(
        moviesQueries.discover({ ...query, language: context.locale })
      ),
      queryClient.prefetchQuery(
        genresQueries.movie({ language: context.locale })
      ),
    ]);
  }

  const queryClientDehydratedState = JSON.parse(
    JSON.stringify(dehydrate(queryClient))
  );

  return {
    props: {
      ...(await getServerSideTranslations({
        locale: context.locale,
        ns: ["discover"],
      })),
      queryClientDehydratedState,
      themeSetting: getThemeFromCookiesSSR(context.req.cookies),
    },
  };
};

const Discover: PageWithLayout = () => {
  const router = useRouter();
  const { t } = useTranslation(["common", "discover"]);

  const initialParamsFromQuery = router.query; //todo number !== string ({gte: '8'})

  const [discoverParams] = useState<Omit<DiscoverMovieApiParams, "language">>(
    initialParamsFromQuery
  );

  const debouncedQuery = useDebouncedValue(discoverParams, debounceQueryDelay);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    ...moviesQueries.discover({ ...debouncedQuery, language: router.locale }),
    getNextPageParam: getNextPageNumber,
  });

  const moviesList = useMemo<Movie[] | undefined>(() => {
    const pages = data?.pages;
    if (!pages?.length) return;

    const list = pages?.flatMap((page) => page?.results ?? []);

    return list && uniqBy(list, (movie) => movie.id);
  }, [data?.pages]);

  useEffect(() => {
    // sync discover params from state with url query
    if (areObjectsEqual(initialParamsFromQuery, discoverParams)) return;

    const pathname = router.pathname;
    const replace = router.replace;
    replace(
      {
        pathname,
        query: discoverParams,
      },
      undefined,
      { scroll: false, shallow: true }
    );
  }, [discoverParams, initialParamsFromQuery, router.pathname, router.replace]);

  return (
    <div className={css.container}>
      <PageHeader withBackButton={true}>
        {t("header", { ns: "discover" })}
      </PageHeader>

      <Results moviesList={moviesList} />
      <InView
        rootMargin="0px 0px 100%"
        onChange={(inView) => inView && hasNextPage && fetchNextPage()}
      />
    </div>
  );
};

Discover.getLayout = (page) => {
  return <PageLayout>{page}</PageLayout>;
};

// noinspection JSUnusedGlobalSymbols
export default Discover;
