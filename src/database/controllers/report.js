import mongoose from "mongoose";
import Reports from "../../models/reportSchema";

export async function sendReport(req, res) {
  const { userSend, userGet, message } = req.body;
  if (!mongoose.Types.ObjectId.isValid(userSend)) return res.status(404).send(`No user with id: ${userSend}`);
  if (!mongoose.Types.ObjectId.isValid(userGet)) return res.status(404).send(`No user with id: ${userGet}`);

  try {
    const data = await Reports.create({ userSend, userGet, message });
    res.status(500).json({ success: true, msg: "Laporan Anda berhasil dikirim", data });
  } catch (error) {
    res.status(500).json({ success: false, error: "Sorry something wrong happened" });
  }
}