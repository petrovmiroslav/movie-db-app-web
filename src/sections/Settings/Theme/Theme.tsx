import React from "react";
import { useTranslation } from "next-i18next";
import { cn, commonCss } from "../../../utils/styles";
import { SectionHeader } from "../../../components/headers/SectionHeader/SectionHeader";
import { PrimaryButton } from "../../../components/buttons/PrimaryButton/PrimaryButton";
import { useThemeSettingContext } from "../../../features/theme/context";
import { Themes, ThemesSettingNames } from "../../../features/theme/constants";
import { ThemeListItem } from "./ThemeListItem/ThemeListItem";

import css from "./Theme.module.scss";

const supportedThemeList = [
  ThemesSettingNames.SYSTEM,
  Themes.DARK,
  Themes.LIGHT,
];

export const Theme = React.memo(() => {
  const { t } = useTranslation(["common", "settings"]);
  const { themeSetting, setThemeSetting } = useThemeSettingContext();

  const [selectedThemeSetting, setSelectedThemeSetting] =
    React.useState(themeSetting);

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setThemeSetting(selectedThemeSetting);
  };

  React.useEffect(() => {
    setSelectedThemeSetting(themeSetting);
  }, [themeSetting]);

  return (
    <section className={cn(commonCss.contentContainer)}>
      <SectionHeader>{t("theme.header", { ns: "settings" })}</SectionHeader>

      <form className={css.form} onSubmit={handleOnSubmit}>
        {supportedThemeList?.map((theme) => (
          <ThemeListItem
            key={theme}
            theme={theme}
            selected={selectedThemeSetting === theme}
            onSelect={setSelectedThemeSetting}
          />
        ))}

        <PrimaryButton className={css.submit} type="submit">
          {t("saveButtonText", { ns: "settings" })}
        </PrimaryButton>
      </form>
    </section>
  );
});
Theme.displayName = "Theme";
