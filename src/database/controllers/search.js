import Questions from "../../models/questionSchema";

export async function searchQuestionByKeyword(req, res) {
  const { keyword, page } = req.query;

  try {
    let data = await Questions.aggregate([
      {
        $search: {
          index: 'searchQuestions',
          compound: { must: [{ autocomplete: { query: keyword, path: 'mataKuliah' } }] }
        }
      },
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
    res.status(200).json({ success: true, msg: "Get question by keyword sucessfully", data, counts });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}

export const getMataKuliah = async (req, res) => {
  try {
    let result = []
    const data = await Questions.find({}, { mataKuliah: 1, _id: 0 });
    data.forEach((u) => result.push(u.mataKuliah));

    const setArray = new Set(result);
    const newData = [...setArray];

    res.status(200).json({ success: true, msg: "Getting questions successfully", data: newData });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}