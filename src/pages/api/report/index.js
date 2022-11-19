import connectMongo from "../../../database/connection";
import { sendReport } from "../../../database/controllers/report";
import authorization from "../../../middlewares/authorization";

export default async function handler(req, res) {
  connectMongo().catch(() => res.status(500).json({ success: false, error: "Error in connection" }));
  await authorization(req, res);

  switch (req.method) {
    case "POST":
      await sendReport(req, res);
      break;
    default:
      res.status(405).json({ success: false, error: "Your request method is wrong" });
      break;
  }
}