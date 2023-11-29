import axios, { AxiosError } from "axios";
import { config } from "../../constants/config";
import { ErrorWithMessage, isResponseError, submitError } from "../errors";

type ResponseErrorDataType = {
  details?: string[];
  error?: string;
  localized_error?: string;
};

export type ResponseError<ErrorDataType = ResponseErrorDataType> =
  AxiosError<ErrorDataType> & ErrorWithMessage;

export type SafeResponseError<ErrorDataType = ResponseErrorDataType> = Pick<
  AxiosError<ErrorDataType>,
  "message" | "status"
> &
  Pick<NonNullable<AxiosError<ErrorDataType>["response"]>, "data"> &
  ErrorWithMessage;

export const appAxiosInstance = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    Authorization: "Bearer " + config.V4_API_KEY,
    "Content-Type": "application/json;charset=utf-8",
  },
});

appAxiosInstance.interceptors.request.use((config) => {
  if (!config.params) {
    config.params = {};
  }

  return config;
});

appAxiosInstance.interceptors.response.use(undefined, (error) => {
  if (config.IS_DEV) {
    console.error("Axios interceptors: ", error);
  }

  submitError({ error });

  if (isResponseError(error)) {
    error = getSafeResponseError(error);
  }

  return Promise.reject(error);
});

/* for filter sensitive error data for front end side
 * e.g. Authorisation header with api key*/
export const getSafeResponseError = (
  error: unknown
): unknown | SafeResponseError =>
  isResponseError(error)
    ? {
        message: error.message,
        status: error.response?.status ?? error.status,
        data: error.response?.data,
      }
    : error;

// for handle request errors, e.g. logging
export const requestErrorMiddleware = async <T>(
  promise: Promise<T>
): Promise<T> => {
  try {
    return await promise;
  } catch (error) {
    if (config.IS_DEV) {
      console.error("requestErrorMiddleware: ", error);
    }

    if (isResponseError(error)) {
      error = getSafeResponseError(error);
    }

    return Promise.reject(error);
  }
};
