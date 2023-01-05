import { z } from "zod";

export type PaginationApiParams = {
  page?: number;
};

export const PaginationDtoSchema = z
  .object({
    page: z.number().finite(),
    total_pages: z.number().finite(),
    total_results: z.number().finite(),
  })
  .partial();

export type PaginationDto<T> = Partial<{
  page: number;
  results: T;
  total_pages: number;
  total_results: number;
}>;

export type PaginationResponse<T> = Partial<{
  page: number;
  results: T;
  totalPages: number;
  totalResults: number;
}>;

export const paginationDtoMapper = <T, R>(
  dto: PaginationDto<T>,
  resultsMapper: (
    resultDto: PaginationDto<T>["results"]
  ) => PaginationResponse<R>["results"]
): PaginationResponse<R> => {
  const output: PaginationResponse<R> = {};

  if ("page" in dto) {
    output.page = dto.page;
  }

  if ("results" in dto) {
    output.results = resultsMapper(dto.results);
  }

  if ("total_pages" in dto) {
    output.totalPages = dto.total_pages;
  }

  if ("total_results" in dto) {
    output.totalResults = dto.total_results;
  }

  return output;
};

export const getNextPageNumber = (
  params: PaginationResponse<unknown> | undefined
): number | undefined => {
  const { page = 1, totalPages = 0 } = params ?? {};

  return totalPages > page ? page + 1 : undefined;
};
