import connectMongo from "../../../../database/connection";
import { getMyQuestions } from "../../../../database/controllers/user";
import authorization from "../../../../middlewares/authorization";

export default async function handler(req, res) {
  connectMongo().catch(() => res.status(500).json({ success: false, error: "Error in connection" }));
  const auth = await authorization(req, res);
  if (req.method !== "GET") return res.status(404).json({ success: false, error: "Your request method is wrong" });
  await getMyQuestions(req, res);
}