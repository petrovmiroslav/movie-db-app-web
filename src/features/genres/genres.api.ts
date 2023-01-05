import { appAxiosInstance } from "../../utils/api";
import { Genre, GenresDtoSchema } from "./genres.types";
import { genresDtoMapper } from "./genres.mappers";
import { AxiosResponse } from "axios";
import { ApiPaths } from "../../constants/api";

export const fetchGenresApi = async (): Promise<AxiosResponse<unknown>> =>
  appAxiosInstance.get<unknown>(ApiPaths.fetchGenresApi);

export const fetchGenresRequest = async (): Promise<Genre[] | undefined> =>
  fetchGenresApi().then(({ data }) =>
    genresDtoMapper(GenresDtoSchema.parse(data))
  );
