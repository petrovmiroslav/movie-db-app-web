import React, { useMemo } from "react";
import { cn, commonCss } from "../../../utils/styles";
import { SectionHeader } from "../../../components/headers/SectionHeader/SectionHeader";
import { Movie } from "../../../features/movies/movies.types";
import { MoviesSlider } from "../../../components/MoviesSlider/MoviesSlider";
import {
  usePopularMovies,
  useTopRatedMovies,
} from "../../../features/movies/movies.hooks";
import uniqBy from "lodash/uniqBy";

export type ChartMoviesProps = {
  header: string;
  useMoviesQuery: typeof usePopularMovies | typeof useTopRatedMovies;
};

export const ChartMovies = React.memo<ChartMoviesProps>((props) => {
  const { header, useMoviesQuery } = props;

  const { data, fetchNextPage } = useMoviesQuery();

  const moviesList = useMemo<Movie[] | undefined>(() => {
    const pages = data?.pages;
    if (!pages?.length) return;

    const list = pages?.flatMap((page) => page?.results ?? []);

    return list && uniqBy(list, (movie) => movie.id);
  }, [data?.pages]);

  if (!moviesList?.length) return null;
  return (
    <section className={cn(commonCss.contentContainer)}>
      <SectionHeader>{header}</SectionHeader>

      <MoviesSlider
        moviesList={moviesList}
        onEndReached={fetchNextPage}
        withImgPriority={true}
      />
    </section>
  );
});

ChartMovies.displayName = "ChartMovies";
