import React from "react";
import { Configuration } from "./configuration.types";
import { useQuery } from "@tanstack/react-query";
import { configurationQueries } from "./configuration.queries";

type ConfigurationContextType = Configuration | null | undefined;

export const ConfigurationContext =
  React.createContext<ConfigurationContextType>(undefined);

export const ConfigurationContextProvider = (props: {
  children: React.ReactNode;
}) => {
  const { children } = props;

  const { data: configuration } = useQuery(configurationQueries.configuration);

  return (
    <ConfigurationContext.Provider value={configuration}>
      {children}
    </ConfigurationContext.Provider>
  );
};
