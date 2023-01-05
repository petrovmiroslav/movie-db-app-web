import React, { useEffect, useState } from "react";
import { createInterpolation } from "../../utils/interpolate";
import { throttle } from "../../utils/functions";
import { roundTo } from "../../utils/numbers";
import { BackButton } from "../buttons/BackButton/BackButton";
import { PageHeaderLayout } from "../../layouts/PageHeaderLayout/PageHeaderLayout";
import { ScreenHeaderTitle } from "../texts/ScreenHeaderTitle/ScreenHeaderTitle";
import { cn } from "../../utils/styles";
import css from "./PageHeader.module.scss";
import { useHeaderHeight } from "../../hooks/useHeaderHeight";

const defaultShadowStyle = { opacity: 0 };

export type PageHeaderProps = {
  children?: React.ReactNode;
  withBackButton?: boolean;
};

export const PageHeader = React.memo<PageHeaderProps>((props) => {
  const { children, withBackButton } = props;

  const [headerHeight] = useHeaderHeight();

  const [shadowStyle, setShadowStyle] = useState(defaultShadowStyle);

  useEffect(() => {
    // header animation on scroll
    const interpolation = createInterpolation({
      inputRange: [0, headerHeight * 0.5],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    const scrollHandler = () => {
      const { scrollY } = window;
      const opacity = roundTo(interpolation(scrollY), 2);
      setShadowStyle((prevState) =>
        prevState.opacity !== opacity ? { opacity } : prevState
      );
    };

    // initial set up
    scrollHandler();

    const listener = throttle(scrollHandler, 64);

    window.addEventListener("scroll", listener, { passive: true });

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [headerHeight]);

  return (
    <PageHeaderLayout shadowStyle={shadowStyle}>
      {withBackButton && <BackButton />}

      <ScreenHeaderTitle
        className={cn(withBackButton && css.title_withReservedSpaceOnRight)}
      >
        {children}
      </ScreenHeaderTitle>
    </PageHeaderLayout>
  );
});

PageHeader.displayName = "PageHeader";
