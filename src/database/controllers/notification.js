import mongoose from "mongoose";
import Notification from "../../models/notificationSchema";

export async function pushNotification(userAction, userPost, message, linkId) {
  try {
    const data = await Notification.create({ userAction, userPost, message, linkId });
    return data;
  } catch (error) {
    return error;
  }
}

export async function getNotification(req, res) {
  const { id, page } = req.query;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

  try {
    let data = await Notification.aggregate([
      { $match: { userPost: mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "users", localField: "userAction", foreignField: "_id", as: "userAction",
          pipeline: [{ $project: { _id: 1, username: 1, photo: 1 } }]
        }
      },
      { $set: { userAction: { $arrayElemAt: ["$userAction", 0] } } },
    ]);

    const counts = data.length;
    data = data.slice(0, parseInt(page));
    res.status(200).json({ success: true, msg: "Get notification successfully", data, counts });
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

export async function deleteActionNotif(userId, message) {
  try {
    const data = await Notification.deleteOne({ "userAction": mongoose.Types.ObjectId(userId), message });
    return data;
  } catch (error) {
    return error;
  }
}