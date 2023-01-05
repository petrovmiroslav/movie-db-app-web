import { NextApiRequest, NextApiResponse } from "next";
import { apiHandlerWrap } from "../../../utils/next";
import { discoverMovieApi } from "../../../features/movies/movies.api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;

  return apiHandlerWrap(req, res, discoverMovieApi(query));
};

// noinspection JSUnusedGlobalSymbols
export default handler;
