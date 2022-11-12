import connectMongo from "../../../../database/connection";
import { getProfileData } from "../../../../database/controllers/user";
import authorization from "../../../../middlewares/authorization";

export default async function handler(req, res) {
  connectMongo().catch(() => res.status(500).json({ success: false, error: "Error in connection" }));
  await authorization(req, res);
  if (req.method !== "GET") return res.status(400).json({ success: false, error: "Request method not allowed" });
  await getProfileData(req, res);
} 