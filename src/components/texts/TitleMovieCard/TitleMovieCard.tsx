import React from "react";
import { cn, commonCss } from "../../../utils/styles";
import css from "./TitleMovieCard.module.scss";
import { TITLE_MOVIE_CARD_TITLE_ATTRIBUTE_VALUE } from "../../../constants/e2e";

export type TitleMovieCardProps = React.HTMLAttributes<HTMLParagraphElement>;

export const TitleMovieCard = (props: TitleMovieCardProps) => {
  const { className, ...restProps } = props;

  return (
    <p
      className={cn(commonCss.ellipsisMultiline, css.title, className)}
      title={TITLE_MOVIE_CARD_TITLE_ATTRIBUTE_VALUE}
      {...restProps}
    />
  );
};
