import { createQueryKeys } from "@lukemorales/query-key-factory";
import {
  DiscoverMovieApiParams,
  discoverMovieRequest,
  FetchMovieApiParams,
  fetchMovieRequest,
  fetchPopularMoviesRequest,
  FetchRecommendationsMoviesApiParams,
  fetchRecommendationsMoviesRequest,
  FetchSimilarMoviesApiParams,
  fetchSimilarMoviesRequest,
  fetchTopRatedMoviesRequest,
  SearchMoviesApiParams,
  searchMoviesRequest,
} from "./movies.api";

export const moviesQueries = createQueryKeys("movie", {
  movie: (params: Partial<FetchMovieApiParams>) => {
    const { movieId, ...restParams } = params;
    return {
      queryKey: [movieId ?? {}],
      queryFn: () =>
        movieId ? fetchMovieRequest({ movieId, ...restParams }) : undefined,
      enabled: Boolean(movieId),
    };
  },
  popular: {
    queryKey: null,
    queryFn: (ctx) => fetchPopularMoviesRequest({ page: ctx?.pageParam ?? 1 }),
  },
  topRated: {
    queryKey: null,
    queryFn: (ctx) => fetchTopRatedMoviesRequest({ page: ctx?.pageParam ?? 1 }),
  },
  search: ({ query }: SearchMoviesApiParams) => ({
    queryKey: [{ query }],
    queryFn: (ctx) =>
      query
        ? searchMoviesRequest({ query, page: ctx?.pageParam ?? 1 })
        : undefined,
  }),
  discover: (params: DiscoverMovieApiParams) => ({
    queryKey: [params],
    queryFn: (ctx) =>
      discoverMovieRequest({ ...params, page: ctx?.pageParam ?? 1 }),
  }),
  recommendations: ({
    movieId,
  }: Partial<FetchRecommendationsMoviesApiParams>) => ({
    queryKey: [{ movieId }],
    queryFn: (ctx) =>
      movieId
        ? fetchRecommendationsMoviesRequest({
            movieId,
            page: ctx?.pageParam ?? 1,
          })
        : undefined,
  }),
  similar: ({ movieId }: Partial<FetchSimilarMoviesApiParams>) => ({
    queryKey: [{ movieId }],
    queryFn: (ctx) =>
      movieId
        ? fetchSimilarMoviesRequest({ movieId, page: ctx?.pageParam ?? 1 })
        : undefined,
  }),
});
