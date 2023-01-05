import React from "react";
import { cn, commonCss } from "../../../utils/styles";
import { Icons } from "../../Icons/Icons";
import css from "./FavoriteButton.module.scss";
import { MovieId } from "../../../features/movies/movies.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addToFavoritesRequest,
  removeFromFavoritesRequest,
} from "../../../features/favorites/favorites.api";
import { favoritesQueries } from "../../../features/favorites/favorites.queries";
import { FavoritesTypes } from "../../../features/favorites/favorites.types";
import { useFavoritesDict } from "../../../features/favorites/favorites.hooks";

export const DEFAULT_ADD_TO_FAVORITES_LABEL_TEXT = "add to favorites";
export const DEFAULT_REMOVE_FROM_FAVORITES_LABEL_TEXT = "remove from favorites";
export const EMPTY_ICON_TEST_ID = "FavoriteButton__EMPTY_ICON_TEST_ID";
export const FILLED_ICON_TEST_ID = "FavoriteButton__FILLED_ICON_TEST_ID";

type FavoriteButtonProps = {
  movieId: MovieId;
  className?: string;
};

export const FavoriteButton = React.memo<FavoriteButtonProps>((props) => {
  const { movieId, className } = props;

  const queryClient = useQueryClient();

  const favoritesDict = useFavoritesDict();
  const favoriteId = favoritesDict?.[movieId]?.id;

  const isFavorite = !!favoriteId;

  const { mutate: addToFavorites } = useMutation({
    mutationFn: addToFavoritesRequest,
    onSuccess: () =>
      queryClient.invalidateQueries(favoritesQueries.list().queryKey),
  });

  const { mutate: removeFromFavorites } = useMutation({
    mutationFn: removeFromFavoritesRequest,
    onSuccess: () =>
      queryClient.invalidateQueries(favoritesQueries.list().queryKey),
  });

  const onClickHandler = () => {
    if (isFavorite) {
      return removeFromFavorites({ id: favoriteId });
    }

    addToFavorites({ type: FavoritesTypes.MOVIE, entityId: movieId });
  };

  return (
    <button
      className={cn(commonCss.interactive, css.button, className)}
      aria-label={
        isFavorite
          ? DEFAULT_REMOVE_FROM_FAVORITES_LABEL_TEXT
          : DEFAULT_ADD_TO_FAVORITES_LABEL_TEXT
      }
      onClick={onClickHandler}
    >
      <Icons.FavoritesOutlined
        data-testid={EMPTY_ICON_TEST_ID}
        className={cn(commonCss.absoluteCenter, isFavorite && css.icon_hidden)}
      />
      <Icons.FavoritesFilled
        data-testid={FILLED_ICON_TEST_ID}
        className={cn(commonCss.absoluteCenter, !isFavorite && css.icon_hidden)}
      />
    </button>
  );
});

FavoriteButton.displayName = "FavoriteButton";
