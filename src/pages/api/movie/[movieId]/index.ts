import { NextApiRequest, NextApiResponse } from "next";
import {
  AppendToResponse,
  fetchMovieApi,
} from "../../../../features/movies/movies.api";
import { apiHandlerWrap } from "../../../../utils/next";
import { typeCheckers } from "../../../../utils/types";
import { MovieId } from "../../../../features/movies/movies.types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const { movieId, append_to_response } = query;

  return apiHandlerWrap(
    req,
    res,
    fetchMovieApi({
      movieId: movieId as unknown as MovieId,
      includes:
        append_to_response === undefined ||
        typeCheckers.array(append_to_response)
          ? (append_to_response as AppendToResponse[] | undefined)
          : ([append_to_response] as AppendToResponse[]),
    })
  );
};

// noinspection JSUnusedGlobalSymbols
export default handler;
