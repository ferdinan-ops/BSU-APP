import Questions from "../../models/questionSchema";

export async function searchQuestionByKeyword(req, res) {
  const { keyword } = req.query;

  try {
    const data = await Questions.aggregate([
      { $match: { $or: [{ mataKuliah: { $regex: keyword } }] } },
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

    res.status(200).json({ success: true, msg: "Get question by keyword sucessfully", data });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}