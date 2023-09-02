import "i18next";
import common from "../public/locales/en/common.json";
import home from "../public/locales/en/home.json";
import discover from "../public/locales/en/discover.json";
import settings from "../public/locales/en/settings.json";
import search from "../public/locales/en/search.json";
import movie from "../public/locales/en/movie.json";

export const i18Resources = {
  common,
  home,
  discover,
  settings,
  search,
  movie,
} as const;

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: typeof i18Resources;
  }
}
