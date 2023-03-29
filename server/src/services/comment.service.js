const Comment = require('../models/comment.model')

const addCommentToDB = async (payload) => {
  return await Comment.create(payload)
}

const getCommentsByQuestionID = async (questionId) => {
  return await Comment.find({ questionId }).populate('userId', 'username photo').exec()
}

const getCommentByID = async (commentId) => {
  return await Comment.findById(commentId, { comment: 1 })
}

const updateCommentByID = async (commentId, comment) => {
  return await Comment.findByIdAndUpdate(commentId, { comment })
}

const deleteCommentByID = async (commentId) => {
  return await Comment.findByIdAndDelete(commentId)
}

module.exports = { addCommentToDB, getCommentsByQuestionID, getCommentByID, updateCommentByID, deleteCommentByID }