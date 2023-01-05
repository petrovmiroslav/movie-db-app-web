import React, { useMemo } from "react";
import { createInterpolation } from "../../../utils/interpolate";
import { PageHeaderLayout } from "../../../layouts/PageHeaderLayout/PageHeaderLayout";
import { BackButton } from "../../../components/buttons/BackButton/BackButton";
import { ScreenHeaderTitle } from "../../../components/texts/ScreenHeaderTitle/ScreenHeaderTitle";
import css from "./Header.module.scss";
import { useHeaderHeight } from "../../../hooks/useHeaderHeight";
import { cn } from "../../../utils/styles";

export type HeaderProps = {
  children?: React.ReactNode;
  scrollY: number;
  heroImageVisibleHeight: number;
};

export const Header = React.memo<HeaderProps>((props) => {
  const { children, scrollY, heroImageVisibleHeight } = props;

  const [headerHeight] = useHeaderHeight();

  const interpolation = useMemo(
    () =>
      createInterpolation({
        inputRange: [
          heroImageVisibleHeight - headerHeight - 10,
          heroImageVisibleHeight - headerHeight,
        ],
        outputRange: [0, 1],
        extrapolate: "clamp",
      }),
    [headerHeight, heroImageVisibleHeight]
  );

  const hiddenElementsOpacity = heroImageVisibleHeight
    ? interpolation(scrollY)
    : 0;

  const hiddenElementStyle = useMemo(
    () => ({ opacity: hiddenElementsOpacity }),
    [hiddenElementsOpacity]
  );

  return (
    <PageHeaderLayout
      shadowStyle={hiddenElementStyle}
      backgroundStyle={hiddenElementStyle}
    >
      <BackButton
        className={cn(
          hiddenElementsOpacity < 0.5 && css.backButton_insideHeaderTransparent
        )}
      />

      <ScreenHeaderTitle className={css.title} style={hiddenElementStyle}>
        {children}
      </ScreenHeaderTitle>
    </PageHeaderLayout>
  );
});

Header.displayName = "Header";
