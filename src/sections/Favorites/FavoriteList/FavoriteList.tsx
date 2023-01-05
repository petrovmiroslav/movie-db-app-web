import React from "react";
import { useImageConfiguration } from "../../../features/configuration/configuration.hooks";
import { FavoriteItem } from "./FavoriteItem/FavoriteItem";
import { Favorite } from "../../../features/favorites/favorites.types";
import { cn, commonCss } from "../../../utils/styles";
import css from "./FavoriteList.module.scss";

type FavoriteListProps = {
  favoriteList: Favorite[] | undefined;
};

export const FavoriteList = React.memo<FavoriteListProps>((props) => {
  const { favoriteList } = props;

  const { secureBaseUrl, posterSizes } = useImageConfiguration();

  return (
    <section className={cn(commonCss.contentContainer, css.container)}>
      {favoriteList?.map((movie, index) => (
        <FavoriteItem
          key={movie.id}
          className={css.item}
          baseUrl={secureBaseUrl}
          sizesList={posterSizes}
          priority={index < 4}
          {...movie}
        />
      ))}
    </section>
  );
});

FavoriteList.displayName = "FavoriteList";
