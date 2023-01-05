import { createQueryKeys } from "@lukemorales/query-key-factory";
import { fetchGenresRequest } from "./genres.api";

export const genresQueries = createQueryKeys("genres", {
  movie: {
    queryKey: null,
    queryFn: fetchGenresRequest,
  },
});
