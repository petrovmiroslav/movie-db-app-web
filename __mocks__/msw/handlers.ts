import {
  fetchPopularMoviesApiHandler,
  fetchTopRatedMoviesApiHandler,
  searchMoviesApiHandler,
  fetchRecommendationsMoviesHandler,
  fetchSimilarMoviesHandler,
  discoverMovieApiHandler,
  fetchMovieApiHandler,
} from "../../src/features/movies/__mock__/movies.mockHandlers";
import { fetchConfigurationApiHandler } from "../../src/features/configuration/__mock__/configuration.mockHandlers";
import { fetchGenresApiHandler } from "../../src/features/genres/__mock__/configuration.mockHandlers";

export const handlers = [
  // configuration
  fetchConfigurationApiHandler,
  // genres
  fetchGenresApiHandler,

  // images

  // movies
  fetchPopularMoviesApiHandler,
  fetchTopRatedMoviesApiHandler,
  searchMoviesApiHandler,
  fetchRecommendationsMoviesHandler,
  fetchSimilarMoviesHandler,
  discoverMovieApiHandler,
  fetchMovieApiHandler, //must be last because of path
];
