const { deleteFile, compressedFile } = require('../utils/fileUtils')
const { questionsQuery } = require('./question.service')
const Question = require('../models/question.model')
const { logger } = require('../utils/logger')
const User = require('../models/user.model')
const mongoose = require('mongoose')

const ObjectId = mongoose.Types.ObjectId

const getUserById = async (userId) => {
  return await User.findById(userId, { password: 0, __v: 0 })
}

const getMyQuestions = async (userId) => {
  return await Question.aggregate([{ $match: { userId: new ObjectId(userId) } }, ...questionsQuery])
}

const getMySaveQuestions = async (userId) => {
  return await Question.aggregate([{ $match: { saves: { $in: [userId] } } }, ...questionsQuery])
}

const getMyLikesQuestions = async (userId) => {
  return await Question.aggregate([{ $match: { likes: { $in: [userId] } } }, ...questionsQuery])
}

const updateUserById = async (userId, payload) => {
  return await User.findByIdAndUpdate(userId, payload)
}

const processPhoto = async (oldPhoto, filename) => {
  if (oldPhoto !== '') deleteFile(oldPhoto)
  const compressedPhoto = await compressedFile(filename)
  if (compressedPhoto) {
    return compressedPhoto
  } else {
    logger.error('Gagal mengubah foto')
    return oldPhoto
  }
}

module.exports = {
  getUserById,
  getMyQuestions,
  getMySaveQuestions,
  getMyLikesQuestions,
  updateUserById,
  processPhoto
}
