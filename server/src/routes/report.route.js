const { reportComment, reportQuestion } = require('../controllers/report.controller')
const verifyJwt = require('../middleware/verifyJwt')
const express = require('express')

const reportRoute = express.Router()

reportRoute.post('/comment', verifyJwt, reportComment)
reportRoute.post('/question', verifyJwt, reportQuestion)

module.exports = { reportRoute }
