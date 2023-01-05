import React from "react";
import { Img, ImgProps } from "../Img/Img";
import { Movie } from "../../features/movies/movies.types";
import { cn } from "../../utils/styles";
import css from "./Poster.module.scss";

export type PosterProps = {
  className?: string;
} & Pick<Movie, "title" | "posterPath"> &
  Pick<ImgProps, "baseUrl" | "sizesList" | "sizes" | "priority">;

export const Poster = React.memo<PosterProps>((props) => {
  const {
    className,
    title = "",
    posterPath,
    sizes = "33vw",
    ...restImageProps
  } = props;
  return (
    <div className={cn(css.poster, className)}>
      <Img
        src={posterPath ?? ""}
        alt={title}
        sizes={sizes}
        {...restImageProps}
      />
    </div>
  );
});

Poster.displayName = "Poster";
