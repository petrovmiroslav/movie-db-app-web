import { rest } from "msw";
import { config } from "../../../constants/config";
import { ApiPaths } from "../../../constants/api";
import { ConfigurationDto } from "../configuration.types";

export const fetchConfigurationApiMockDtoTest: ConfigurationDto = {
  images: {
    secure_base_url: "https://image.tmdb.org/t/p/",
    backdrop_sizes: ["w300", "w780", "w1280", "original"],
    poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
  },
};
export const fetchConfigurationApiHandler = rest.get(
  config.BASE_URL + ApiPaths.fetchConfigurationApi,
  (req, res, ctx) => {
    return res(ctx.json(fetchConfigurationApiMockDtoTest));
  }
);
