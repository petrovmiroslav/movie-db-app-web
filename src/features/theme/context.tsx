import React from "react";
import {
  DEFAULT_THEME,
  DEFAULT_THEME_SETTING,
  Themes,
  ThemesSettings,
} from "./constants";

export type ThemeSettingContextType = {
  theme: Themes;
  themeSetting: ThemesSettings;
  setThemeSetting: (themeSetting: ThemesSettings) => void;
};

export const ThemeSettingContext = React.createContext<ThemeSettingContextType>(
  {
    theme: DEFAULT_THEME,
    themeSetting: DEFAULT_THEME_SETTING,
    setThemeSetting: () => {},
  }
);

export const useThemeSettingContext = () => {
  return React.useContext(ThemeSettingContext);
};
