import connectMongo from "../../../database/connection";
import { deleteComment, updateComment } from "../../../database/controllers/comments";
import authorization from "../../../middlewares/authorization";

export default async function handler(req, res) {
  connectMongo().catch(() => res.status(500).json({ success: false, error: "Error in connection" }));
  const auth = await authorization(req, res);
  const { method } = req;

  switch (method) {
    case "PATCH":
      await updateComment(req, res);
      break;
    case "DELETE":
      await deleteComment(req, res);
      break;
    default:
      res.status(405).json({ success: false, error: "Your request method is wrong" });
      break;
  }
}