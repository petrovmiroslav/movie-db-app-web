import React, { useMemo, useState } from "react";

type HeaderHeightContextType = [
  headerHeight: number,
  setHeaderHeight: (height: number) => void
];

const HeaderHeightContext = React.createContext<HeaderHeightContextType>([
  0,
  () => {},
]);

type HeaderHeightContextProviderProps = { children?: React.ReactNode };

export const HeaderHeightContextProvider = (
  props: HeaderHeightContextProviderProps
) => {
  const { children } = props;

  const [headerHeight, setHeaderHeight] = useState(0);

  const contextValue = useMemo<HeaderHeightContextType>(
    () => [headerHeight, setHeaderHeight],
    [headerHeight]
  );

  return (
    <HeaderHeightContext.Provider value={contextValue}>
      {children}
    </HeaderHeightContext.Provider>
  );
};

export const useHeaderHeight = () => {
  return React.useContext(HeaderHeightContext);
};
