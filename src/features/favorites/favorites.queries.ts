import { createQueryKeys } from "@lukemorales/query-key-factory";
import {
  fetchFavoritesRequest,
  FetchFavoritesApiParams,
} from "./favorites.api";

export const favoritesQueries = createQueryKeys("favorites", {
  list: (params: FetchFavoritesApiParams = {}) => {
    return {
      queryKey: [params],
      queryFn: () => fetchFavoritesRequest(params),
    };
  },
});
