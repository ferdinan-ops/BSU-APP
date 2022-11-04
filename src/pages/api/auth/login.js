import connectMongo from "../../../database/connection";
import { currentUser, login } from "../../../database/controllers/auth";

export default async function handler(req, res) {
  connectMongo().catch(() => res.status(500).json({ success: false, error: "Error in connection" }));
  switch (req.method) {
    case "POST":
      await login(req, res);
      break;
    case "GET":
      await currentUser(req, res);
      break;
    default:
      return res.status(405).json({ success: false, error: "Your request method is wrong" });
  }
}