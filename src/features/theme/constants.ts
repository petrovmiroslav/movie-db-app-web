export enum Themes {
  LIGHT = "light",
  DARK = "dark",
}

export enum ThemesSettingNames {
  SYSTEM = "system",
}

export type ThemesSettings = Themes | ThemesSettingNames;

export const DEFAULT_THEME = Themes.DARK;
export const DEFAULT_THEME_SETTING = ThemesSettingNames.SYSTEM;
export const MEDIA_QUERY_DARK = "(prefers-color-scheme: dark)";
