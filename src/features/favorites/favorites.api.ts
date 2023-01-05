import { requestErrorMiddleware } from "../../utils/api";
import {
  Favorite,
  FavoriteDto,
  favoriteListDtoSchema,
} from "./favorites.types";
import {
  AsyncStorageKeys,
  getAsyncStorageData,
  setAsyncStorageData,
} from "../../utils/asyncStorage";
import { favoriteDtoMapper } from "./favorites.mappers";
import { StringDate, typeCheckers } from "../../utils/types";
import { getRandomId } from "../../utils/entities";

export type FetchFavoritesApiParams = Pick<Favorite, "type">;

export const fetchFavoritesAPi = async ({
  type,
}: FetchFavoritesApiParams = {}): Promise<{ data: unknown }> =>
  getAsyncStorageData(AsyncStorageKeys.FAVORITES).then(
    (favorites): { data: FavoriteDto[] } => {
      const favoritesList = typeCheckers.array(favorites)
        ? favoriteListDtoSchema.parse(favorites)
        : [];

      const filteredFavoritesList = type
        ? favoritesList.filter((favorite) => favorite.type === type)
        : favoritesList;

      return {
        data: filteredFavoritesList,
      };
    }
  );

export const fetchFavoritesRequest = (
  params: FetchFavoritesApiParams
): Promise<Favorite[]> =>
  requestErrorMiddleware(
    fetchFavoritesAPi(params).then(({ data }) =>
      favoriteListDtoSchema.parse(data).map(favoriteDtoMapper)
    )
  );

export type AddToFavoritesApiParams = Pick<
  Required<Favorite>,
  "type" | "entityId"
>;

export const addToFavoritesApi = async ({
  type,
  entityId,
}: AddToFavoritesApiParams): Promise<void> => {
  if (entityId === undefined)
    throw new Error("Error: addToFavoritesAPi. entityId === undefined");

  const maybeFavorites = await getAsyncStorageData(AsyncStorageKeys.FAVORITES);

  const favoritesList = typeCheckers.array(maybeFavorites)
    ? favoriteListDtoSchema.parse(maybeFavorites)
    : [];

  if (
    favoritesList.some(
      (favorite) => favorite.type === type && favorite.entity_id === entityId
    )
  ) {
    throw new Error("Error: addToFavoritesAPi. favorite was already added");
  }

  favoritesList.unshift({
    id: getRandomId(),
    type,
    entity_id: entityId,
    date: new Date().toISOString() as StringDate,
  });

  await setAsyncStorageData(AsyncStorageKeys.FAVORITES, favoritesList);
};

export const addToFavoritesRequest = async (
  params: AddToFavoritesApiParams
): Promise<void> => requestErrorMiddleware(addToFavoritesApi(params));

export type RemoveFromFavoritesApiParams = Pick<Favorite, "id">;

export const removeFromFavoritesApi = async ({
  id,
}: RemoveFromFavoritesApiParams): Promise<void> => {
  const maybeFavorites = await getAsyncStorageData(AsyncStorageKeys.FAVORITES);

  const favoritesList = typeCheckers.array(maybeFavorites)
    ? favoriteListDtoSchema.parse(maybeFavorites)
    : [];

  const newFavorites = favoritesList.filter((favorite) => favorite.id !== id);

  await setAsyncStorageData(AsyncStorageKeys.FAVORITES, newFavorites);
};

export const removeFromFavoritesRequest = async (
  params: RemoveFromFavoritesApiParams
): Promise<void> => requestErrorMiddleware(removeFromFavoritesApi(params));
