import React from "react";
import { cn, commonCss } from "../../../utils/styles";
import { Icons } from "../../Icons/Icons";
import { MovieId } from "../../../features/movies/movies.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addToFavoritesRequest,
  removeFromFavoritesRequest,
} from "../../../features/favorites/favorites.api";
import { favoritesQueries } from "../../../features/favorites/favorites.queries";
import { FavoritesTypes } from "../../../features/favorites/favorites.types";
import { useFavoritesDict } from "../../../features/favorites/favorites.hooks";
import { Button } from "../Button/Button";
import { useTranslation } from "next-i18next";
import css from "./FavoriteButton.module.scss";

export const EMPTY_ICON_TEST_ID = "FavoriteButton__EMPTY_ICON_TEST_ID";
export const FILLED_ICON_TEST_ID = "FavoriteButton__FILLED_ICON_TEST_ID";

type FavoriteButtonProps = {
  movieId: MovieId;
  className?: string;
};

export const FavoriteButton = React.memo<FavoriteButtonProps>((props) => {
  const { movieId, className } = props;

  const queryClient = useQueryClient();
  const { t } = useTranslation(["common"]);

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
    <Button
      className={cn(css.button, className)}
      aria-label={
        isFavorite
          ? t("components.FavoriteButton.removeFromFavoritesAriaLabel")
          : t("components.FavoriteButton.addToFavoritesAriaLabel")
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
    </Button>
  );
});

FavoriteButton.displayName = "FavoriteButton";
