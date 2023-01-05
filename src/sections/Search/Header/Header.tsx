import React, { useEffect, useRef, useState } from "react";
import { createInterpolation } from "../../../utils/interpolate";
import { PageHeaderLayout } from "../../../layouts/PageHeaderLayout/PageHeaderLayout";
import { roundTo } from "../../../utils/numbers";
import { throttle } from "../../../utils/functions";
import {
  TextInput,
  TextInputProps,
} from "../../../components/inputs/TextInput/TextInput";
import { Icons } from "../../../components/Icons/Icons";
import { cn, commonCss } from "../../../utils/styles";
import css from "./Header.module.scss";
import { useHeaderHeight } from "../../../hooks/useHeaderHeight";

const scrollHandlerDelay = 64;
const defaultShadowStyle = { opacity: 0 };

export type HeaderProps = {
  searchInputValue: TextInputProps["value"];
  onSearchInputValueChange: TextInputProps["onValueChange"];
};

export const Header = React.memo<HeaderProps>((props) => {
  const { searchInputValue, onSearchInputValueChange } = props;

  const [headerHeight] = useHeaderHeight();

  const [isClearButtonExpanded, setIsClearButtonExpanded] = useState(false);
  const [shadowStyle, setShadowStyle] = useState(defaultShadowStyle);

  const clearButtonRef = useRef<HTMLButtonElement>(null);

  const expandClearButton = () => {
    setIsClearButtonExpanded(true);
  };

  const collapseClearButton = () => {
    setIsClearButtonExpanded(false);
  };

  const onSearchInputClickHandler = () => {
    clearButtonRef.current?.blur();
    onSearchInputValueChange?.("");
    collapseClearButton();
  };

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

    const listener = throttle(scrollHandler, scrollHandlerDelay);

    window.addEventListener("scroll", listener, { passive: true });

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [headerHeight]);

  return (
    <PageHeaderLayout shadowStyle={shadowStyle}>
      <TextInput
        value={searchInputValue}
        onValueChange={onSearchInputValueChange}
        placeholder="Search"
        autoFocus={true}
        leftIcon={<Icons.Search className={css.icon} />}
        onFocus={expandClearButton}
        onBlur={collapseClearButton}
      />

      <button
        ref={clearButtonRef}
        className={cn(
          commonCss.interactive,
          css.clearButton,
          isClearButtonExpanded && css.clearButton__expanded
        )}
        onClick={onSearchInputClickHandler}
        onFocus={expandClearButton}
        onBlur={collapseClearButton}
      >
        <span className={css.clearButton__text}>clear</span>
      </button>
    </PageHeaderLayout>
  );
});

Header.displayName = "Header";
