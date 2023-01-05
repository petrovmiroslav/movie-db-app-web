import React from "react";
import { PageLayout } from "../layouts/PageLayout/PageLayout";
import { PageHeader } from "../components/PageHeader/PageHeader";
import { GetServerSidePropsType, PageWithLayout } from "../utils/next";
import { dehydrate, QueryClient } from "@tanstack/query-core";
import { moviesQueries } from "../features/movies/movies.queries";
import { configurationQueries } from "../features/configuration/configuration.queries";
import { genresQueries } from "../features/genres/genres.queries";
import { ChartMovies } from "../sections/Home/ChartMovies/ChartMovies";
import {
  usePopularMovies,
  useTopRatedMovies,
} from "../features/movies/movies.hooks";
import { GenresSlider } from "../sections/Home/GenresSlider/GenresSlider";
import css from "../sections/Home/Home.module.scss";

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSidePropsType = async () => {
  const queryClient = new QueryClient();

  await Promise.allSettled([
    queryClient.prefetchQuery(configurationQueries.configuration),
    queryClient.prefetchInfiniteQuery(moviesQueries.popular),
    queryClient.prefetchInfiniteQuery(moviesQueries.topRated),
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

const Home: PageWithLayout = () => {
  return (
    <div className={css.container}>
      <PageHeader>Home</PageHeader>

      <ChartMovies header="Popular" useMoviesQuery={usePopularMovies} />
      <ChartMovies header="Top rated" useMoviesQuery={useTopRatedMovies} />

      <GenresSlider />
    </div>
  );
};

Home.getLayout = (page) => {
  return <PageLayout>{page}</PageLayout>;
};

// noinspection JSUnusedGlobalSymbols
export default Home;
