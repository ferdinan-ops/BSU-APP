import Reports from "../../models/reportSchema";

export async function sendReport(req, res) {
  const { userSendId, questionId, commentId, message } = req.body;

  try {
    const data = await Reports.create({ userSendId, questionId, commentId, message });
    res.status(200).json({ success: true, msg: "Laporan Anda berhasil dikirim", data });
  } catch (error) {
    res.status(500).json({ success: false, error: "Sorry something wrong happened" });
  }
}