const Comment = require('../models/comment.model')

exports.addCommentToDB = async (payload) => {
  return Comment.create(payload)
}

exports.getCommentsByQuestionID = async (questionId) => {
  return Comment.find({ questionId }).populate('userId', 'username photo').exec()
}

exports.getCommentByID = async (commentId) => {
  return Comment.findById(commentId, { comment: 1 })
}

exports.updateCommentByID = async (commentId, comment) => {
  return Comment.findByIdAndUpdate(commentId, { comment })
}

exports.deleteCommentByID = async (commentId) => {
  return Comment.findByIdAndDelete(commentId)
}
