import connectMongo from "../../../database/connection";
import { createQuestion, getAllQuestions } from "../../../database/controllers/questions";
import authorization from "../../../middlewares/authorization";

export default async function handler(req, res) {
  connectMongo().catch(() => res.status(500).json({ success: false, error: "Error in connection" }));
  const auth = await authorization(req, res);

  switch (req.method) {
    case "POST":
      await createQuestion(req, res);
      break;
    case "GET":
      await getAllQuestions(req, res);
      break;
    default:
      res.status(405).json({ success: false, error: "Your request method is wrong" });
      break;
  }
}