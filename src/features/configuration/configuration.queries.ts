import { createQueryKeys } from "@lukemorales/query-key-factory";
import { fetchConfigurationRequest } from "./configuration.api";

export const configurationQueries = createQueryKeys("configuration", {
  configuration: {
    queryKey: null,
    queryFn: fetchConfigurationRequest,
  },
});
