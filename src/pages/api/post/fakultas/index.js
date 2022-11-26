import connectMongo from "../../../../database/connection";
import { getAllFakultas } from "../../../../database/controllers/questions";
import authorization from "../../../../middlewares/authorization";

export default async function handler(req, res) {
  connectMongo().catch(() => res.status(500).json({ success: false, error: "Error in connection" }));
  await authorization(req, res);
  if (req.method !== "GET") return res.status(405).json({ success: false, error: "Your method is not recognized" });
  await getAllFakultas(req, res);
}