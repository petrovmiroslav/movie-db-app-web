import { z } from "zod";

export const GenreIdSchema = z.number().finite().brand<"GenreId">();
export type GenreId = z.infer<typeof GenreIdSchema>;

export const GenreDtoSchema = z
  .object({
    id: GenreIdSchema,
  })
  .and(
    z
      .object({
        name: z.string(),
      })
      .partial()
  );

export type GenreDto = z.infer<typeof GenreDtoSchema>;

export const GenresDtoSchema = z
  .object({
    genres: z.array(GenreDtoSchema),
  })
  .partial();

export type GenresDto = z.infer<typeof GenresDtoSchema>;

export type Genre = { id: GenreId } & Partial<{
  name: string;
}>;
