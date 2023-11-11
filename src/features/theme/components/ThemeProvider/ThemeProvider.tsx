import React from "react";
import { ThemeSettingContext, ThemeSettingContextType } from "../../context";
import {
  DEFAULT_THEME,
  DEFAULT_THEME_SETTING,
  MEDIA_QUERY_DARK,
  Themes,
  ThemesSettingNames,
  ThemesSettings,
} from "../../constants";
import {
  CookiesKeys,
  getCookie,
  setClientCookies,
} from "../../../../utils/cookies/cookies";
import {
  checkSystemColorSchemeIsDark,
  checkThemeSettingValueIsThemeValue,
  checkThemeSettingValueIsValid,
} from "../../utils/utils";

export type ThemeProviderProps = React.PropsWithChildren<{
  themeSetting: ThemesSettings | null | undefined;
}>;

export const ThemeProvider = (props: ThemeProviderProps) => {
  const [themeSetting, setThemeSetting] = React.useState<ThemesSettings>(
    props.themeSetting ?? DEFAULT_THEME_SETTING
  );

  const [theme, setTheme] = React.useState<Themes>(() => {
    return checkThemeSettingValueIsThemeValue(themeSetting)
      ? themeSetting
      : DEFAULT_THEME;
  });

  const handleOnThemeChange = React.useCallback((nextTheme: Themes) => {
    setTheme(nextTheme);
    document.documentElement.classList.remove(
      ...Object.values(Themes).filter((themeValue) => themeValue !== nextTheme)
    );
    document.documentElement.classList.add(nextTheme);
  }, []);

  const handleOnThemeSettingChange = React.useCallback(
    (nextThemeSetting: ThemesSettings) => {
      setClientCookies({
        key: CookiesKeys.THEME_SETTING,
        value: nextThemeSetting,
      });
      setThemeSetting(nextThemeSetting);

      if (nextThemeSetting === ThemesSettingNames.SYSTEM) {
        handleOnThemeChange(
          checkSystemColorSchemeIsDark() ? Themes.DARK : Themes.LIGHT
        );
      } else {
        handleOnThemeChange(nextThemeSetting);
      }
    },
    [handleOnThemeChange]
  );

  const settingsContextValue = React.useMemo<ThemeSettingContextType>(
    () => ({
      theme,
      themeSetting,
      setThemeSetting: handleOnThemeSettingChange,
    }),
    [handleOnThemeSettingChange, theme, themeSetting]
  );

  React.useEffect(() => {
    // init states
    const themeSettingCookie =
      (getCookie(CookiesKeys.THEME_SETTING) as ThemesSettings) ||
      DEFAULT_THEME_SETTING;

    if (!checkThemeSettingValueIsValid(themeSettingCookie)) {
      return;
    }

    if (themeSettingCookie === ThemesSettingNames.SYSTEM) {
      handleOnThemeChange(
        checkSystemColorSchemeIsDark() ? Themes.DARK : Themes.LIGHT
      );
    } else {
      handleOnThemeChange(themeSettingCookie);
    }

    setThemeSetting(themeSettingCookie);
  }, [handleOnThemeChange]);

  React.useEffect(() => {
    // add change color preference listener
    if (themeSetting !== ThemesSettingNames.SYSTEM) return;

    const handleOnColorSchemeQueryListChange = (event: MediaQueryListEvent) => {
      handleOnThemeChange(event.matches ? Themes.DARK : Themes.LIGHT);
    };

    const systemColorSchemeQueryList = window.matchMedia(MEDIA_QUERY_DARK);

    systemColorSchemeQueryList.addEventListener(
      "change",
      handleOnColorSchemeQueryListChange
    );

    return () => {
      systemColorSchemeQueryList.removeEventListener(
        "change",
        handleOnColorSchemeQueryListChange
      );
    };
  }, [handleOnThemeChange, themeSetting]);

  return (
    <ThemeSettingContext.Provider value={settingsContextValue}>
      {props.children}
    </ThemeSettingContext.Provider>
  );
};
