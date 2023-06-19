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
  // return await Question.find({ userId })
  //   .populate('user', 'username photo')
  //   .projection(questionsQuery)
  //   .sort({ createdAt: -1 })
  //   .limit(5)
  //   .exec()
}

const getMySaveQuestions = async (userId) => {
  return await Question.aggregate([{ $match: { saves: { $in: [userId] } } }, ...questionsQuery])
  // return await Question.find({ saves: { $in: [userId] } })
  //   .populate('user', 'username photo')
  //   .projection(questionsQuery)
  //   .sort({ createdAt: -1 })
  //   .limit(5)
  //   .exec()
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
  updateUserById,
  processPhoto
}
