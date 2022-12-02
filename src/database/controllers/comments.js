import mongoose from "mongoose";
import Comments from "../../models/commentSchema";
import Questions from "../../models/questionSchema";
import { deleteActionNotif, pushNotification } from "./notification";

export async function createComment(req, res) {
  const { id: questionId } = req.query;
  const { userId, comment } = req.body;

  if (!questionId && !userId && !comment)
    return res.status(405).json({ success: false, error: "Mohon isi komentar" });

  try {
    const data = await Comments.create({ questionId, userId, comment });
    const post = await Questions.findById(questionId);
    const notifMsg = `Mengomentari Soal ${post.mataKuliah} Anda`;
    if (userId !== post.userId) await pushNotification(userId, post.userId, notifMsg, questionId);
    res.status(200).json({ success: true, msg: "Komentar anda berhasil di kirim", data });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}

export async function updateComment(req, res) {
  const { comment } = req.body;
  const { id } = req.query;
  if (!comment && !id)
    return res.status(405).json({ success: false, error: "Comment not selected" });

  try {
    const data = await Comments.findByIdAndUpdate(id, { comment });
    res.status(200).json({ success: true, msg: "Komentar anda berhasil di ubah", data });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}

export async function deleteComment(req, res) {
  const { id } = req.query;
  if (!id) return res.status(405).json({ success: false, error: "Comment not selected" });

  try {
    const comment = await Comments.findById(id);
    const post = await Questions.findById(comment.questionId);

    const notifMsg = `Mengomentari Soal ${post.mataKuliah} Anda`;
    await deleteActionNotif(comment.userId, notifMsg);

    await Comments.findByIdAndDelete(id);
    res.status(200).json({ success: true, msg: "Komentar anda berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}

export async function getAllComments(req, res) {
  const { id, page } = req.query;

  try {
    let data = await Comments.aggregate([
      { $match: { questionId: mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "users", localField: "userId", foreignField: "_id",
          pipeline: [{ $project: { _id: 1, username: 1, photo: 1 } }],
          as: "user"
        }
      },
      { $set: { user: { $arrayElemAt: ["$user", 0] } } },
      {
        $project: {
          _id: 1,
          user: 1,
          comment: 1,
          updatedAt: 1,
        }
      }
    ]);

    const counts = data.length;
    data = data.slice(0, parseInt(page));
    res.status(200).json({ success: true, msg: "Get all comments successfully", data, counts });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}