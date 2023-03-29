const {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment
} = require('../controllers/comment.controller')
const verifyJwt = require('../middleware/verifyJwt')
const express = require('express')

const commentRoute = express.Router()

commentRoute.get('/question/:questionId', verifyJwt, getComments)
commentRoute.get('/:commentId', verifyJwt, getComment)
commentRoute.post('/', verifyJwt, createComment)
commentRoute.put('/:commentId', verifyJwt, updateComment)
commentRoute.delete('/:commentId', verifyJwt, deleteComment)

module.exports = { commentRoute }
