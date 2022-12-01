import connectMongo from "../../../../database/connection";
import { likeQuestion } from "../../../../database/controllers/questions";
import authorization from "../../../../middlewares/authorization";

export default async function handler(req, res) {
  connectMongo().catch(() => res.status(500).json({ success: false, error: "Error in connection" }));
  await authorization(req, res);
  if (req.method !== "PATCH") return res.status(405).json({ success: false, error: "Your request method is wrong" });
  await likeQuestion(req, res);
}