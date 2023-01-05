import { NextApiRequest, NextApiResponse } from "next";
import { fetchTopRatedMoviesApi } from "../../../features/movies/movies.api";
import { apiHandlerWrap } from "../../../utils/next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const { page } = query;

  return apiHandlerWrap(
    req,
    res,
    fetchTopRatedMoviesApi({ page: page ? Number(page) : undefined })
  );
};

// noinspection JSUnusedGlobalSymbols
export default handler;
