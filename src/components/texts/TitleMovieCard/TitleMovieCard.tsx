import React from "react";
import { cn, commonCss } from "../../../utils/styles";
import css from "./TitleMovieCard.module.scss";

export type TitleMovieCardProps = React.HTMLAttributes<HTMLParagraphElement>;

export const TitleMovieCard = (props: TitleMovieCardProps) => {
  const { className, ...restProps } = props;

  return (
    <p
      className={cn(commonCss.ellipsisMultiline, css.title, className)}
      {...restProps}
    />
  );
};
