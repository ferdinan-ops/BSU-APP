import connectMongo from "../../../database/connection";
import { register } from "../../../database/controllers/auth";

export default async function handler(req, res) {
  connectMongo().catch(() => res.status(500).json({ success: false, error: "Error in connection" }));
  if (req.method !== "POST") return res.status(405).json({ success: false, error: "Your request method is wrong" });
  await register(req, res);
}