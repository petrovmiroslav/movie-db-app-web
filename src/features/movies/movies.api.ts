import { appAxiosInstance, requestErrorMiddleware } from "../../utils/api/api";
import {
  ApiPaths,
  ApiSortByParamValue,
  DiscoverMoviesSortByParams,
  LanguageApiParams,
} from "../../constants/api";
import {
  Movie,
  MovieDtoSchema,
  MovieId,
  MoviesPaginationDtoSchema,
} from "./movies.types";
import { movieDtoMapper, movieListDtoMapper } from "./movies.mappers";
import { AxiosResponse } from "axios";
import {
  PaginationApiParams,
  paginationDtoMapper,
  PaginationResponse,
} from "../../utils/pagination";

export enum AppendToResponse {
  IMAGES = "images",
}

export type FetchMovieApiParams = {
  movieId: MovieId;
  includes?: AppendToResponse[];
} & LanguageApiParams;

export const fetchMovieApi = async (
  params: FetchMovieApiParams
): Promise<AxiosResponse<unknown>> =>
  appAxiosInstance.get<unknown>(ApiPaths.fetchMovieApi(params.movieId), {
    params: {
      append_to_response: params.includes?.join(),
      include_image_language: params.language,
      language: params.language,
    },
  });

export const fetchMovieRequest = (
  params: FetchMovieApiParams
): Promise<Movie> =>
  requestErrorMiddleware(
    fetchMovieApi(params).then(({ data }) =>
      movieDtoMapper(MovieDtoSchema.parse(data))
    )
  );

export type FetchPopularMoviesApiParams = PaginationApiParams &
  LanguageApiParams;

export const fetchPopularMoviesApi = async (
  params?: FetchPopularMoviesApiParams
): Promise<AxiosResponse<unknown>> =>
  appAxiosInstance.get<unknown>(ApiPaths.fetchPopularMoviesApi, {
    params,
  });

export type FetchPopularMoviesRequestResponse = PaginationResponse<Movie[]>;

export const fetchPopularMoviesRequest = (
  params?: FetchPopularMoviesApiParams
): Promise<FetchPopularMoviesRequestResponse> =>
  requestErrorMiddleware(
    fetchPopularMoviesApi(params).then(({ data }) =>
      paginationDtoMapper(
        MoviesPaginationDtoSchema.parse(data),
        movieListDtoMapper
      )
    )
  );

export type FetchTopRatedMoviesApiParams = PaginationApiParams &
  LanguageApiParams;

export const fetchTopRatedMoviesApi = async (
  params?: FetchTopRatedMoviesApiParams
): Promise<AxiosResponse<unknown>> =>
  appAxiosInstance.get<unknown>(ApiPaths.fetchTopRatedMoviesApi, {
    params,
  });

export type FetchTopRatedMoviesRequestResponse = PaginationResponse<Movie[]>;

export const fetchTopRatedMoviesRequest = (
  params?: FetchTopRatedMoviesApiParams
): Promise<FetchTopRatedMoviesRequestResponse> =>
  requestErrorMiddleware(
    fetchTopRatedMoviesApi(params).then(({ data }) =>
      paginationDtoMapper(
        MoviesPaginationDtoSchema.parse(data),
        movieListDtoMapper
      )
    )
  );

export type SearchMoviesApiParams = {
  query: string;
} & PaginationApiParams &
  LanguageApiParams;

export const searchMoviesApi = async (
  params: SearchMoviesApiParams
): Promise<AxiosResponse<unknown>> =>
  appAxiosInstance.get<unknown>(ApiPaths.searchMoviesApi, {
    params,
  });

export type SearchMoviesRequestResponse = PaginationResponse<Movie[]>;

export const searchMoviesRequest = (
  params: SearchMoviesApiParams
): Promise<SearchMoviesRequestResponse> =>
  requestErrorMiddleware(
    searchMoviesApi(params).then(({ data }) =>
      paginationDtoMapper(
        MoviesPaginationDtoSchema.parse(data),
        movieListDtoMapper
      )
    )
  );

export type FetchRecommendationsMoviesApiParams = {
  movieId: MovieId;
} & PaginationApiParams &
  LanguageApiParams;

export const fetchRecommendationsMoviesApi = async (
  params: FetchRecommendationsMoviesApiParams
): Promise<AxiosResponse<unknown>> =>
  appAxiosInstance.get<unknown>(
    ApiPaths.fetchRecommendationsMoviesApi(params.movieId),
    {
      params,
    }
  );

export type FetchRecommendationsMoviesResponse = PaginationResponse<Movie[]>;

export const fetchRecommendationsMoviesRequest = (
  params: FetchRecommendationsMoviesApiParams
): Promise<FetchRecommendationsMoviesResponse> =>
  requestErrorMiddleware(
    fetchRecommendationsMoviesApi(params).then(({ data }) =>
      paginationDtoMapper(
        MoviesPaginationDtoSchema.parse(data),
        movieListDtoMapper
      )
    )
  );

export type FetchSimilarMoviesApiParams = {
  movieId: MovieId;
} & PaginationApiParams &
  LanguageApiParams;

export const fetchSimilarMoviesApi = async (
  params: FetchSimilarMoviesApiParams
): Promise<AxiosResponse<unknown>> =>
  appAxiosInstance.get<unknown>(
    ApiPaths.fetchSimilarMoviesApi(params.movieId),
    {
      params,
    }
  );

export type FetchSimilarMoviesResponse = PaginationResponse<Movie[]>;

export const fetchSimilarMoviesRequest = (
  params: FetchSimilarMoviesApiParams
): Promise<FetchSimilarMoviesResponse> =>
  requestErrorMiddleware(
    fetchSimilarMoviesApi(params).then(({ data }) =>
      paginationDtoMapper(
        MoviesPaginationDtoSchema.parse(data),
        movieListDtoMapper
      )
    )
  );

export type DiscoverMovieApiParams = Partial<{
  sort_by: ApiSortByParamValue & DiscoverMoviesSortByParams;
  "vote_count.gte": number;
  "vote_count.lte": number;
  "vote_average.gte": number;
  "vote_average.lte": number;
  with_genres: string;
  without_genres: string;
}> &
  PaginationApiParams &
  LanguageApiParams;

export const discoverMovieApi = async (
  params: DiscoverMovieApiParams
): Promise<AxiosResponse<unknown>> =>
  appAxiosInstance.get<unknown>(ApiPaths.discoverMovieApi, { params });

export type DiscoverMovieResponse = PaginationResponse<Movie[]>;

export const discoverMovieRequest = (
  params: DiscoverMovieApiParams
): Promise<DiscoverMovieResponse> =>
  requestErrorMiddleware(
    discoverMovieApi(params).then(({ data }) =>
      paginationDtoMapper(
        MoviesPaginationDtoSchema.parse(data),
        movieListDtoMapper
      )
    )
  );
