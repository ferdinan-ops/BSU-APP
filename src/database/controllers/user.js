import mongoose from "mongoose";
import Questions from "../../models/questionSchema";
import Users from "../../models/userSchema";

export async function getProfileData(req, res) {
  const { id } = req.query;
  if (!id) return res.status(405).json({ success: false, error: "User not selected" });
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

  try {
    const data = await Users.findById(id, { _id: 1, username: 1, photo: 1, isAdmin: 1 });
    res.status(200).json({ success: true, msg: "Get profile data successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}

export async function getSavedQuestions(req, res) {
  const { id, page } = req.query;

  if (!id) return res.status(405).json({ success: false, error: "User not selected" });
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

  try {
    let data = await Questions.aggregate([
      { $match: { saved: [id] } },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "users", localField: "userId", foreignField: "_id", as: "user",
          pipeline: [{ $project: { _id: 1, username: 1, photo: 1 } }]
        }
      },
      { $set: { user: { $arrayElemAt: ["$user", 0] } } },
      {
        $lookup: {
          from: "comments", let: { questionId: "$_id" },
          pipeline: [{ $match: { $expr: { $eq: ["$questionId", "$$questionId"] } } }],
          as: "comments"
        }
      },
      {
        $project: {
          _id: 1,
          mataKuliah: 1,
          fakultas: 1,
          programStudi: 1,
          semester: 1,
          kategori: 1,
          image: { $arrayElemAt: ["$images", 0] },
          likesCount: { $size: "$likes" },
          commentsCount: { $size: "$comments" },
          createdAt: 1,
          user: 1
        }
      }
    ]);

    const counts = data.length;
    data = data.slice(0, parseInt(page));
    res.status(200).json({ success: true, msg: "Get saved questions successfully", data, counts });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}

export async function getMyQuestions(req, res) {
  const { id, page } = req.query;

  if (!id) return res.status(405).json({ success: false, error: "User not selected" });
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

  try {
    let data = await Questions.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(id) } },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "users", localField: "userId", foreignField: "_id", as: "user",
          pipeline: [{ $project: { _id: 1, username: 1, photo: 1 } }]
        }
      },
      { $set: { user: { $arrayElemAt: ["$user", 0] } } },
      {
        $lookup: {
          from: "comments", let: { questionId: "$_id" },
          pipeline: [{ $match: { $expr: { $eq: ["$questionId", "$$questionId"] } } }],
          as: "comments"
        }
      },
      {
        $project: {
          _id: 1,
          mataKuliah: 1,
          fakultas: 1,
          programStudi: 1,
          semester: 1,
          kategori: 1,
          image: { $arrayElemAt: ["$images", 0] },
          likesCount: { $size: "$likes" },
          commentsCount: { $size: "$comments" },
          createdAt: 1,
          user: 1
        }
      }
    ]);

    const counts = data.length;
    data = data.slice(0, parseInt(page));
    res.status(200).json({ success: true, msg: "Get my questions successfully", data, counts });
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
    const data = await Users.findByIdAndUpdate(id, { username, photo });
    res.status(200).json({ success: true, msg: "User profile updated successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}