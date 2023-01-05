import React, { useMemo } from "react";
import { Genre } from "./genres.types";
import { useQuery } from "@tanstack/react-query";
import { genresQueries } from "./genres.queries";

export type GenresDict = {
  [key: Genre["id"]]: Genre | undefined;
};

export const createGenresDict = (
  genreList: Genre[] | undefined
): GenresDict => {
  const dictionary: GenresDict = {};
  genreList?.forEach((genre) => {
    dictionary[genre.id] = genre;
  });

  return dictionary;
};

export const GenresDictContext = React.createContext<GenresDict>({});

export const GenresDictContextProvider = (props: {
  children: React.ReactNode;
}) => {
  const { children } = props;

  const { data: genreList } = useQuery(genresQueries.movie);

  const genresDict = useMemo(() => createGenresDict(genreList), [genreList]);

  return (
    <GenresDictContext.Provider value={genresDict}>
      {children}
    </GenresDictContext.Provider>
  );
};
