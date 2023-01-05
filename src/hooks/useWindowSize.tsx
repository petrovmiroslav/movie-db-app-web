import React, { useEffect, useState } from "react";
import { debounce } from "../utils/functions";

type WindowSize = Pick<Window, "innerWidth" | "innerHeight">;

const defaultWindowSize = {
  innerWidth: 0,
  innerHeight: 0,
};

const WindowSizeContext = React.createContext<WindowSize>(defaultWindowSize);

const getWindowSize = () => {
  if (typeof window === "undefined") return defaultWindowSize;
  return { innerWidth: window.innerWidth, innerHeight: window.innerHeight };
};

type WindowSizeContextProviderProps = {
  children?: React.ReactNode;
};
export const WindowSizeContextProvider = (
  props: WindowSizeContextProviderProps
) => {
  const { children } = props;

  const [windowSize, setWindowSize] = useState<WindowSize>(defaultWindowSize);

  useEffect(() => {
    setWindowSize(getWindowSize());

    const listener = debounce(() => {
      setWindowSize(getWindowSize());
    }, 16);

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  return (
    <WindowSizeContext.Provider value={windowSize}>
      {children}
    </WindowSizeContext.Provider>
  );
};

export const useWindowSize = () => {
  return React.useContext(WindowSizeContext);
};
