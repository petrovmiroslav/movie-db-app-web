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
import { getSafeResponseError } from "./api";

export interface PageProps {}

export interface AppProps extends PageProps {
  queryClientDehydratedState?: DehydratedState;
}

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
