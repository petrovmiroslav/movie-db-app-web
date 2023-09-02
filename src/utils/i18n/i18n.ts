import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SSRConfig } from "next-i18next";
import { config } from "../../constants/config";

export type I18nextSSRConfig = SSRConfig & {
  _nextI18Next: SSRConfig["_nextI18Next"];
};

export const getServerSideTranslations = async (params: {
  locale: string | undefined;
  ns?: string[];
}): Promise<I18nextSSRConfig> => {
  const initialLocale = params.locale ?? config.DEFAULT_LOCALE;
  const namespacesRequired = ["common", ...(params.ns ?? [])];

  const { _nextI18Next, ...rest } = await serverSideTranslations(
    initialLocale,
    namespacesRequired
  );

  return { _nextI18Next, ...rest };
};
