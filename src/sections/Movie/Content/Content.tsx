import React from "react";
import { cn, commonCss } from "../../../utils/styles";
import css from "./Content.module.scss";
import { Movie } from "../../../features/movies/movies.types";
import { MovieImagesSlider } from "./MovieImagesSlider/MovieImagesSlider";
import { Image } from "../../../features/images/images.types";
import { SuggestedMoviesSlider } from "./SuggestedMoviesSlider/SuggestedMoviesSlider";
import {
  useRecommendationsMovies,
  useSimilarMovies,
} from "../../../features/movies/movies.hooks";
import { useImageConfiguration } from "../../../features/configuration/configuration.hooks";

type ContentProps = {
  backdrops: Image[] | undefined;
  posters: Image[] | undefined;
} & Pick<Movie, "id" | "title" | "tagline" | "overview">;

export const Content = React.memo<ContentProps>((props) => {
  const {
    id,
    title,
    tagline,
    overview,

    backdrops,
    posters,
  } = props;

  const { secureBaseUrl, posterSizes, backdropSizes } = useImageConfiguration();

  return (
    <section className={cn(commonCss.contentContainer, css.container)}>
      {tagline && <p className={css.tagline}>{tagline}</p>}
      {overview && <p className={css.overview}>{overview}</p>}

      <MovieImagesSlider
        headerText="Posters"
        isPosters={true}
        title={title}
        baseUrl={secureBaseUrl}
        sizesList={posterSizes}
        imageList={posters}
      />

      <MovieImagesSlider
        headerText="Backdrops"
        title={title}
        baseUrl={secureBaseUrl}
        sizesList={backdropSizes}
        imageList={backdrops}
      />

      <SuggestedMoviesSlider
        headerText="Recommendations"
        movieId={id}
        useMoviesQuery={useRecommendationsMovies}
      />

      <SuggestedMoviesSlider
        headerText="Similar"
        movieId={id}
        useMoviesQuery={useSimilarMovies}
      />
    </section>
  );
});

Content.displayName = "Content";
