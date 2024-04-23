import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pid } = req.query;
  console.log("pid:", pid);
  res.end(`Get: ${pid}`);
}
