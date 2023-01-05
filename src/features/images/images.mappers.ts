import {
  Image,
  ImageDto,
  ImageId,
  ImagesOfTheMovie,
  ImagesOfTheMovieDto,
  ImagesTypes,
} from "./images.types";

export const imageDtoMapper = (dto: ImageDto): Image => {
  const output: Image = {
    id: dto.file_path as ImageId,
    filePath: dto.file_path,
  };

  if ("aspect_ratio" in dto) {
    output.aspectRatio = dto.aspect_ratio;
  }

  if ("height" in dto) {
    output.height = dto.height;
  }

  if ("iso_639_1" in dto) {
    output.iso_639_1 = dto.iso_639_1;
  }

  if ("vote_average" in dto) {
    output.voteAverage = dto.vote_average;
  }

  if ("vote_count" in dto) {
    output.voteCount = dto.vote_count;
  }

  if ("width" in dto) {
    output.width = dto.width;
  }

  return output;
};

export const imagesOfTheMovieDtoMapper = (
  dto: ImagesOfTheMovieDto
): ImagesOfTheMovie => {
  const output: ImagesOfTheMovie = {};

  if ("id" in dto) {
    output.id = dto.id;
  }

  if (dto[ImagesTypes.BACKDROPS]) {
    output[ImagesTypes.BACKDROPS] =
      dto[ImagesTypes.BACKDROPS].map(imageDtoMapper);
  }

  if (dto[ImagesTypes.POSTERS]) {
    output[ImagesTypes.POSTERS] = dto[ImagesTypes.POSTERS].map(imageDtoMapper);
  }

  return output;
};
