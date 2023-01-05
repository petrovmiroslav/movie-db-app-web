import React from "react";
import { SectionHeader } from "../../../components/headers/SectionHeader/SectionHeader";
import { useQuery } from "@tanstack/react-query";
import { genresQueries } from "../../../features/genres/genres.queries";
import { GenresSliderItem } from "./GenresSliderItem/GenresSliderItem";
import { cn, commonCss } from "../../../utils/styles";
import css from "./GenresSlider.module.scss";

export const GenresSlider = React.memo(() => {
  const { data: genres } = useQuery(genresQueries.movie);

  return (
    <section className={cn(commonCss.contentContainer)}>
      <SectionHeader>Genres</SectionHeader>

      <div className={css.slider}>
        {genres?.map((genre) => (
          <GenresSliderItem key={genre.id} {...genre} />
        ))}
      </div>
    </section>
  );
});

GenresSlider.displayName = "GenresSlider";
