import connectMongo from "../../../database/connection";
import { deleteNotification, getNotification } from "../../../database/controllers/notification";
import authorization from "../../../middlewares/authorization";

export default async function handler(req, res) {
  connectMongo().catch(() => res.status(500).json({ success: false, error: "Error in connection" }));
  await authorization(req, res);

  switch (req.method) {
    case "GET":
      await getNotification(req, res);
      break;
    case "DELETE":
      await deleteNotification(req, res);
      break;
    default:
      res.status(405).json({ success: false, error: "Your request method is wrong" });
      break;
  }
}