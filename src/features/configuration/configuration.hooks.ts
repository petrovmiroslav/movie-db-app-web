import { useContext } from "react";
import { ConfigurationContext } from "./configuration.contexts";

export const useConfiguration = () => {
  return useContext(ConfigurationContext);
};

export const useImageConfiguration = () => {
  const { images } = useConfiguration() ?? {};
  return images ?? {};
};
