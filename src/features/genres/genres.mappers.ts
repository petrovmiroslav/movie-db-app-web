import { Genre, GenreDto, GenresDto } from "./genres.types";

export const genreDtoMapper = (dto: GenreDto): Genre => {
  const output: Genre = {
    id: dto.id,
  };

  if ("name" in dto) {
    output.name = dto.name;
  }

  return output;
};

export const genresDtoMapper = (dto: GenresDto): GenreDto[] | undefined =>
  dto.genres?.map(genreDtoMapper);
