import React from "react";
import { useRouter } from "next/router";
import { Languages, LanguagesData } from "../../../utils/i18n/constants";
import { cn, commonCss } from "../../../utils/styles";
import { SectionHeader } from "../../../components/headers/SectionHeader/SectionHeader";
import { LanguageListItem } from "./LanguageListItem/LanguageListItem";
import { PrimaryButton } from "../../../components/buttons/PrimaryButton/PrimaryButton";
import css from "./Language.module.scss";
import { useTranslation } from "next-i18next";

export const Language = React.memo(() => {
  const router = useRouter();
  const { t } = useTranslation(["common", "settings"]);

  const [selectedLocale, setSelectedLocale] = React.useState(router.locale);

  const supportedLocales = React.useMemo(
    () =>
      router.locales
        ?.filter((locale): locale is Languages =>
          Boolean(LanguagesData[locale as keyof typeof LanguagesData])
        )
        .sort((localeA, localeB) => localeA.localeCompare(localeB)),
    [router.locales]
  );

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    document.cookie = `NEXT_LOCALE=${selectedLocale}; path=/; samesite=Lax; secure`;

    router
      .push({ pathname: router.pathname, query: router.query }, router.asPath, {
        locale: selectedLocale,
      })
      .catch(console.log.bind(console));
  };

  return (
    <section className={cn(commonCss.contentContainer)}>
      <SectionHeader>{t("language.header", { ns: "settings" })}</SectionHeader>

      <form className={css.form} onSubmit={handleOnSubmit}>
        {supportedLocales?.map((locale) => (
          <LanguageListItem
            key={locale}
            locale={locale}
            selected={selectedLocale === locale}
            onSelect={setSelectedLocale}
          />
        ))}

        <PrimaryButton className={css.submit} type="submit">
          {t("saveButtonText", { ns: "settings" })}
        </PrimaryButton>
      </form>
    </section>
  );
});
Language.displayName = "Language";
