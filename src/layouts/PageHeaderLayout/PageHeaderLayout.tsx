import React from "react";
import { cn, commonCss } from "../../utils/styles";
import { useHeaderHeight } from "../../hooks/useHeaderHeight";
import { useWindowSize } from "../../hooks/useWindowSize";
import css from "./PageHeaderLayout.module.scss";

type PageHeaderLayoutProps = {
  children: React.ReactNode;
  className?: string;
  shadowClassName?: string;
  backgroundClassName?: string;
  shadowStyle?: React.CSSProperties;
  backgroundStyle?: React.CSSProperties;
};

export const PageHeaderLayout = (props: PageHeaderLayoutProps) => {
  const {
    children,
    className,
    shadowClassName,
    backgroundClassName,
    shadowStyle,
    backgroundStyle,
  } = props;

  const { innerWidth } = useWindowSize();
  const [, setHeaderHeight] = useHeaderHeight();

  const headerRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    setHeaderHeight(headerRef.current?.offsetHeight ?? 0);
  }, [innerWidth, setHeaderHeight]);

  return (
    <header
      ref={headerRef}
      className={cn(commonCss.contentContainer, css.pageHeader, className)}
    >
      <div
        className={cn(commonCss.absoluteCenter, css.shadow, shadowClassName)}
        style={shadowStyle}
      />

      <div
        className={cn(
          commonCss.absoluteCenter,
          css.background,
          backgroundClassName
        )}
        style={backgroundStyle}
      />

      {children}
    </header>
  );
};
