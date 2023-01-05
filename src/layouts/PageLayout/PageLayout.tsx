import React from "react";
import { cn, commonCss } from "../../utils/styles";
import { PageTabBar } from "../../components/PageTabBar/PageTabBar";
import css from "./PageLayout.module.scss";

export type PageLayoutProps = {
  children: React.ReactNode;
};

export const PageLayout = (props: PageLayoutProps) => {
  const { children } = props;

  return (
    <div className={cn(commonCss.contentContainer, css.container)}>
      <PageTabBar />

      <main className={cn(css.main)}>{children}</main>
    </div>
  );
};
