import { NextApiRequestCookies } from "next/dist/server/api-utils";
import {
  MEDIA_QUERY_DARK,
  Themes,
  ThemesSettingNames,
  ThemesSettings,
} from "../constants";
import { CookiesKeys } from "../../../utils/cookies/cookies";

export const getThemeFromCookiesSSR = (
  cookies: NextApiRequestCookies
): ThemesSettings | null => {
  const maybeTheme = cookies[CookiesKeys.THEME_SETTING];

  if (!maybeTheme) return null;
  return maybeTheme as ThemesSettings;
};

export const checkThemeSettingValueIsThemeValue = (
  maybeThemeSetting: string
): maybeThemeSetting is Themes =>
  Object.values(Themes).includes(maybeThemeSetting as Themes);

export const checkThemeSettingValueIsValid = (
  maybeThemeSetting: string
): maybeThemeSetting is ThemesSettings => {
  return (
    checkThemeSettingValueIsThemeValue(maybeThemeSetting) ||
    Object.values(ThemesSettingNames).includes(
      maybeThemeSetting as ThemesSettingNames
    )
  );
};

export const checkSystemColorSchemeIsDark = () =>
  typeof window !== "undefined"
    ? window.matchMedia(MEDIA_QUERY_DARK).matches
    : false;
