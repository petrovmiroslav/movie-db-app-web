import React from "react";
import { FavoritesDictContext } from "./favorites.contexts";

export const useFavoritesDict = () => {
  return React.useContext(FavoritesDictContext);
};
