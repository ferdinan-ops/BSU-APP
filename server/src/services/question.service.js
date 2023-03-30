const Question = require('../models/question.model')
const Comment = require('../models/comment.model')
const { compressedFile } = require('../utils/fileUtils')

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
      saveCount: { $size: '$saves' }, // menghitung jumlah data dari field 'saves'
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

const getQuestionsFromDB = async () => {
  return await Question.aggregate(questionsQuery)
}

const addQuestionToDB = async (payload) => {
  return await Question.create(payload)
}

// populate data user dengan hanya mengambil field username dan email
const getQuestionById = async (questionId) => {
  return await Question.findById(questionId).populate('userId', 'username photo').exec()
}

const updateQuestionById = async (questionId, payload) => {
  return await Question.findByIdAndUpdate(questionId, payload)
}

const deleteQuestionById = async (questionId) => {
  await Comment.deleteMany({ questionId })
  return await Question.findByIdAndDelete(questionId)
}

const likeQuestionByUserId = async (questionId, userId) => {
  const question = await Question.findById(questionId)
  if (question.likes.includes(userId)) {
    return await Question.findByIdAndUpdate(questionId, { $pull: { likes: userId } })
  } else {
    return await Question.findByIdAndUpdate(questionId, { $push: { likes: userId } })
  }
}

const saveQuestionByUserId = async (questionId, userId) => {
  const question = await Question.findById(questionId)
  if (question.saves.includes(userId)) {
    return await Question.findByIdAndUpdate(questionId, { $pull: { saves: userId } })
  } else {
    return await Question.findByIdAndUpdate(questionId, { $push: { saves: userId } })
  }
}

const filterQuestionByFakultas = async (fakultas) => {
  return await Question.aggregate([{ $match: { fakultas } }, ...questionsQuery]).exec()
}

const searchQuestion = async (keyword) => {
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

const proccessImages = async (files) => {
  const images = files.map((file) => file.filename)
  const compressedImages = await Promise.all(images.map((image) => compressedFile(image)))
  return compressedImages
}

module.exports = {
  questionsQuery,
  getQuestionById,
  getQuestionsFromDB,
  addQuestionToDB,
  updateQuestionById,
  deleteQuestionById,
  searchQuestion,
  likeQuestionByUserId,
  saveQuestionByUserId,
  filterQuestionByFakultas,
  proccessImages
}
