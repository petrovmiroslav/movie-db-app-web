import React from "react";
import { cn } from "../../../utils/styles";
import css from "./SectionHeader.module.scss";

type SectionHeaderProps = React.HTMLAttributes<HTMLHeadingElement>;

export const SectionHeader = React.memo<SectionHeaderProps>((props) => {
  const { children, className, ...restProps } = props;

  return (
    <h2 className={cn(css.header, className)} {...restProps}>
      {children}
    </h2>
  );
});

SectionHeader.displayName = "SectionHeader";
