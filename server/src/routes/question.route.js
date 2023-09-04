const express = require('express')
const {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestion,
  likeQuestion,
  saveQuestion
} = require('../controllers/question.controller')
const verifyJwt = require('../middleware/verifyJwt')
const upload = require('../middleware/multer')
const questionRoute = express.Router()

questionRoute.get('/', verifyJwt, getQuestions)
questionRoute.get('/:questionId', verifyJwt, getQuestion)
questionRoute.post('/', upload.array('images'), verifyJwt, createQuestion)
questionRoute.put('/:questionId', upload.array('images'), verifyJwt, updateQuestion)
questionRoute.delete('/:questionId', verifyJwt, deleteQuestion)
questionRoute.post('/like/:questionId', verifyJwt, likeQuestion)
questionRoute.post('/save/:questionId', verifyJwt, saveQuestion)

module.exports = { questionRoute }
