const Question = require('../models/question.model')

const questionsQuery = [
  {
    // join data user untuk setiap question
    $lookup: {
      from: 'users',
      localField: 'userId',
      foreignField: '_id',
      as: 'user',
      pipeline: [{ $project: { _id: 1, username: 1, photo: 1 } }]
    }
  },
  {
    // join data comment untuk setiap question
    $lookup: {
      from: 'comments',
      localField: 'commentId',
      foreignField: '_id',
      as: 'comments'
    }
  },
  {
    // memilih field yang ingin ditampilkan
    $project: {
      _id: 1,
      mataKuliah: 1,
      fakultas: 1,
      programStudi: 1,
      semester: 1,
      kategori: 1,
      image: { $arrayElemAt: ['$images', 0] },
      createdAt: 1,
      updatedAt: 1,
      user: { $arrayElemAt: ['$user', 0] }, // mengambil data user yang pertama dalam array
      commentCount: { $size: '$comments' }, // menghitung jumlah data dari field 'comments'
      likeCount: { $size: '$likes' } // menghitung jumlah data dari field 'likes'
    }
  },
  {
    $sort: { createdAt: -1 } // sorting data berdasarkan createdAt secara descending
  },
  {
    $limit: 5 // membatasi jumlah data yang ditampilkan menjadi 5
  }
]

exports.getQuestionsFromDB = async () => {
  return await Question.aggregate(questionsQuery)
}

exports.addQuestionToDB = async (payload) => {
  return await Question.create(payload)
}

// populate data user dengan hanya mengambil field username dan email
exports.getQuestionById = async (questionId) => {
  return await Question.findById(questionId).populate('userId', 'username photo').exec()
}

exports.updateQuestionById = async (questionId, payload) => {
  return await Question.findByIdAndUpdate(questionId, payload)
}

exports.deleteQuestionById = async (questionId) => {
  return await Question.findByIdAndDelete(questionId)
}

exports.likeQuestionByUserId = async (questionId, userId) => {
  const question = await Question.findById(questionId)
  if (question.likes.includes(userId)) {
    return await Question.findByIdAndUpdate(questionId, { $pull: { likes: userId } })
  } else {
    return await Question.findByIdAndUpdate(questionId, { $push: { likes: userId } })
  }
}

exports.saveQuestionByUserId = async (questionId, userId) => {
  const question = await Question.findById(questionId)
  if (question.saves.includes(userId)) {
    return await Question.findByIdAndUpdate(questionId, { $pull: { saves: userId } })
  } else {
    return await Question.findByIdAndUpdate(questionId, { $push: { saves: userId } })
  }
}

exports.filterQuestionByFakultas = async (fakultas) => {
  return await Question.aggregate([{ $match: { fakultas } }, ...questionsQuery]).exec()
}

exports.searchQuestion = async (keyword) => {
  return await Question.aggregate([
    {
      $match: {
        $or: [
          { mataKuliah: { $regex: keyword, $options: 'i' } },
          { fakultas: { $regex: keyword, $options: 'i' } },
          { programStudi: { $regex: keyword, $options: 'i' } },
          { kategori: { $regex: keyword, $options: 'i' } },
          { dosen: { $regex: keyword, $options: 'i' } }
        ]
      }
    },
    ...questionsQuery
  ]).exec()
}
