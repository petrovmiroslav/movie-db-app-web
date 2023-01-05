import React, { useEffect, useMemo, useRef } from "react";
import { Img } from "../../../components/Img/Img";
import { Movie } from "../../../features/movies/movies.types";
import { getRoundedVote } from "../../../utils/strings";
import {
  convertMinutesToDuration,
  formatDurationToString,
  getFormattedDateYear,
} from "../../../utils/dates";
import { typeCheckers } from "../../../utils/types";
import { GenresNames } from "../../../components/texts/GenresNames/GenresNames";
import { FavoriteButton } from "../../../components/buttons/FavoriteButton/FavoriteButton";
import { cn, commonCss } from "../../../utils/styles";
import css from "./Hero.module.scss";
import { useImageConfiguration } from "../../../features/configuration/configuration.hooks";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { createInterpolation } from "../../../utils/interpolate";

const HERO_IMAGE_MAX_SCALE_VALUE = 1.5;
const HERO_IMAGE_MIN_SCALE_VALUE = 1;

type HeroProps = {
  scrollY: number;
  heroImageVisibleHeight: number;
  setHeroImageVisibleHeight: (heroImageVisibleHeight: number) => void;
} & Pick<
  Movie,
  | "id"
  | "title"
  | "originalTitle"
  | "backdropPath"
  | "voteAverage"
  | "releaseDate"
  | "runtime"
  | "genres"
  | "genresIds"
>;

export const Hero = React.memo<HeroProps>((props) => {
  const {
    id,
    title = "",
    originalTitle,
    backdropPath,
    voteAverage,
    releaseDate,
    runtime,
    genres,
    genresIds,
    scrollY,
    heroImageVisibleHeight,
    setHeroImageVisibleHeight,
  } = props;

  const { secureBaseUrl, posterSizes } = useImageConfiguration();
  const { innerHeight } = useWindowSize();

  const containerRef = useRef<HTMLDivElement>(null);

  const releaseDateFormatted = getFormattedDateYear(releaseDate) ?? "";

  const formattedDuration = typeCheckers.numberFinite(runtime)
    ? formatDurationToString(convertMinutesToDuration(runtime))
    : "";

  // for hero image animation on scroll
  const scaleInterpolation = useMemo(
    () =>
      createInterpolation({
        inputRange: [-heroImageVisibleHeight, heroImageVisibleHeight / 2],
        outputRange: [HERO_IMAGE_MAX_SCALE_VALUE, HERO_IMAGE_MIN_SCALE_VALUE],
        extrapolate: "clamp",
      }),
    [heroImageVisibleHeight]
  );

  const heroImageTransform = `translateZ(0) scale(${scaleInterpolation(
    scrollY
  )})`;

  useEffect(() => {
    // measure heroImageVisibleHeight
    if (!containerRef.current) return;
    setHeroImageVisibleHeight(containerRef.current.offsetHeight);
  }, [innerHeight, setHeroImageVisibleHeight]);

  return (
    <section className={cn(commonCss.contentContainer, css.container)}>
      <div
        ref={containerRef}
        className={css.imageContainer}
        style={{ transform: heroImageTransform }}
      >
        <Img
          className={cn(!heroImageVisibleHeight && css.image_hidden)}
          src={backdropPath ?? ""}
          alt={title}
          baseUrl={secureBaseUrl}
          sizesList={posterSizes}
          sizes="70vw"
          priority={true}
        />
      </div>

      <div className={css.content}>
        <h2 className={css.title}>{title}</h2>
        <p className={css.text}>
          {voteAverage !== undefined && (
            <span className={cn(css.text, css.text_vote)}>
              {getRoundedVote(voteAverage)}{" "}
            </span>
          )}
          {originalTitle}
        </p>

        <p className={css.text}>
          {releaseDateFormatted}
          {releaseDateFormatted && formattedDuration && ", "}
          {formattedDuration}
        </p>

        <GenresNames
          className={cn(css.text, css.text_genres)}
          genreList={genres}
          genreIdList={genresIds}
        />

        <FavoriteButton className={css.favoriteButton} movieId={id} />
      </div>
    </section>
  );
});

Hero.displayName = "Hero";
