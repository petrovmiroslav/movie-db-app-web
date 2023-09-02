import React from "react";
import { useTranslation } from "next-i18next";
import { cn, commonCss } from "../../../utils/styles";
import css from "./TitleMovieCard.module.scss";

export type TitleMovieCardProps = React.HTMLAttributes<HTMLParagraphElement>;

export const TitleMovieCard = (props: TitleMovieCardProps) => {
  const { className, ...restProps } = props;

  const { t } = useTranslation(["common"]);

  return (
    <p
      className={cn(commonCss.ellipsisMultiline, css.title, className)}
      title={t("components.TitleMovieCard.title")}
      {...restProps}
    />
  );
};
