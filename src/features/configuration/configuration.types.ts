import { z } from "zod";

const ConfigurationImagesDtoSchema = z
  .object({
    secure_base_url: z.string(),
    backdrop_sizes: z.array(z.string()),
    poster_sizes: z.array(z.string()),
  })
  .partial();

export type ConfigurationImagesDto = z.infer<
  typeof ConfigurationImagesDtoSchema
>;

export const ConfigurationDtoSchema = z
  .object({
    images: ConfigurationImagesDtoSchema,
  })
  .partial();

export type ConfigurationDto = z.infer<typeof ConfigurationDtoSchema>;

export type ConfigurationImages = Partial<{
  secureBaseUrl: string;
  backdropSizes: string[];
  posterSizes: string[];
}>;

export type Configuration = Partial<{
  images: ConfigurationImages;
}>;
