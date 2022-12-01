import connectMongo from "../../../../database/connection";
import { deleteQuestion, getQuestionById, updateQuestion } from "../../../../database/controllers/questions";
import authorization from "../../../../middlewares/authorization";

export default async function handler(req, res) {
  connectMongo().catch(() => res.status(500).json({ success: false, error: "Error in connection" }));
  await authorization(req, res);

  switch (req.method) {
    case "GET":
      await getQuestionById(req, res);
      break;
    case "PUT":
      await updateQuestion(req, res);
      break;
    case "DELETE":
      await deleteQuestion(req, res);
      break;
    default:
      res.status(405).json({ success: false, error: "Your request method is wrong" });
      break;
  }
}