import React from "react";
import { cn, commonCss } from "../../../utils/styles";
import css from "./ScreenHeaderTitle.module.scss";

type ScreenHeaderTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export const ScreenHeaderTitle = (props: ScreenHeaderTitleProps) => {
  const { className, ...restProps } = props;

  return (
    <h1
      className={cn(commonCss.ellipsis, css.title, className)}
      {...restProps}
    />
  );
};
