const { i18n } = require("../../next-i18next.config.js");

export const config = {
  MODE: process.env.NODE_ENV,
  IS_DEV: process.env.NODE_ENV === "development",
  V4_API_KEY: process.env.V4_API_KEY,
  BASE_URL: process.env.BASE_URL ?? "/api",
  MOCK_ENABLE: process.env.MOCK_ENABLE === "true",
  IS_TEST_RUNNING: Boolean(process.env.JEST_WORKER_ID),
  REACT_QUERY_DEVTOOLS_INITIAL_OPEN: Boolean(
    process.env.NEXT_PUBLIC_REACT_QUERY_DEVTOOLS_INITIAL_OPEN
  ),
  DEFAULT_LOCALE: i18n.defaultLocale,
};

config.IS_DEV &&
  !config.IS_TEST_RUNNING &&
  console.log({
    config,
  });
