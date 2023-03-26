const { reportComment, reportQuestion } = require('../controllers/report.controller')
const verifyJwt = require('../middleware/verifyJwt')
const express = require('express')

const reportRouter = express.Router()

reportRouter.get('/comment', verifyJwt, reportComment)
reportRouter.put('/question', verifyJwt, reportQuestion)

module.exports = { reportRouter }
