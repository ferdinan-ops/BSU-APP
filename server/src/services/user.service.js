const fs = require('fs')
const path = require('path')
const User = require('../models/user.model')
const Question = require('../models/question.model')
const { questionsQuery } = require('./question.service')
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

const updateUserById = async (userId, payload) => {
  return await User.findByIdAndUpdate(userId, payload)
}

const deletePhoto = async (filePath) => {
  filePath = path.join(__dirname, '../../assets/users', filePath)
  fs.unlinkSync(filePath, (err) => console.log(err))
}

module.exports = { getUserById, getMyQuestions, getMySaveQuestions, updateUserById, deletePhoto }
