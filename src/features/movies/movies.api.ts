import { appAxiosInstance, requestErrorMiddleware } from "../../utils/api";
import {
  ApiPaths,
  ApiSortByParamValue,
  DEFAULT_INCLUDE_LANGUAGE_PARAM,
  DiscoverMoviesSortByParams,
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
};

export const fetchMovieApi = async ({
  movieId,
  includes,
}: FetchMovieApiParams): Promise<AxiosResponse<unknown>> =>
  appAxiosInstance.get<unknown>(ApiPaths.fetchMovieApi(movieId), {
    params: {
      append_to_response: includes?.join(),
      include_image_language: includes
        ? DEFAULT_INCLUDE_LANGUAGE_PARAM
        : undefined,
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

export const fetchPopularMoviesApi = async (
  params?: PaginationApiParams
): Promise<AxiosResponse<unknown>> =>
  appAxiosInstance.get<unknown>(ApiPaths.fetchPopularMoviesApi, {
    params,
  });

export type FetchPopularMoviesRequestResponse = PaginationResponse<Movie[]>;

export const fetchPopularMoviesRequest = (
  params?: PaginationApiParams
): Promise<FetchPopularMoviesRequestResponse> =>
  requestErrorMiddleware(
    fetchPopularMoviesApi(params).then(({ data }) =>
      paginationDtoMapper(
        MoviesPaginationDtoSchema.parse(data),
        movieListDtoMapper
      )
    )
  );

export const fetchTopRatedMoviesApi = async (
  params?: PaginationApiParams
): Promise<AxiosResponse<unknown>> =>
  appAxiosInstance.get<unknown>(ApiPaths.fetchTopRatedMoviesApi, {
    params,
  });

export type FetchTopRatedMoviesRequestResponse = PaginationResponse<Movie[]>;

export const fetchTopRatedMoviesRequest = (
  params?: PaginationApiParams
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
} & PaginationApiParams;

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
} & PaginationApiParams;

export const fetchRecommendationsMoviesApi = async ({
  movieId,
  page,
}: FetchRecommendationsMoviesApiParams): Promise<AxiosResponse<unknown>> =>
  appAxiosInstance.get<unknown>(
    ApiPaths.fetchRecommendationsMoviesApi(movieId),
    {
      params: { page },
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
} & PaginationApiParams;

export const fetchSimilarMoviesApi = async ({
  movieId,
  page,
}: FetchSimilarMoviesApiParams): Promise<AxiosResponse<unknown>> =>
  appAxiosInstance.get<unknown>(ApiPaths.fetchSimilarMoviesApi(movieId), {
    params: { page },
  });

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
  PaginationApiParams;

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
