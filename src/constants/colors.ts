import colors from "../styles/colors.module.scss";

type Colors = {
  PRIMARY: string;
  SECONDARY: string;

  BACKGROUND_LIGHT: string;
  BACKGROUND_MEDIUM: string;
  BACKGROUND_DARK: string;

  FONT_LIGHT: string;
};

export const Colors = colors as Colors;
