import { appAxiosInstance } from "../../utils/api";
import { Genre, GenresDtoSchema } from "./genres.types";
import { genresDtoMapper } from "./genres.mappers";
import { AxiosResponse } from "axios";

export const fetchGenresApi = async (): Promise<AxiosResponse<unknown>> =>
  appAxiosInstance.get<unknown>("/genre/movie/list");

export const fetchGenresRequest = async (): Promise<Genre[] | undefined> =>
  fetchGenresApi().then(({ data }) =>
    genresDtoMapper(GenresDtoSchema.parse(data))
  );
