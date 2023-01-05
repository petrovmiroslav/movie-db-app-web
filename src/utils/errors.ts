import { ResponseError } from "./api";

export type ErrorWithMessage = {
  message: string;
};

export const isErrorWithMessage = (error: unknown): error is ErrorWithMessage =>
  typeof error === "object" &&
  error !== null &&
  "message" in error &&
  typeof (error as Record<string, unknown>).message === "string";

export const toErrorWithMessage = (maybeError: unknown): ErrorWithMessage => {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
};

export const isResponseError = (error: unknown): error is ResponseError =>
  isErrorWithMessage(error) &&
  "isAxiosError" in error &&
  Boolean(error.isAxiosError);
