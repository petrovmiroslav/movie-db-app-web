import React from "react";
import type { AppProps as NextAppProps } from "next/app";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "../utils/styles";
import "../styles/index.scss";
import { ConfigurationContextProvider } from "../features/configuration/configuration.contexts";
import { AppProps, getLayoutFallback, PageWithLayout } from "../utils/next";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { FavoritesDictContextProvider } from "../features/favorites/favorites.contexts";
import { ReactQueryDevtoolsProd } from "../components/ReactQueryDevtoolsProd/ReactQueryDevtoolsProd";
import { GenresDictContextProvider } from "../features/genres/genres.contexts";
import { WindowSizeContextProvider } from "../hooks/useWindowSize";
import { HeaderHeightContextProvider } from "../hooks/useHeaderHeight";
import { AppHead } from "../components/AppHead/AppHead";

type CommonAppProps = {
  children: React.ReactNode;
};
export const CommonApp = (props: CommonAppProps) => {
  const { children } = props;

  return (
    <>
      <AppHead />

      <ConfigurationContextProvider>
        <FavoritesDictContextProvider>
          <GenresDictContextProvider>
            <WindowSizeContextProvider>
              <HeaderHeightContextProvider>
                {children}
              </HeaderHeightContextProvider>
            </WindowSizeContextProvider>
          </GenresDictContextProvider>
        </FavoritesDictContextProvider>
      </ConfigurationContextProvider>

      <ReactQueryDevtoolsProd />
    </>
  );
};

type AppPropsWithLayout = NextAppProps<AppProps> & {
  Component: PageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? getLayoutFallback;

  const { queryClientDehydratedState, ...restPageProps } = pageProps;

  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={queryClientDehydratedState}>
        <CommonApp>{getLayout(<Component {...restPageProps} />)}</CommonApp>
      </Hydrate>
    </QueryClientProvider>
  );
};

// noinspection JSUnusedGlobalSymbols
export default App;
