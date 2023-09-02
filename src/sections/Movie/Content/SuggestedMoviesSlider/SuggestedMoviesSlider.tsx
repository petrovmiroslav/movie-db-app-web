import React, { useMemo } from "react";
import { SectionHeader } from "../../../../components/headers/SectionHeader/SectionHeader";
import { Movie, MovieId } from "../../../../features/movies/movies.types";
import { MoviesSlider } from "../../../../components/MoviesSlider/MoviesSlider";
import {
  useRecommendationsMovies,
  useSimilarMovies,
} from "../../../../features/movies/movies.hooks";
import css from "./SuggestedMoviesSlider.module.scss";
import uniqBy from "lodash/uniqBy";
import { useRouter } from "next/router";

type SuggestedMoviesSliderProps = {
  headerText: string;
  movieId: MovieId;
  useMoviesQuery: typeof useRecommendationsMovies | typeof useSimilarMovies;
};

export const SuggestedMoviesSlider = React.memo<SuggestedMoviesSliderProps>(
  (props) => {
    const { headerText, movieId, useMoviesQuery } = props;
    const router = useRouter();

    const { data, fetchNextPage } = useMoviesQuery({
      movieId,
      language: router.locale,
    });

    const moviesList = useMemo<Movie[] | undefined>(() => {
      const pages = data?.pages;
      if (!pages?.length) return;

      const list = pages?.flatMap((page) => page?.results ?? []);

      return list && uniqBy(list, (movie) => movie.id);
    }, [data?.pages]);

    if (!moviesList?.length) return null;
    return (
      <>
        <SectionHeader className={css.sectionHeader}>
          {headerText}
        </SectionHeader>

        <MoviesSlider
          moviesList={moviesList}
          onEndReached={fetchNextPage}
          withImgPriority={false}
        />
      </>
    );
  }
);

SuggestedMoviesSlider.displayName = "SuggestedMoviesSlider";
