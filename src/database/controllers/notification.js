import mongoose from "mongoose";
import Notification from "../../models/notificationSchema";

export async function pushNotification(userAction, userPost, message) {
  try {
    const data = await Notification.create({ userAction, userPost, message });
    return data;
  } catch (error) {
    return error;
  }
}

export async function getNotification(req, res) {
  const { id: userPost } = req.body;
  if (!mongoose.Types.ObjectId.isValid(userPost)) return res.status(404).send(`No user with id: ${userPost}`);

  try {
    const data = await Notification.find({ userPost });
    res.status(200).json({ success: true, msg: "Get notification successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, error: "Sorry something wrong happened" });
  }
}

export async function deleteNotification(req, res) {
  const { id } = req.query;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

  try {
    await Notification.findByIdAndDelete(id);
    res.status(200).json({ success: true, msg: "Notification deleted sucessfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Sorry something wrong happened" });
  }
}