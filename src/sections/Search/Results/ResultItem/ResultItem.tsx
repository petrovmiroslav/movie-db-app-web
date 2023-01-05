import React from "react";
import {
  MovieCardHorizontal,
  MovieCardHorizontalProps,
} from "../../../../components/MovieCardHorizontal/MovieCardHorizontal";
import { TitleMovieCard } from "../../../../components/texts/TitleMovieCard/TitleMovieCard";
import { OriginalTitleMovieCard } from "../../../../components/texts/OriginalTitleMovieCard/OriginalTitleMovieCard";
import { getFormattedDateYear } from "../../../../utils/dates";
import { GenresNames } from "../../../../components/texts/GenresNames/GenresNames";
import { getRoundedVote } from "../../../../utils/strings";
import css from "./ResultItem.module.scss";

type ResultItemProps = {
  className?: string;
} & Omit<MovieCardHorizontalProps, "children">;

export const ResultItem = React.memo<ResultItemProps>((props) => {
  const {
    title,
    originalTitle,
    releaseDate,
    genres,
    genresIds,
    voteAverage,
    ...restMovieCardHorizontalProps
  } = props;

  const releaseDateFormatted = getFormattedDateYear(releaseDate);

  return (
    <MovieCardHorizontal {...restMovieCardHorizontalProps}>
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

      {voteAverage !== undefined && (
        <p className={css.voteAverage}>{getRoundedVote(voteAverage)}</p>
      )}
    </MovieCardHorizontal>
  );
});

ResultItem.displayName = "ResultItem";
