import React from "react";
import { PageLayout } from "../layouts/PageLayout/PageLayout";
import { PageHeader } from "../components/PageHeader/PageHeader";
import { GetStaticPropsType, PageWithLayout } from "../utils/next";
import { useQuery } from "@tanstack/react-query";
import { favoritesQueries } from "../features/favorites/favorites.queries";
import { FavoriteList } from "../sections/Favorites/FavoriteList/FavoriteList";
import { getServerSideTranslations } from "../utils/i18n/i18n";
import { useTranslation } from "next-i18next";

export const getStaticProps: GetStaticPropsType = async (context) => {
  return {
    props: {
      ...(await getServerSideTranslations({ locale: context.locale })),
    },
  };
};

const Favorites: PageWithLayout = () => {
  const { t } = useTranslation("common");

  const { data: favoriteList } = useQuery(favoritesQueries.list());

  return (
    <>
      <PageHeader>{t("tabs.favorites")}</PageHeader>

      <FavoriteList favoriteList={favoriteList} />
    </>
  );
};

Favorites.getLayout = (page) => {
  return <PageLayout>{page}</PageLayout>;
};

export default Favorites;
