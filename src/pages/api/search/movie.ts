import { NextApiRequest, NextApiResponse } from "next";
import { apiHandlerWrap } from "../../../utils/next";
import {
  SearchMoviesApiParams,
  searchMoviesApi,
} from "../../../features/movies/movies.api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;

  return apiHandlerWrap(
    req,
    res,
    searchMoviesApi(query as unknown as SearchMoviesApiParams)
  );
};

// noinspection JSUnusedGlobalSymbols
export default handler;
