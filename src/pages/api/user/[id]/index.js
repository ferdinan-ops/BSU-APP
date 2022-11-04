import connectMongo from "../../../../database/connection";
import authorization from "../../../../middlewares/authorization";

export default async function handler(req, res) {
  connectMongo().catch(() => res.status(500).json({ success: false, error: "Error in connection" }));
  const auth = await authorization(req, res);
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json({ success: true });
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
} 