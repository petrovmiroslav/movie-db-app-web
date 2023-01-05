import { Favorite, FavoriteDto } from "./favorites.types";

export const favoriteDtoMapper = (dto: FavoriteDto): Favorite => {
  const output: Favorite = {
    id: dto.id,
  };

  if ("type" in dto) {
    output.type = dto.type;
  }

  if ("entity_id" in dto) {
    output.entityId = dto.entity_id;
  }

  if ("date" in dto) {
    output.date = dto.date;
  }

  return output;
};
