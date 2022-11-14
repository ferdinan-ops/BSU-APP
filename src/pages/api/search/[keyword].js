import connectMongo from "../../../database/connection";
import { searchQuestionByKeyword } from "../../../database/controllers/search";
import authorization from "../../../middlewares/authorization";

export default async function handler(req, res) {
  connectMongo().catch(() => res.status(500).json({ success: false, error: "Error on database connection" }));
  await authorization(req, res);
  if (req.method !== "GET") return res.status(405).json({ success: false, error: "Your request method is not allowed" });
  await searchQuestionByKeyword(req, res);
}