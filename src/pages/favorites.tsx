import React from "react";
import { PageLayout } from "../layouts/PageLayout/PageLayout";
import { PageHeader } from "../components/PageHeader/PageHeader";
import { PageWithLayout } from "../utils/next";
import { useQuery } from "@tanstack/react-query";
import { favoritesQueries } from "../features/favorites/favorites.queries";
import { FavoriteList } from "../sections/Favorites/FavoriteList/FavoriteList";

const Favorites: PageWithLayout = () => {
  const { data: favoriteList } = useQuery(favoritesQueries.list());

  return (
    <>
      <PageHeader>Favorites</PageHeader>

      <FavoriteList favoriteList={favoriteList} />
    </>
  );
};

Favorites.getLayout = (page) => {
  return <PageLayout>{page}</PageLayout>;
};

export default Favorites;
