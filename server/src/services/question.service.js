const Question = require('../models/question.model')
const Comment = require('../models/comment.model')
const { compressedFile } = require('../utils/fileUtils')

const questionsQuery = [
  {
    $lookup: {
      from: 'users',
      localField: 'userId',
      foreignField: '_id',
      as: 'user',
      pipeline: [{ $project: { _id: 1, username: 1, photo: 1, provider: 1 } }]
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
      image: { $arrayElemAt: ['$images', 0] },
      createdAt: 1,
      updatedAt: 1,
      user: { $arrayElemAt: ['$user', 0] },
      saveCount: { $size: '$saves' },
      likeCount: { $size: '$likes' }
    }
  },
  {
    $sort: { createdAt: -1 }
  }
]

// const questionsQuery = {
//   _id: 1,
//   mataKuliah: 1,
//   fakultas: 1,
//   programStudi: 1,
//   semester: 1,
//   kategori: 1,
//   image: { $arrayElemAt: ['$images', 0] },
//   createdAt: 1,
//   saveCount: { $size: '$saves' },
//   likeCount: { $size: '$likes' }
// }

const getQuestionsFromDB = async (limit, skip) => {
  return await Question.aggregate([...questionsQuery, { $skip: skip }, { $limit: limit }]).exec()
}

const getQuestionsCountFromDB = async () => {
  return await Question.find().countDocuments()
}

const addQuestionToDB = async (payload) => {
  return await Question.create(payload)
}

const getQuestionById = async (questionId) => {
  return await Question.findById(questionId).populate('user', 'username photo provider').exec()
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

const searchQuestion = async (keyword, limit, skip) => {
  return await Question.aggregate([
    {
      $match: {
        $or: [
          { mataKuliah: { $regex: keyword, $options: 'i' } },
          { fakultas: { $regex: keyword, $options: 'i' } },
          { programStudi: { $regex: keyword, $options: 'i' } },
          { kategori: { $regex: keyword, $options: 'i' } },
          { dosen: { $regex: keyword, $options: 'i' } },
          { semester: { $regex: keyword, $options: 'i' } },
          { 'user.username': { $regex: keyword, $options: 'i' } },
          { tahunAjaran: { $regex: keyword, $options: 'i' } }
        ]
      }
    },
    ...questionsQuery,
    { $skip: skip },
    { $limit: limit }
  ]).exec()
}

const getSearchQuestionCount = async (keyword) => {
  return await Question.find({
    $or: [
      { mataKuliah: { $regex: keyword, $options: 'i' } },
      { fakultas: { $regex: keyword, $options: 'i' } },
      { programStudi: { $regex: keyword, $options: 'i' } },
      { kategori: { $regex: keyword, $options: 'i' } },
      { dosen: { $regex: keyword, $options: 'i' } },
      { semester: { $regex: keyword, $options: 'i' } },
      { 'user.username': { $regex: keyword, $options: 'i' } },
      { tahunAjaran: { $regex: keyword, $options: 'i' } }
    ]
  }).countDocuments()
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
  proccessImages,
  getQuestionsCountFromDB,
  getSearchQuestionCount
}
