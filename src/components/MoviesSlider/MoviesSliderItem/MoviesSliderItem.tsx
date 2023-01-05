import React from "react";
import { Movie } from "../../../features/movies/movies.types";
import Link from "next/link";
import { getMoviePagePath } from "../../../constants/routing";
import { ImgProps } from "../../Img/Img";
import { GenresNames } from "../../texts/GenresNames/GenresNames";
import { getRoundedVote } from "../../../utils/strings";
import { Poster } from "../../Poster/Poster";
import { cn, commonCss } from "../../../utils/styles";
import css from "./MoviesSliderItem.module.scss";
import { TitleMovieCard } from "../../texts/TitleMovieCard/TitleMovieCard";

export type MoviesSliderItemProps = {} & Movie &
  Pick<ImgProps, "baseUrl" | "sizesList" | "priority">;

export const MoviesSliderItem = React.memo<MoviesSliderItemProps>((props) => {
  const {
    id,
    title = "",
    posterPath,
    voteAverage,
    genres,
    genresIds,
    baseUrl,
    sizesList,
    priority,
  } = props;

  return (
    <Link
      className={cn(commonCss.interactive, css.card)}
      href={getMoviePagePath(id)}
    >
      <Poster
        className={css.posterContainer}
        title={title}
        baseUrl={baseUrl}
        sizesList={sizesList}
        priority={priority}
        posterPath={posterPath}
        sizes="20vw"
      />

      <TitleMovieCard className={css.title}>{title}</TitleMovieCard>

      <GenresNames genreList={genres} genreIdList={genresIds} />

      {voteAverage !== undefined && (
        <p className={css.voteAverage}>{getRoundedVote(voteAverage)}</p>
      )}
    </Link>
  );
});

MoviesSliderItem.displayName = "MoviesSliderItem";
