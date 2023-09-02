import { createQueryKeys } from "@lukemorales/query-key-factory";
import {
  DiscoverMovieApiParams,
  discoverMovieRequest,
  FetchMovieApiParams,
  fetchMovieRequest,
  FetchPopularMoviesApiParams,
  fetchPopularMoviesRequest,
  FetchRecommendationsMoviesApiParams,
  fetchRecommendationsMoviesRequest,
  FetchSimilarMoviesApiParams,
  fetchSimilarMoviesRequest,
  FetchTopRatedMoviesApiParams,
  fetchTopRatedMoviesRequest,
  SearchMoviesApiParams,
  searchMoviesRequest,
} from "./movies.api";

export const moviesQueries = createQueryKeys("movie", {
  movie: (params: FetchMovieApiParams | null) => {
    return {
      queryKey: [params ?? {}],
      queryFn: () =>
        params
          ? fetchMovieRequest(params)
          : Promise.reject(new Error("Invalid params")),
    };
  },
  popular: (params: FetchPopularMoviesApiParams) => ({
    queryKey: [params],
    queryFn: (ctx) =>
      fetchPopularMoviesRequest({ ...params, page: ctx?.pageParam ?? 1 }),
  }),
  topRated: (params: FetchTopRatedMoviesApiParams) => ({
    queryKey: [params],
    queryFn: (ctx) =>
      fetchTopRatedMoviesRequest({ ...params, page: ctx?.pageParam ?? 1 }),
  }),
  search: (params: SearchMoviesApiParams | null) => ({
    queryKey: [params ?? {}],
    queryFn: (ctx) =>
      params
        ? searchMoviesRequest({ ...params, page: ctx?.pageParam ?? 1 })
        : Promise.reject(new Error("Invalid params")),
  }),
  discover: (params: DiscoverMovieApiParams) => ({
    queryKey: [params],
    queryFn: (ctx) =>
      discoverMovieRequest({ ...params, page: ctx?.pageParam ?? 1 }),
  }),
  recommendations: (params: FetchRecommendationsMoviesApiParams | null) => ({
    queryKey: [params ?? {}],
    queryFn: (ctx) =>
      params
        ? fetchRecommendationsMoviesRequest({
            ...params,
            page: ctx?.pageParam ?? 1,
          })
        : Promise.reject(new Error("Invalid params")),
  }),
  similar: (params: FetchSimilarMoviesApiParams | null) => ({
    queryKey: [params ?? {}],
    queryFn: (ctx) =>
      params
        ? fetchSimilarMoviesRequest({ ...params, page: ctx?.pageParam ?? 1 })
        : Promise.reject(new Error("Invalid params")),
  }),
});
