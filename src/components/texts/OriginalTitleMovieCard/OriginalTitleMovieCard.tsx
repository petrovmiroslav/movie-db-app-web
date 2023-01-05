import React from "react";
import {
  TitleMovieCard,
  TitleMovieCardProps,
} from "../TitleMovieCard/TitleMovieCard";
import { cn } from "../../../utils/styles";
import css from "./OriginalTitleMovieCard.module.scss";

type OriginalTitleMovieCardProps = TitleMovieCardProps;

export const OriginalTitleMovieCard = (props: OriginalTitleMovieCardProps) => {
  const { className, ...restProps } = props;

  return <TitleMovieCard className={cn(css.title, className)} {...restProps} />;
};
