const {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment
} = require('../controllers/comment.controller')
const verifyJwt = require('../middleware/verifyJwt')
const express = require('express')

const notificationRouter = express.Router()

notificationRouter.get('/question/:questionId', verifyJwt, getComments)
notificationRouter.get('/:commentId', verifyJwt, getComment)
notificationRouter.post('/', verifyJwt, createComment)
notificationRouter.put('/:commentId', verifyJwt, updateComment)
notificationRouter.delete('/:commentId', verifyJwt, deleteComment)

module.exports = { notificationRouter }
