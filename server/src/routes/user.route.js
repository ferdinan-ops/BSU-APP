const express = require('express')
const verifyJwt = require('../middleware/verifyJwt')
const upload = require('../middleware/multer')
const {
  getUser,
  getUserQuestions,
  getUserSaveQuestions,
  updateUser,
  getUserLikeQuestions
} = require('../controllers/user.controller')

const userRoute = express.Router()

userRoute.get('/:userId', verifyJwt, getUser)
userRoute.get('/:userId/my-post', verifyJwt, getUserQuestions)
userRoute.get('/:userId/save-post', verifyJwt, getUserSaveQuestions)
userRoute.get('/:userId/like-post', verifyJwt, getUserLikeQuestions)
userRoute.put('/', verifyJwt, upload.single('photo'), updateUser)

module.exports = { userRoute }
