import React from "react";
import { Movie } from "../../../features/movies/movies.types";
import { ResultItem } from "./ResultItem/ResultItem";
import { useImageConfiguration } from "../../../features/configuration/configuration.hooks";
import { cn, commonCss } from "../../../utils/styles";
import css from "./Results.module.scss";

type ResultsProps = {
  moviesList: Movie[] | undefined;
};

export const Results = React.memo<ResultsProps>((props) => {
  const { moviesList } = props;

  const { secureBaseUrl, posterSizes } = useImageConfiguration();

  return (
    <section className={cn(commonCss.contentContainer)}>
      {moviesList?.map((movie, index) => (
        <ResultItem
          key={movie.id}
          className={css.resultItem}
          baseUrl={secureBaseUrl}
          sizesList={posterSizes}
          priority={index < 4}
          {...movie}
        />
      ))}
    </section>
  );
});

Results.displayName = "Results";
