import { MovieId } from "../features/movies/movies.types";
import { Languages } from "../utils/i18n/constants";

export type LanguageApiParams = {
  language: string | undefined;
};

export const DEFAULT_INCLUDE_LANGUAGE_PARAM = `${Languages.EN},null`;

export enum ApiSortByParamValue {
  POPULARITY_ASC = "popularity.asc",
  POPULARITY_DESC = "popularity.desc",
  VOTE_AVERAGE_ASC = "vote_average.asc",
  VOTE_AVERAGE_DESC = "vote_average.desc",
}

export enum DiscoverMoviesSortByParams {
  RELEASE_DATE_ASC = "release_date.asc",
  RELEASE_DATE_DESC = "release_date.desc",
  REVENUE_ASC = "revenue.asc",
  REVENUE_DESC = "revenue.desc",
  PRIMARY_RELEASE_DATE_ASC = "primary_release_date.asc",
  PRIMARY_RELEASE_DATE_DESC = "primary_release_date.desc",
  ORIGINAL_TITLE_ASC = "original_title.asc",
  ORIGINAL_TITLE_DESC = "original_title.desc",
  VOTE_COUNT_ASC = "vote_count.asc",
  VOTE_COUNT_DESC = "vote_count.desc",
}

export const ApiPaths = {
  fetchConfigurationApi: "/configuration",

  fetchGenresApi: "/genre/movie/list",

  fetchMovieApi: (movieId: MovieId | string) => `/movie/${movieId}`,
  fetchRecommendationsMoviesApi: (movieId: MovieId | string) =>
    `/movie/${movieId}/recommendations`,
  fetchSimilarMoviesApi: (movieId: MovieId | string) =>
    `/movie/${movieId}/similar`,
  fetchPopularMoviesApi: "/movie/popular",
  fetchTopRatedMoviesApi: "/movie/top_rated",
  searchMoviesApi: "/search/movie",
  discoverMovieApi: "/discover/movie",
} as const;
