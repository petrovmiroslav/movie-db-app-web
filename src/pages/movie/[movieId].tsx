import React, { useEffect, useState } from "react";
import { PageLayout } from "../../layouts/PageLayout/PageLayout";
import { useRouter } from "next/router";
import { AppendToResponse } from "../../features/movies/movies.api";
import { MovieId } from "../../features/movies/movies.types";
import { GetServerSidePropsType, PageWithLayout } from "../../utils/next";
import { dehydrate, QueryClient } from "@tanstack/query-core";
import { useQuery } from "@tanstack/react-query";
import { moviesQueries } from "../../features/movies/movies.queries";
import { configurationQueries } from "../../features/configuration/configuration.queries";
import { Hero } from "../../sections/Movie/Hero/Hero";
import { Content } from "../../sections/Movie/Content/Content";
import css from "../../sections/Movie/Movie.module.scss";
import { Header } from "../../sections/Movie/Header/Header";
import { throttle } from "../../utils/functions";
import { genresQueries } from "../../features/genres/genres.queries";

const getScrollY = () => (typeof window !== "undefined" ? window.scrollY : 0);

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSidePropsType = async (context) => {
  const { query } = context;
  const { movieId: movieIdQueryParam } = query ?? {};

  const queryClient = new QueryClient();

  const movieId = Number(movieIdQueryParam) as MovieId;

  await Promise.allSettled([
    queryClient.prefetchQuery(configurationQueries.configuration),
    queryClient.prefetchQuery(
      moviesQueries.movie({ movieId, includes: [AppendToResponse.IMAGES] })
    ),
    queryClient.prefetchInfiniteQuery(
      moviesQueries.recommendations({ movieId })
    ),
    queryClient.prefetchInfiniteQuery(moviesQueries.similar({ movieId })),
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

const Movie: PageWithLayout = () => {
  const router = useRouter();

  const { movieId: movieIdQueryParam } = router.query;

  const movieId = Number(movieIdQueryParam) as MovieId;

  const { data: movieData } = useQuery(
    moviesQueries.movie({ movieId, includes: [AppendToResponse.IMAGES] })
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

Movie.getLayout = (page) => {
  return <PageLayout>{page}</PageLayout>;
};

// noinspection JSUnusedGlobalSymbols
export default Movie;
