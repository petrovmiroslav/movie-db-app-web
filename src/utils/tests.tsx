import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { render } from "@testing-library/react";
import { CommonApp } from "../pages/_app";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18n, { i18n as I18NextClient } from "i18next";
import nextI18nextConfig from "../../next-i18next.config.js";
import { i18Resources } from "../../@types/i18next";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });

export const TestApp = (props: React.PropsWithChildren) => {
  const [testQueryClient] = React.useState(() => createTestQueryClient());

  const i18nClient: I18NextClient = React.useMemo(() => {
    const i18nConfig = nextI18nextConfig;

    const resources = i18Resources;

    const locale = i18nConfig.i18n.defaultLocale;

    const instance = i18n.createInstance();

    instance
      .use(initReactI18next)
      .init({
        ...i18nConfig.i18n,
        lng: locale,
        fallbackLng: locale,
        ns: Object.keys(resources),
        defaultNS: "common",
        interpolation: {
          escapeValue: false,
        },
        resources: { [locale]: resources },
      })
      .catch(console.error.bind(console));

    return instance;
  }, []);

  return (
    <I18nextProvider i18n={i18nClient}>
      <QueryClientProvider client={testQueryClient}>
        <CommonApp themeSetting={undefined}>{props.children}</CommonApp>
      </QueryClientProvider>
    </I18nextProvider>
  );
};

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();

  const getContent = (children: React.ReactElement) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );

  const { rerender, ...result } = render(getContent(ui));

  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(getContent(rerenderUi)),
  };
}
