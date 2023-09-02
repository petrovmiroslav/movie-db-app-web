import React from "react";
import { SectionHeader } from "../../../components/headers/SectionHeader/SectionHeader";
import { useQuery } from "@tanstack/react-query";
import { genresQueries } from "../../../features/genres/genres.queries";
import { GenresSliderItem } from "./GenresSliderItem/GenresSliderItem";
import { cn, commonCss } from "../../../utils/styles";
import css from "./GenresSlider.module.scss";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export const GenresSlider = React.memo(() => {
  const { t } = useTranslation(["home"]);
  const router = useRouter();

  const { data: genres } = useQuery(
    genresQueries.movie({ language: router.locale })
  );

  return (
    <section className={cn(commonCss.contentContainer)}>
      <SectionHeader>{t("genres.header", { ns: "home" })}</SectionHeader>

      <div className={css.slider}>
        {genres?.map((genre) => (
          <GenresSliderItem key={genre.id} {...genre} />
        ))}
      </div>
    </section>
  );
});

GenresSlider.displayName = "GenresSlider";
