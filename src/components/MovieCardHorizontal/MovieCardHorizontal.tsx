import React from "react";
import Link from "next/link";
import { Movie } from "../../features/movies/movies.types";
import { ImgProps } from "../Img/Img";
import { getMoviePagePath } from "../../constants/routing";
import { Poster } from "../Poster/Poster";
import { Icons } from "../Icons/Icons";
import { cn, commonCss } from "../../utils/styles";
import css from "./MovieCardHorizontal.module.scss";

export type MovieCardHorizontalProps = {
  children?: React.ReactNode;
  className?: string;
} & Movie &
  Pick<ImgProps, "baseUrl" | "sizesList" | "priority">;
export const MovieCardHorizontal = React.memo<MovieCardHorizontalProps>(
  (props) => {
    const {
      className,
      id,
      title = "",
      posterPath,
      baseUrl,
      sizesList,
      children,
      priority,
    } = props;

    return (
      <Link
        className={cn(commonCss.interactive, css.card, className)}
        href={getMoviePagePath(id)}
      >
        <Poster
          className={css.poster}
          title={title}
          baseUrl={baseUrl}
          sizesList={sizesList}
          posterPath={posterPath}
          sizes="10vw"
          priority={priority}
        />

        <div className={css.content}>{children}</div>

        <Icons.ArrowLeft className={css.icon} />
      </Link>
    );
  }
);

MovieCardHorizontal.displayName = "MovieCardHorizontal";
