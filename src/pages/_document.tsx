import React from "react";
import { Head, Html, Main, NextScript } from "next/document";
import { DEFAULT_THEME } from "../features/theme/constants";
import Script from "next/script";

const Document = () => {
  return (
    <Html className={DEFAULT_THEME}>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script src="/scripts/theme.js" strategy="beforeInteractive" />
      </body>
    </Html>
  );
};
// noinspection JSUnusedGlobalSymbols
export default Document;
