import { rest } from "msw";
import { ImdbId, MovieDto, MovieId, MovieStatuses } from "../movies.types";
import { GenreId } from "../../genres/genres.types";
import { ImagesTypes } from "../../images/images.types";
import { StringDate } from "../../../utils/types";
import { config } from "../../../constants/config";
import { ApiPaths } from "../../../constants/api";
import { PaginationDto } from "../../../utils/pagination";

export const fetchMovieApiMock_MOVIE_ID = 1 as MovieId;
export const fetchMovieApiMockDtoTest: MovieDto = {
  adult: false,
  backdrop_path: "backdrop_path",
  budget: 1,
  genres: [
    { id: 1 as GenreId, name: "name1" },
    { id: 2 as GenreId, name: "name2" },
  ],
  genre_ids: [1, 2] as GenreId[],
  homepage: "homepage",
  id: fetchMovieApiMock_MOVIE_ID,
  images: {
    id: fetchMovieApiMock_MOVIE_ID,
    [ImagesTypes.BACKDROPS]: [
      {
        aspect_ratio: 1,
        file_path: "file_path1",
        height: 1,
        iso_639_1: "iso_639_1",
        vote_average: 1,
        vote_count: 1,
        width: 300,
      },
    ],
    [ImagesTypes.POSTERS]: [
      {
        aspect_ratio: 1,
        file_path: "file_path2",
        height: 1,
        iso_639_1: "iso_639_1",
        vote_average: 1,
        vote_count: 1,
        width: 300,
      },
    ],
  },
  imdb_id: "imdb_id" as ImdbId,
  original_language: "original_language",
  original_title: "original_title",
  overview: "overview",
  popularity: 1,
  poster_path: "poster_path",
  release_date: new Date(2000, 0, 0).toDateString() as StringDate,
  revenue: 1,
  runtime: 1,
  status: MovieStatuses.RELEASED,
  tagline: "tagline",
  title: "title",
  video: false,
  vote_average: 1,
  vote_count: 1,
};

export const fetchMovieApiHandler = rest.get(
  config.BASE_URL + ApiPaths.fetchMovieApi(":movieId"),
  (req, res, ctx) => {
    const movieId = Number(req.params["movieId"]);

    if (movieId === fetchMovieApiMock_MOVIE_ID) {
      return res(ctx.json(fetchMovieApiMockDtoTest));
    }

    return req.passthrough();
  }
);

export const discoverMovieApiMockDtoTest: PaginationDto<MovieDto[]> = {
  results: [{ ...fetchMovieApiMockDtoTest }],
  page: 1,
};

export const discoverMovieApiHandler = rest.get(
  config.BASE_URL + ApiPaths.discoverMovieApi,
  (req, res, ctx) => {
    return res(ctx.json(discoverMovieApiMockDtoTest));
  }
);

export const fetchRecommendationsMoviesApiMock_MOVIE_ID = 1 as MovieId;
export const fetchRecommendationsMoviesAPiMockDtoTest: PaginationDto<
  MovieDto[]
> = {
  results: [
    {
      ...fetchMovieApiMockDtoTest,
      id: fetchRecommendationsMoviesApiMock_MOVIE_ID,
    },
  ],
  page: 1,
};

export const fetchRecommendationsMoviesHandler = rest.get(
  config.BASE_URL + ApiPaths.fetchRecommendationsMoviesApi(":movieId"),
  (req, res, ctx) => {
    return res(ctx.json(fetchRecommendationsMoviesAPiMockDtoTest));
  }
);

export const fetchSimilarMoviesAPiMock_MOVIE_ID = 1 as MovieId;
export const fetchSimilarMoviesAPiMockDtoTest: PaginationDto<MovieDto[]> = {
  results: [
    {
      ...fetchMovieApiMockDtoTest,
      id: fetchSimilarMoviesAPiMock_MOVIE_ID,
    },
  ],
  page: 1,
};

export const fetchSimilarMoviesHandler = rest.get(
  config.BASE_URL + ApiPaths.fetchSimilarMoviesApi(":movieId"),
  (req, res, ctx) => {
    return res(ctx.json(fetchSimilarMoviesAPiMockDtoTest));
  }
);

export const fetchPopularMoviesApiMockDtoTest: PaginationDto<MovieDto[]> = {
  results: [{ ...fetchMovieApiMockDtoTest }],
  page: 1,
};

export const fetchPopularMoviesApiHandler = rest.get(
  config.BASE_URL + ApiPaths.fetchPopularMoviesApi,
  (req, res, ctx) => {
    return res(ctx.json(fetchPopularMoviesApiMockDtoTest));
  }
);

export const fetchTopRatedMoviesApiMockDtoTest: PaginationDto<MovieDto[]> = {
  results: [{ ...fetchMovieApiMockDtoTest }],
  page: 1,
};

export const fetchTopRatedMoviesApiHandler = rest.get(
  config.BASE_URL + ApiPaths.fetchTopRatedMoviesApi,
  (req, res, ctx) => {
    return res(ctx.json(fetchTopRatedMoviesApiMockDtoTest));
  }
);

export const searchMoviesApiMock_QUERY = "test";
export const searchMoviesApiMockDtoTest: PaginationDto<MovieDto[]> = {
  results: [
    {
      ...fetchMovieApiMockDtoTest,
      id: 2 as MovieId,
      title: searchMoviesApiMock_QUERY,
    },
  ],
  page: 1,
};

export const searchMoviesApiHandler = rest.get(
  config.BASE_URL + ApiPaths.searchMoviesApi,
  (req, res, ctx) => {
    const query = req.url.searchParams.get("query");
    if (query === searchMoviesApiMock_QUERY) {
      return res(ctx.json(searchMoviesApiMockDtoTest));
    }
    return req.passthrough();
  }
);
