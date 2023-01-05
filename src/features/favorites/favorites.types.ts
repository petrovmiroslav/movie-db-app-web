import { z } from "zod";
import { StringDate, StringDateSchema } from "../../utils/types";

const FavoriteIdSchema = z.string().brand<"FavoriteId">();
export type FavoriteId = z.infer<typeof FavoriteIdSchema>;

export enum FavoritesTypes {
  MOVIE = "movie",
}

export const FavoriteDtoSchema = z
  .object({
    id: FavoriteIdSchema,
  })
  .and(
    z
      .object({
        type: z.nativeEnum(FavoritesTypes),
        entity_id: z.number().finite().or(z.string()),
        date: StringDateSchema,
      })
      .partial()
  );

export type FavoriteDto = z.infer<typeof FavoriteDtoSchema>;

export const favoriteListDtoSchema = z.array(FavoriteDtoSchema);

export type Favorite = { id: FavoriteId } & Partial<{
  type: FavoritesTypes;
  entityId: number | string;
  date: StringDate;
}>;
