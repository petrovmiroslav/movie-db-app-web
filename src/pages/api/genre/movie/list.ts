import { NextApiRequest, NextApiResponse } from "next";
import { apiHandlerWrap } from "../../../../utils/next";
import { fetchGenresApi } from "../../../../features/genres/genres.api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return apiHandlerWrap(req, res, fetchGenresApi());
};

// noinspection JSUnusedGlobalSymbols
export default handler;
