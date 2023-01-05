import React from "react";
import {
  MovieCardHorizontal,
  MovieCardHorizontalProps,
} from "../../../../components/MovieCardHorizontal/MovieCardHorizontal";
import { TitleMovieCard } from "../../../../components/texts/TitleMovieCard/TitleMovieCard";
import { OriginalTitleMovieCard } from "../../../../components/texts/OriginalTitleMovieCard/OriginalTitleMovieCard";
import {
  convertMinutesToDuration,
  formatDurationToDigitsString,
  getFormattedDateMonthYear,
  getFormattedDateYear,
} from "../../../../utils/dates";
import { GenresNames } from "../../../../components/texts/GenresNames/GenresNames";
import { getRoundedVote } from "../../../../utils/strings";
import { Favorite } from "../../../../features/favorites/favorites.types";
import { useQuery } from "@tanstack/react-query";
import { moviesQueries } from "../../../../features/movies/movies.queries";
import { AppendToResponse } from "../../../../features/movies/movies.api";
import { MovieId } from "../../../../features/movies/movies.types";
import css from "./FavoriteItem.module.scss";
import { typeCheckers } from "../../../../utils/types";

type FavoriteItemProps = {
  className?: string;
} & Favorite &
  Pick<MovieCardHorizontalProps, "baseUrl" | "sizesList" | "priority">;

export const FavoriteItem = React.memo<FavoriteItemProps>((props) => {
  const { className, entityId, date, baseUrl, sizesList, priority } = props;

  const movieId = Number(entityId) as MovieId;

  const { data: movieData } = useQuery(
    moviesQueries.movie({ movieId, includes: [AppendToResponse.IMAGES] })
  );

  const {
    title,
    originalTitle,
    releaseDate,
    genres,
    genresIds,
    voteAverage,
    runtime,
    posterPath,
  } = movieData ?? {};

  const releaseDateFormatted = getFormattedDateYear(releaseDate);

  const formattedDuration =
    typeCheckers.numberFinite(runtime) &&
    formatDurationToDigitsString(convertMinutesToDuration(runtime));

  const formattedFavoriteDate = getFormattedDateMonthYear(date);

  return (
    <MovieCardHorizontal
      className={className}
      id={movieId}
      baseUrl={baseUrl}
      sizesList={sizesList}
      posterPath={posterPath}
      priority={priority}
    >
      <TitleMovieCard>{title}</TitleMovieCard>

      <OriginalTitleMovieCard>
        {originalTitle}
        {originalTitle && releaseDateFormatted && ", "}
        {releaseDateFormatted}
      </OriginalTitleMovieCard>

      <GenresNames
        className={css.genres}
        genreList={genres}
        genreIdList={genresIds}
      />

      <div className={css.row}>
        {voteAverage !== undefined && (
          <p className={css.voteAverage}>
            {getRoundedVote(voteAverage)}{" "}
            <span className={css.duration}>{formattedDuration}</span>
          </p>
        )}

        <p className={css.favoriteDate}>{formattedFavoriteDate}</p>
      </div>
    </MovieCardHorizontal>
  );
});

FavoriteItem.displayName = "FavoriteItem";
