import React, { useMemo } from "react";
import { Favorite } from "./favorites.types";
import { useQuery } from "@tanstack/react-query";
import { favoritesQueries } from "./favorites.queries";

export type FavoritesDict = {
  [key: NonNullable<Favorite["entityId"]>]: Favorite | undefined;
};

export const createFavoritesDict = (
  favoriteList: Favorite[] | undefined
): FavoritesDict => {
  const dictionary: FavoritesDict = {};
  favoriteList?.forEach((favorite) => {
    if (favorite.entityId) {
      dictionary[favorite.entityId] = favorite;
    }
  });

  return dictionary;
};

export const FavoritesDictContext = React.createContext<FavoritesDict>({});

export const FavoritesDictContextProvider = (props: {
  children: React.ReactNode;
}) => {
  const { children } = props;

  const { data: favoriteList } = useQuery(favoritesQueries.list());

  const favoritesDict = useMemo(
    () => createFavoritesDict(favoriteList),
    [favoriteList]
  );

  return (
    <FavoritesDictContext.Provider value={favoritesDict}>
      {children}
    </FavoritesDictContext.Provider>
  );
};
