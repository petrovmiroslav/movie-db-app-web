import React from "react";
import { PageLayout } from "../layouts/PageLayout/PageLayout";
import { PageHeader } from "../components/PageHeader/PageHeader";
import { GetStaticPropsType, PageWithLayout } from "../utils/next";
import { Language } from "../sections/Settings/Language/Language";
import { getServerSideTranslations } from "../utils/i18n/i18n";
import { useTranslation } from "next-i18next";
import css from "../sections/Settings/Settings.module.scss";

export const getStaticProps: GetStaticPropsType = async (context) => {
  return {
    props: {
      ...(await getServerSideTranslations({
        locale: context.locale,
        ns: ["settings"],
      })),
    },
  };
};

const Settings: PageWithLayout = () => {
  const { t } = useTranslation("common");

  return (
    <div className={css.container}>
      <PageHeader>{t("tabs.settings")}</PageHeader>

      <Language />
    </div>
  );
};

Settings.getLayout = (page) => {
  return <PageLayout>{page}</PageLayout>;
};

export default Settings;
