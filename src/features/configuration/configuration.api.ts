import { appAxiosInstance, requestErrorMiddleware } from "../../utils/api/api";
import { Configuration, ConfigurationDtoSchema } from "./configuration.types";
import { configurationDtoMapper } from "./configuration.mappers";
import { AxiosResponse } from "axios";
import { ApiPaths } from "../../constants/api";

export const fetchConfigurationApi = async (): Promise<
  AxiosResponse<unknown>
> => appAxiosInstance.get<unknown>(ApiPaths.fetchConfigurationApi);

export const fetchConfigurationRequest = (): Promise<Configuration> =>
  requestErrorMiddleware(
    fetchConfigurationApi().then(({ data }) =>
      configurationDtoMapper(ConfigurationDtoSchema.parse(data))
    )
  );
