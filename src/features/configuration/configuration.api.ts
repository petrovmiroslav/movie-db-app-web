import { appAxiosInstance, requestErrorMiddleware } from "../../utils/api";
import { Configuration, ConfigurationDtoSchema } from "./configuration.types";
import { configurationDtoMapper } from "./configuration.mappers";
import { AxiosResponse } from "axios";

export const fetchConfigurationApi = async (): Promise<
  AxiosResponse<unknown>
> => appAxiosInstance.get<unknown>("/configuration");

export const fetchConfigurationRequest = (): Promise<Configuration> =>
  requestErrorMiddleware(
    fetchConfigurationApi().then(({ data }) =>
      configurationDtoMapper(ConfigurationDtoSchema.parse(data))
    )
  );
