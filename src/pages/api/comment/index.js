import connectMongo from "../../../database/connection";
import { createComment } from "../../../database/controllers/comments";
import authorization from "../../../middlewares/authorization";

export default async function handler(req, res) {
  connectMongo().catch(() => res.status(500).json({ success: false, error: "Error in connection" }));
  const auth = await authorization(req, res);
  if (req.method !== "POST") return res.status(405).json({ success: false, error: "Your request method is wrong" });
  await createComment(req, res);
}