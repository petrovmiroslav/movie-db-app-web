import React from "react";
import Link from "next/link";
import { Genre } from "../../../../features/genres/genres.types";
import { cn, commonCss } from "../../../../utils/styles";
import css from "./GenresSliderItem.module.scss";

type GenresSliderItemProps = Genre;

export const GenresSliderItem = React.memo<GenresSliderItemProps>((props) => {
  const { id, name } = props;
  return (
    <Link
      className={cn(commonCss.interactive, css.item)}
      href={{
        pathname: "/discover",
        query: { with_genres: id },
      }}
    >
      <span className={css.text}>{name}</span>
    </Link>
  );
});

GenresSliderItem.displayName = "GenresSliderItem";
