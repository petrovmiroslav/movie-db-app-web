import { appAxiosInstance } from "../../utils/api/api";
import { Genre, GenresDtoSchema } from "./genres.types";
import { genresDtoMapper } from "./genres.mappers";
import { AxiosResponse } from "axios";
import { ApiPaths, LanguageApiParams } from "../../constants/api";

export type FetchGenresApiParams = LanguageApiParams;

export const fetchGenresApi = async (
  params: FetchGenresApiParams
): Promise<AxiosResponse<unknown>> =>
  appAxiosInstance.get<unknown>(ApiPaths.fetchGenresApi, {
    params,
  });

export const fetchGenresRequest = async (
  params: FetchGenresApiParams
): Promise<Genre[] | undefined> =>
  fetchGenresApi(params).then(({ data }) =>
    genresDtoMapper(GenresDtoSchema.parse(data))
  );
