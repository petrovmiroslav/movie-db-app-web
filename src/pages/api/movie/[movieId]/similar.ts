import { NextApiRequest, NextApiResponse } from "next";
import { apiHandlerWrap } from "../../../../utils/next";
import { fetchSimilarMoviesApi } from "../../../../features/movies/movies.api";
import { MovieId } from "../../../../features/movies/movies.types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const { movieId, page } = query;

  return apiHandlerWrap(
    req,
    res,
    fetchSimilarMoviesApi({
      movieId: movieId as unknown as MovieId,
      page: page ? Number(page) : undefined,
    })
  );
};

// noinspection JSUnusedGlobalSymbols
export default handler;
