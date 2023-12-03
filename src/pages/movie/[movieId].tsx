import React, { useEffect, useState } from "react";
import { PageLayout } from "../../layouts/PageLayout/PageLayout";
import { useRouter } from "next/router";
import { AppendToResponse } from "../../features/movies/movies.api";
import { MovieId } from "../../features/movies/movies.types";
import {
  checkIsClientSideDataFetching,
  GetServerSidePropsType,
  PageWithLayout,
} from "../../utils/next";
import { dehydrate, QueryClient } from "@tanstack/query-core";
import { useQuery } from "@tanstack/react-query";
import { moviesQueries } from "../../features/movies/movies.queries";
import { configurationQueries } from "../../features/configuration/configuration.queries";
import { Hero } from "../../sections/Movie/Hero/Hero";
import { Content } from "../../sections/Movie/Content/Content";
import { Header } from "../../sections/Movie/Header/Header";
import { throttle } from "../../utils/functions";
import { genresQueries } from "../../features/genres/genres.queries";
import { getServerSideTranslations } from "../../utils/i18n/i18n";
import { getThemeFromCookiesSSR } from "../../features/theme/utils/utils";
import { typeCheckers } from "../../utils/types";
import css from "../../sections/Movie/Movie.module.scss";

const getScrollY = () => (typeof window !== "undefined" ? window.scrollY : 0);

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSidePropsType = async (context) => {
  const { query } = context;
  const { movieId: movieIdQueryParam } = query ?? {};

  const queryClient = new QueryClient();

  const movieId = Number(movieIdQueryParam);

  if (!typeCheckers.numberFinite<MovieId>(movieId)) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  if (!checkIsClientSideDataFetching(context)) {
    await Promise.allSettled([
      queryClient.prefetchQuery(configurationQueries.configuration),
      queryClient.prefetchQuery(
        moviesQueries.movie({
          movieId,
          language: context.locale,
          includes: [AppendToResponse.IMAGES],
        })
      ),
      queryClient.prefetchInfiniteQuery(
        moviesQueries.recommendations({ movieId, language: context.locale })
      ),
      queryClient.prefetchInfiniteQuery(
        moviesQueries.similar({ movieId, language: context.locale })
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
        ns: ["movie"],
      })),
      queryClientDehydratedState,
      themeSetting: getThemeFromCookiesSSR(context.req.cookies),
    },
  };
};

const Movie = () => {
  const router = useRouter();

  const { movieId: movieIdQueryParam } = router.query;

  const movieId = Number(movieIdQueryParam) as MovieId;

  const { data: movieData } = useQuery(
    moviesQueries.movie({
      movieId,
      language: router.locale,
      includes: [AppendToResponse.IMAGES],
    })
  );

  const {
    title = "",
    backdropPath,
    overview,
    tagline,
    images,
    originalTitle,
    releaseDate,
    runtime,
    voteAverage,
    genres,
    genresIds,
  } = movieData ?? {};
  const { backdrops, posters } = images ?? {};

  const [scrollY, setScrollY] = useState(0);
  const [heroImageVisibleHeight, setHeroImageVisibleHeight] = useState(0);

  useEffect(() => {
    // for header and hero image animation on scroll
    const scrollHandler = () => {
      setScrollY(getScrollY());
    };
    scrollHandler();

    const listener = throttle(scrollHandler, 16);

    window.addEventListener("scroll", listener, { passive: true });

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  return (
    <div className={css.container}>
      <Header scrollY={scrollY} heroImageVisibleHeight={heroImageVisibleHeight}>
        {title}
      </Header>

      <Hero
        id={movieId}
        title={title}
        backdropPath={backdropPath}
        originalTitle={originalTitle}
        voteAverage={voteAverage}
        runtime={runtime}
        releaseDate={releaseDate}
        genres={genres}
        genresIds={genresIds}
        scrollY={scrollY}
        heroImageVisibleHeight={heroImageVisibleHeight}
        setHeroImageVisibleHeight={setHeroImageVisibleHeight}
      />

      <Content
        id={movieId}
        title={title}
        tagline={tagline}
        overview={overview}
        posters={posters}
        backdrops={backdrops}
      />
    </div>
  );
};

const Page: PageWithLayout = () => {
  const router = useRouter();

  const { movieId: movieIdQueryParam } = router.query;

  return <Movie key={Number(movieIdQueryParam)} />;
};

Page.getLayout = (page) => {
  return <PageLayout>{page}</PageLayout>;
};

// noinspection JSUnusedGlobalSymbols
export default Page;
