import { MovieId } from "../features/movies/movies.types";

export const getMoviePagePath = (movieId: MovieId | undefined) =>
  `/movie/${movieId ?? ""}` as const;
