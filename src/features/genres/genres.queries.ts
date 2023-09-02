import { createQueryKeys } from "@lukemorales/query-key-factory";
import { FetchGenresApiParams, fetchGenresRequest } from "./genres.api";

export const genresQueries = createQueryKeys("genres", {
  movie: (params: FetchGenresApiParams) => ({
    queryKey: [params],
    queryFn: () => fetchGenresRequest(params),
  }),
});
