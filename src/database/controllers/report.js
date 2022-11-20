import mongoose from "mongoose";
import Reports from "../../models/reportSchema";

export async function sendReport(req, res) {
  const { userSendId, questionId, message } = req.body;
  if (!mongoose.Types.ObjectId.isValid(userSendId)) return res.status(404).send(`No user with id: ${userSendId}`);
  if (!mongoose.Types.ObjectId.isValid(questionId)) return res.status(404).send(`No user with id: ${questionId}`);

  try {
    const data = await Reports.create({ userSendId, questionId, message });
    res.status(200).json({ success: true, msg: "Laporan Anda berhasil dikirim", data });
  } catch (error) {
    res.status(500).json({ success: false, error: "Sorry something wrong happened" });
  }
}