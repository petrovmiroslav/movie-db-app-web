import { rest } from "msw";
import { config } from "../../../constants/config";
import { ApiPaths } from "../../../constants/api";
import { GenreId, GenresDto } from "../genres.types";

export const fetchGenresApiMockDtoTest: GenresDto = {
  genres: [
    { id: 28 as GenreId, name: "Action" },
    { id: 12 as GenreId, name: "Adventure" },
    { id: 16 as GenreId, name: "Animation" },
    { id: 35 as GenreId, name: "Comedy" },
    { id: 80 as GenreId, name: "Crime" },
    { id: 99 as GenreId, name: "Documentary" },
    { id: 18 as GenreId, name: "Drama" },
    { id: 10751 as GenreId, name: "Family" },
    { id: 14 as GenreId, name: "Fantasy" },
    { id: 36 as GenreId, name: "History" },
    { id: 27 as GenreId, name: "Horror" },
    { id: 10402 as GenreId, name: "Music" },
    { id: 9648 as GenreId, name: "Mystery" },
    { id: 10749 as GenreId, name: "Romance" },
    { id: 878 as GenreId, name: "Science Fiction" },
    { id: 10770 as GenreId, name: "TV Movie" },
    { id: 53 as GenreId, name: "Thriller" },
    { id: 10752 as GenreId, name: "War" },
    { id: 37 as GenreId, name: "Western" },
  ],
};
export const fetchGenresApiHandler = rest.get(
  config.BASE_URL + ApiPaths.fetchGenresApi,
  (req, res, ctx) => {
    return res(ctx.json(fetchGenresApiMockDtoTest));
  }
);
