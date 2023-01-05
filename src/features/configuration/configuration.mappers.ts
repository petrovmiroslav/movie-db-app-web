import {
  Configuration,
  ConfigurationDto,
  ConfigurationImages,
  ConfigurationImagesDto,
} from "./configuration.types";

export const configurationImagesDtoMapper = (
  dto: ConfigurationImagesDto
): ConfigurationImages => {
  const configurationImages: ConfigurationImages = {};

  if ("secure_base_url" in dto)
    configurationImages.secureBaseUrl = dto.secure_base_url;
  if ("backdrop_sizes" in dto)
    configurationImages.backdropSizes = dto.backdrop_sizes;
  if ("poster_sizes" in dto) configurationImages.posterSizes = dto.poster_sizes;

  return configurationImages;
};

export const configurationDtoMapper = (
  configurationDto: ConfigurationDto
): Configuration => {
  const configuration: Configuration = {};

  if (configurationDto.images)
    configuration.images = configurationImagesDtoMapper(
      configurationDto.images
    );

  return configuration;
};
