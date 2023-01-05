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
      aria-label={isFavorite ? "remove from favorites" : "add to favorites"}
      onClick={onClickHandler}
    >
      <Icons.FavoritesOutlined
        className={cn(commonCss.absoluteCenter, isFavorite && css.icon_hidden)}
      />
      <Icons.FavoritesFilled
        className={cn(commonCss.absoluteCenter, !isFavorite && css.icon_hidden)}
      />
    </button>
  );
});

FavoriteButton.displayName = "FavoriteButton";
