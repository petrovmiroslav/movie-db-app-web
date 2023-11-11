import {
  GetServerSideProps,
  NextApiRequest,
  NextApiResponse,
  NextPage,
} from "next";
import React from "react";
import { DehydratedState } from "@tanstack/query-core";
import { isResponseError, toErrorWithMessage } from "./errors";
import { AxiosResponse } from "axios";
import { appAxiosInstance, getSafeResponseError } from "./api/api";
import { I18nextSSRConfig } from "./i18n/i18n";
import { GetStaticProps } from "next/types";
import { ThemesSettings } from "../features/theme/constants";

export interface PageProps {}

export interface AppProps extends PageProps, I18nextSSRConfig {
  queryClientDehydratedState?: DehydratedState;
  themeSetting: ThemesSettings | null;
}

export type GetStaticPropsType = GetStaticProps<AppProps>;
export type GetServerSidePropsType = GetServerSideProps<AppProps>;

type GetLayout = (page: React.ReactElement) => React.ReactNode;

export const getLayoutFallback: GetLayout = (page) => page;

export type PageWithLayout<P = PageProps, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayout;
};

export const apiHandlerWrap = async (
  req: NextApiRequest,
  res: NextApiResponse,
  fetchPromise: Promise<AxiosResponse<unknown, unknown>>
) => {
  try {
    const response = await fetchPromise;

    res.status(response.status).json(response.data);
  } catch (error) {
    if (isResponseError(error) && error.response) {
      return res
        .status(error.response.status)
        .json(getSafeResponseError(error));
    }

    res.status(500).json(toErrorWithMessage(getSafeResponseError(error)));
  }
};

export const passRequest = (
  req: NextApiRequest
): Promise<AxiosResponse<unknown, unknown>> => {
  if (!req.method) throw new Error("invalid request method");
  if (!req.url) throw new Error("invalid request url");

  const apiPrefix = "/api";
  if (req.url.startsWith(apiPrefix)) {
    req.url = req.url.substring(apiPrefix.length);
  }

  const methodLowerCase = req.method.toLowerCase();

  switch (methodLowerCase) {
    case "get":
    case "delete": {
      return appAxiosInstance[methodLowerCase](req.url);
    }
    case "post":
    case "put":
    case "patch": {
      return appAxiosInstance[methodLowerCase](req.url, req.body);
    }

    default: {
      return appAxiosInstance.request({ ...req });
    }
  }
};
