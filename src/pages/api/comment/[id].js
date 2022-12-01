import connectMongo from "../../../database/connection";
import { createComment, deleteComment, getAllComments, updateComment } from "../../../database/controllers/comments";
import authorization from "../../../middlewares/authorization";

export default async function handler(req, res) {
  connectMongo().catch(() => res.status(500).json({ success: false, error: "Error in connection" }));
  await authorization(req, res);
  const { method } = req;

  switch (method) {
    case "GET":
      await getAllComments(req, res);
      break;
    case "POST":
      await createComment(req, res);
      break;
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