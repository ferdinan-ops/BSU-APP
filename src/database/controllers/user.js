import mongoose from "mongoose";
import Questions from "../../models/questionSchema";

export async function getSavedQuestions(req, res) {
  const { id } = req.query;

  if (!id) return res.status(405).json({ success: false, error: "User not selected" });
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

  try {
    const data = await Questions.find({ saved: [id] });
    res.status(200).json({ success: true, msg: "Get saved questions successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}

export async function getMyQuestions(req, res) {
  const { id } = req.query;

  if (!id) return res.status(405).json({ success: false, error: "User not selected" });
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

  try {
    const data = await Questions.find({ userId: id });
    res.status(200).json({ success: true, msg: "Get my questions successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}

export async function updateUserProfile(req, res) {
  const { id } = req.query;
  const { username, photo } = req.body;

  if (!id && !username && !photo) return res.status(405).json({ success: false, error: "User not selected" });
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

  try {
    const data = await Questions.findByIdAndUpdate({ username, photo });
    res.status(200).json({ success: true, msg: "User profile updated successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}