import { server } from "../../../../__mocks__/msw/server";
import {
  discoverMovieApiMockDtoTest,
  fetchMovieApiMock_MOVIE_ID,
  fetchMovieApiMockDtoTest,
  fetchPopularMoviesApiMockDtoTest,
  fetchRecommendationsMoviesApiMock_MOVIE_ID,
  fetchRecommendationsMoviesAPiMockDtoTest,
  fetchSimilarMoviesAPiMock_MOVIE_ID,
  fetchSimilarMoviesAPiMockDtoTest,
  fetchTopRatedMoviesApiMockDtoTest,
  searchMoviesApiMock_QUERY,
  searchMoviesApiMockDtoTest,
} from "../__mock__/movies.mockHandlers";
import { Movie } from "../movies.types";
import { ImageId, ImagesTypes } from "../../images/images.types";
import {
  discoverMovieRequest,
  DiscoverMovieResponse,
  fetchMovieRequest,
  fetchPopularMoviesRequest,
  FetchPopularMoviesRequestResponse,
  fetchRecommendationsMoviesRequest,
  FetchRecommendationsMoviesResponse,
  fetchSimilarMoviesRequest,
  FetchSimilarMoviesResponse,
  fetchTopRatedMoviesRequest,
  FetchTopRatedMoviesRequestResponse,
  searchMoviesRequest,
  SearchMoviesRequestResponse,
} from "../movies.api";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("api/movies/movies.requests.ts", () => {
  const backdropsResponse =
    fetchMovieApiMockDtoTest.images?.[ImagesTypes.BACKDROPS]?.[0];
  const postersResponse =
    fetchMovieApiMockDtoTest.images?.[ImagesTypes.POSTERS]?.[0];

  const imagesResponse: Movie["images"] = fetchMovieApiMockDtoTest.images
    ? {
        id: fetchMovieApiMockDtoTest.images.id,
        [ImagesTypes.BACKDROPS]: backdropsResponse
          ? [
              {
                id: backdropsResponse.file_path as ImageId,
                filePath: backdropsResponse.file_path,
                aspectRatio: backdropsResponse.aspect_ratio,
                height: backdropsResponse.height,
                iso_639_1: backdropsResponse.iso_639_1,
                voteAverage: backdropsResponse.vote_average,
                voteCount: backdropsResponse.vote_count,
                width: backdropsResponse.width,
              },
            ]
          : undefined,
        [ImagesTypes.POSTERS]: postersResponse
          ? [
              {
                id: postersResponse.file_path as ImageId,
                filePath: postersResponse.file_path,
                aspectRatio: postersResponse.aspect_ratio,
                height: postersResponse.height,
                iso_639_1: postersResponse.iso_639_1,
                voteAverage: postersResponse.vote_average,
                voteCount: postersResponse.vote_count,
                width: postersResponse.width,
              },
            ]
          : undefined,
      }
    : undefined;

  const fetchMovieRequestResponse: Movie = {
    adult: fetchMovieApiMockDtoTest.adult,
    backdropPath: fetchMovieApiMockDtoTest.backdrop_path,
    budget: fetchMovieApiMockDtoTest.budget,
    genres: fetchMovieApiMockDtoTest.genres,
    genresIds: fetchMovieApiMockDtoTest.genre_ids,
    homepage: fetchMovieApiMockDtoTest.homepage,
    id: fetchMovieApiMockDtoTest.id,
    images: imagesResponse,
    imdbId: fetchMovieApiMockDtoTest.imdb_id,
    originalLanguage: fetchMovieApiMockDtoTest.original_language,
    originalTitle: fetchMovieApiMockDtoTest.original_title,
    overview: fetchMovieApiMockDtoTest.overview,
    popularity: fetchMovieApiMockDtoTest.popularity,
    posterPath: fetchMovieApiMockDtoTest.poster_path,
    releaseDate: fetchMovieApiMockDtoTest.release_date,
    revenue: fetchMovieApiMockDtoTest.revenue,
    runtime: fetchMovieApiMockDtoTest.runtime,
    status: fetchMovieApiMockDtoTest.status,
    tagline: fetchMovieApiMockDtoTest.tagline,
    title: fetchMovieApiMockDtoTest.title,
    video: fetchMovieApiMockDtoTest.video,
    voteAverage: fetchMovieApiMockDtoTest.vote_average,
    voteCount: fetchMovieApiMockDtoTest.vote_count,
  };

  test(`fetchMovieRequest() returns ${JSON.stringify(
    fetchMovieRequestResponse
  )},
  if response_dto is ${JSON.stringify(
    fetchMovieApiMockDtoTest
  )},`, async () => {
    expect(
      await fetchMovieRequest({
        movieId: fetchMovieApiMock_MOVIE_ID,
      })
    ).toEqual(fetchMovieRequestResponse);
  });

  const discoverMovieApiResponse: DiscoverMovieResponse = {
    page: 1,
    results: [fetchMovieRequestResponse],
  };

  test(`discoverMovieRequest() returns ${JSON.stringify(
    discoverMovieApiResponse
  )},
  if response_dto is ${JSON.stringify(
    discoverMovieApiMockDtoTest
  )},`, async () => {
    expect(await discoverMovieRequest({})).toEqual(discoverMovieApiResponse);
  });

  const fetchRecommendationsMoviesApiResponse: FetchRecommendationsMoviesResponse =
    {
      page: 1,
      results: [
        {
          ...fetchMovieRequestResponse,
          id: fetchRecommendationsMoviesAPiMockDtoTest.results?.[0].id!,
        },
      ],
    };

  test(`fetchRecommendationsMoviesRequest() returns ${JSON.stringify(
    fetchRecommendationsMoviesApiResponse
  )},
  if response_dto is ${JSON.stringify(
    fetchRecommendationsMoviesAPiMockDtoTest
  )},`, async () => {
    expect(
      await fetchRecommendationsMoviesRequest({
        movieId: fetchRecommendationsMoviesApiMock_MOVIE_ID,
      })
    ).toEqual(fetchRecommendationsMoviesApiResponse);
  });

  const fetchSimilarMoviesApiResponse: FetchSimilarMoviesResponse = {
    page: 1,
    results: [
      {
        ...fetchMovieRequestResponse,
        id: fetchSimilarMoviesAPiMockDtoTest.results?.[0].id!,
      },
    ],
  };

  test(`fetchSimilarMoviesRequest() returns ${JSON.stringify(
    fetchSimilarMoviesApiResponse
  )},
  if response_dto is ${JSON.stringify(
    fetchSimilarMoviesAPiMockDtoTest
  )},`, async () => {
    expect(
      await fetchSimilarMoviesRequest({
        movieId: fetchSimilarMoviesAPiMock_MOVIE_ID,
      })
    ).toEqual(fetchSimilarMoviesApiResponse);
  });

  const fetchPopularMoviesApiResponse: FetchPopularMoviesRequestResponse = {
    page: 1,
    results: [fetchMovieRequestResponse],
  };

  test(`fetchPopularMoviesRequest() returns ${JSON.stringify(
    fetchPopularMoviesApiResponse
  )},
  if response_dto is ${JSON.stringify(
    fetchPopularMoviesApiMockDtoTest
  )},`, async () => {
    expect(await fetchPopularMoviesRequest({})).toEqual(
      fetchPopularMoviesApiResponse
    );
  });

  const fetchTopRatedMoviesApiResponse: FetchTopRatedMoviesRequestResponse = {
    page: 1,
    results: [fetchMovieRequestResponse],
  };

  test(`fetchTopRatedMoviesRequest() returns ${JSON.stringify(
    fetchTopRatedMoviesApiResponse
  )},
  if response_dto is ${JSON.stringify(
    fetchTopRatedMoviesApiMockDtoTest
  )},`, async () => {
    expect(await fetchTopRatedMoviesRequest({})).toEqual(
      fetchTopRatedMoviesApiResponse
    );
  });

  const searchMoviesApiResponse: SearchMoviesRequestResponse = {
    page: 1,
    results: [
      {
        ...fetchMovieRequestResponse,
        id: searchMoviesApiMockDtoTest.results?.[0].id!,
        title: searchMoviesApiMockDtoTest.results?.[0].title!,
      },
    ],
  };

  test(`searchMoviesRequest() returns ${JSON.stringify(
    searchMoviesApiResponse
  )},
  if response_dto is ${JSON.stringify(
    searchMoviesApiMockDtoTest
  )},`, async () => {
    expect(
      await searchMoviesRequest({ query: searchMoviesApiMock_QUERY })
    ).toEqual(searchMoviesApiResponse);
  });
});
