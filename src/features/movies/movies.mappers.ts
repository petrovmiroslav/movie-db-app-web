import { Movie, MovieDto } from "./movies.types";
import { imagesOfTheMovieDtoMapper } from "../images/images.mappers";
import { genreDtoMapper } from "../genres/genres.mappers";

export const movieDtoMapper = (dto: MovieDto): Movie => {
  const output: Movie = {
    id: dto.id,
  };

  if ("adult" in dto) {
    output.adult = dto.adult;
  }

  if ("backdrop_path" in dto) {
    output.backdropPath = dto.backdrop_path;
  }

  if ("budget" in dto) {
    output.budget = dto.budget;
  }

  if ("budget" in dto) {
    output.genres = dto.genres?.map(genreDtoMapper);
  }

  if (dto.genre_ids) {
    output.genresIds = dto.genre_ids;
  }

  if ("homepage" in dto) {
    output.homepage = dto.homepage;
  }

  if (dto.images) {
    output.images = imagesOfTheMovieDtoMapper(dto.images);
  }

  if ("imdb_id" in dto) {
    output.imdbId = dto.imdb_id;
  }

  if ("original_language" in dto) {
    output.originalLanguage = dto.original_language;
  }

  if ("original_title" in dto) {
    output.originalTitle = dto.original_title;
  }

  if ("overview" in dto) {
    output.overview = dto.overview;
  }

  if ("popularity" in dto) {
    output.popularity = dto.popularity;
  }

  if ("poster_path" in dto) {
    output.posterPath = dto.poster_path;
  }

  if ("release_date" in dto) {
    output.releaseDate = dto.release_date;
  }

  if ("revenue" in dto) {
    output.revenue = dto.revenue;
  }

  if ("runtime" in dto) {
    output.runtime = dto.runtime;
  }

  if ("status" in dto) {
    output.status = dto.status;
  }

  if ("tagline" in dto) {
    output.tagline = dto.tagline;
  }

  if ("title" in dto) {
    output.title = dto.title;
  }

  if ("video" in dto) {
    output.video = dto.video;
  }

  if ("vote_average" in dto) {
    output.voteAverage = dto.vote_average;
  }

  if ("vote_count" in dto) {
    output.voteCount = dto.vote_count;
  }

  return output;
};

export const movieListDtoMapper = (
  dto: MovieDto[] | undefined
): Movie[] | undefined => dto?.map(movieDtoMapper);
