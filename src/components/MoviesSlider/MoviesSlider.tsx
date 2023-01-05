import React, { useState } from "react";
import { Movie } from "../../features/movies/movies.types";
import { useImageConfiguration } from "../../features/configuration/configuration.hooks";
import { MoviesSliderItem } from "./MoviesSliderItem/MoviesSliderItem";
import { cn } from "../../utils/styles";
import css from "./MoviesSlider.module.scss";
import { InView } from "react-intersection-observer";

type MoviesSliderProps = {
  moviesList: Movie[] | undefined;
  onEndReached?: () => void;
  withImgPriority?: boolean;
};

export const MoviesSlider = React.memo<MoviesSliderProps>((props) => {
  const { moviesList, onEndReached, withImgPriority = false } = props;

  const [sliderRef, setSliderRef] = useState<HTMLDivElement | null>(null);

  const { secureBaseUrl, posterSizes } = useImageConfiguration();

  return (
    <div ref={setSliderRef} className={cn(css.slider)}>
      {moviesList?.map((movie, index) => (
        <MoviesSliderItem
          key={movie.id}
          baseUrl={secureBaseUrl}
          sizesList={posterSizes}
          priority={withImgPriority && index < 3}
          {...movie}
        />
      ))}

      {/* for infinite scroll*/}
      <InView
        root={sliderRef}
        rootMargin="0px 100% 0px 0px"
        onChange={(inView) => inView && onEndReached?.()}
      />
    </div>
  );
});
MoviesSlider.displayName = "MoviesSlider";
