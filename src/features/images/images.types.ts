import { MovieId, MovieIdSchema } from "../movies/movies.types";
import { z } from "zod";

const ImageIdSchema = z.string().brand<"ImageId">();
export type ImageId = z.infer<typeof ImageIdSchema>;

const ImageDtoSchema = z
  .object({
    file_path: z.string(),
  })
  .and(
    z
      .object({
        aspect_ratio: z.number().finite(),
        height: z.number().finite(),
        iso_639_1: z.string().nullable(),
        vote_average: z.number().finite(),
        vote_count: z.number().finite(),
        width: z.number().finite(),
      })
      .partial()
  );

export type ImageDto = z.infer<typeof ImageDtoSchema>;

export type Image = {
  id: ImageId;
  filePath: string;
} & Partial<{
  aspectRatio: number;
  height: number;
  iso_639_1: string | null;
  voteAverage: number;
  voteCount: number;
  width: number;
}>;

export enum ImagesTypes {
  BACKDROPS = "backdrops",
  POSTERS = "posters",
}

export const ImagesOfTheMovieDtoSchema = z
  .object({
    id: z.lazy(() => MovieIdSchema),
    [ImagesTypes.BACKDROPS]: z.array(ImageDtoSchema),
    [ImagesTypes.POSTERS]: z.array(ImageDtoSchema),
  })
  .partial();

export type ImagesOfTheMovieDto = z.infer<typeof ImagesOfTheMovieDtoSchema>;

export type ImagesOfTheMovie = Partial<{
  id: MovieId;
  [ImagesTypes.BACKDROPS]: Image[];
  [ImagesTypes.POSTERS]: Image[];
}>;
