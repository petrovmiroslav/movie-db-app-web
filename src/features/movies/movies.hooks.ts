import { useInfiniteQuery } from "@tanstack/react-query";
import { moviesQueries } from "./movies.queries";
import { getNextPageNumber } from "../../utils/pagination";

export const usePopularMovies = (
  params: Parameters<typeof moviesQueries.popular>[0]
) =>
  useInfiniteQuery({
    ...moviesQueries.popular(params),
    getNextPageParam: getNextPageNumber,
  });

export const useTopRatedMovies = (
  params: Parameters<typeof moviesQueries.topRated>[0]
) =>
  useInfiniteQuery({
    ...moviesQueries.topRated(params),
    getNextPageParam: getNextPageNumber,
  });

export const useRecommendationsMovies = (
  params: Parameters<typeof moviesQueries.recommendations>[0]
) =>
  useInfiniteQuery({
    ...moviesQueries.recommendations(params),
    getNextPageParam: getNextPageNumber,
  });

export const useSimilarMovies = (
  params: Parameters<typeof moviesQueries.similar>[0]
) =>
  useInfiniteQuery({
    ...moviesQueries.similar(params),
    getNextPageParam: getNextPageNumber,
  });
