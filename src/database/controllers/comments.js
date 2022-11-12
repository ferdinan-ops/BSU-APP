import mongoose from "mongoose";
import Comments from "../../models/commentSchema";

export async function createComment(req, res) {
  const { id: questionId } = req.query;
  const { userId, comment } = req.body;

  if (!questionId && !userId && !comment)
    return res.status(405).json({ success: false, error: "Form data not provided..." });

  try {
    const data = await Comments.create({ questionId, userId, comment });
    res.status(200).json({ success: true, msg: "Comment created successfully", data });
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
    res.status(200).json({ success: true, msg: "Comment updated successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}

export async function deleteComment(req, res) {
  const { id } = req.query;
  if (!id) return res.status(405).json({ success: false, error: "Comment not selected" });

  try {
    await Comments.findByIdAndDelete(id);
    res.status(200).json({ success: true, msg: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}

export async function getAllComments(req, res) {
  const { id } = req.query;

  try {
    const data = await Comments.aggregate([
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
    res.status(200).json({ success: true, msg: "Get all comments successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}