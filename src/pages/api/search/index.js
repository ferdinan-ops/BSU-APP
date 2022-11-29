import connectMongo from "../../../database/connection";
import { getMataKuliah } from "../../../database/controllers/search";
import authorization from "../../../middlewares/authorization";

export default async function handler(req, res) {
  connectMongo().catch(() => res.status(500).json({ success: false, error: "Error in database connection" }));
  await authorization(req, res);
  if (req.method !== "GET") return res.status(405).json({ success: false, error: "Your request method is recognized" });
  await getMataKuliah(req, res);
}