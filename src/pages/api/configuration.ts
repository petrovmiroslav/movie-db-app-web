import { NextApiRequest, NextApiResponse } from "next";
import { fetchConfigurationApi } from "../../features/configuration/configuration.api";
import { apiHandlerWrap } from "../../utils/next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return apiHandlerWrap(req, res, fetchConfigurationApi());
};

export default handler;
