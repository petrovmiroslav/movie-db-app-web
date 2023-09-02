import { NextApiRequest, NextApiResponse } from "next";
import { apiHandlerWrap, passRequest } from "../../utils/next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return apiHandlerWrap(req, res, passRequest(req));
};

export default handler;
