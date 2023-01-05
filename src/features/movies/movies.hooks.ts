import { useInfiniteQuery } from "@tanstack/react-query";
import { moviesQueries } from "./movies.queries";
import { getNextPageNumber } from "../../utils/pagination";
import { MovieId } from "./movies.types";

export const usePopularMovies = () =>
  useInfiniteQuery({
    ...moviesQueries.popular,
    getNextPageParam: getNextPageNumber,
  });

export const useTopRatedMovies = () =>
  useInfiniteQuery({
    ...moviesQueries.topRated,
    getNextPageParam: getNextPageNumber,
  });

export const useRecommendationsMovies = (movieId: MovieId) =>
  useInfiniteQuery({
    ...moviesQueries.recommendations({ movieId }),
    getNextPageParam: getNextPageNumber,
  });

export const useSimilarMovies = (movieId: MovieId) =>
  useInfiniteQuery({
    ...moviesQueries.similar({ movieId }),
    getNextPageParam: getNextPageNumber,
  });
