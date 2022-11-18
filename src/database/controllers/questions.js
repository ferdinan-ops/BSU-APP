import mongoose from "mongoose";
import Questions from "../../models/questionSchema";
import Users from "../../models/userSchema";
import { deleteActionNotif, pushNotification } from "./notification";

export async function createQuestion(req, res) {
  const formData = req.body;
  if (!formData) return res.status(405).json({ success: false, error: "Form data not provided..." });

  try {
    const data = await Questions.create(formData);
    res.status(200).json({ success: true, msg: "Your question created successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}

export async function updateQuestion(req, res) {
  const formData = req.body;
  const { id } = req.query;

  if (!formData && !id) return res.status(405).json({ success: false, error: "Question not selected" });
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  try {
    const data = await Questions.findByIdAndUpdate(id, formData);
    res.status(200).json({ success: true, msg: "Your question updated successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something wrong with the connections" });
  }
}

export async function deleteQuestion(req, res) {
  const { id } = req.query;

  if (!id) return res.status(405).json({ success: false, error: "Question not selected" });
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  try {
    const data = await Questions.findByIdAndDelete(id);
    res.status(200).json({ success: true, msg: "Your question deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something wrong with the connections" });
  }
}

export async function getAllQuestions(req, res) {
  try {
    const data = await Questions.aggregate([
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
    res.status(200).json({ success: true, msg: "Getting all questions successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}

export async function getQuestionById(req, res) {
  const { id } = req.query;
  if (!id) return res.status(405).json({ success: false, error: "Question not selected" });
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  try {
    const data = await Questions.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "users", localField: "userId", foreignField: "_id", as: "user",
          pipeline: [{ $project: { _id: 1, username: 1, photo: 1 } }]
        }
      },
      { $set: { user: { $arrayElemAt: ["$user", 0] } } },
    ]);
    res.status(200).json({ success: true, msg: "Getting detail questions successfully", data: data[0] });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}

export async function likeQuestion(req, res) {
  const { id } = req.query;
  const { userId } = req.body;

  if (!id && !userId) return res.status(405).json({ success: false, error: "Question not selected" });
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  try {
    const post = await Questions.findById(id);
    const index = post.likes.findIndex((id) => id === String(userId));
    const notifMsg = `Menyukai Soal ${post.mataKuliah} Anda`;

    if (index === -1) {
      post.likes.push(userId);
      await pushNotification(userId, post.userId, notifMsg, id);
    } else {
      post.likes = post.likes.filter((id) => id !== String(userId));
      await deleteActionNotif(userId, notifMsg);
    }

    const updatePost = await Questions.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json({ success: true, msg: "Liked the post successfully", data: updatePost });
  } catch (error) {
    res.status(500).json({ success: false, error: "Sorry something wrong..." });
  }
}

export async function saveQuestion(req, res) {
  const { id } = req.query;
  const { userId } = req.body;

  if (!id && !userId) return res.status(405).json({ success: false, error: "Question not selected" });
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  try {
    const post = await Questions.findById(id);
    const index = post.saved.findIndex((id) => id === String(userId));

    if (index === -1) {
      post.saved.push(userId);
    } else {
      post.saved = post.saved.filter((id) => id !== String(userId));
    }

    const updatePost = await Questions.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json({ success: true, msg: "Saved the post successfully", data: updatePost });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}