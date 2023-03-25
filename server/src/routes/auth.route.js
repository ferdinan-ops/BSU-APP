const express = require('express')
const { login, register, loginWithGoogle, logout, refresh } = require('../controllers/auth.controller')

const authRoute = express.Router()

authRoute.post('/register', register)
authRoute.post('/login', login)
authRoute.post('/google', loginWithGoogle)
authRoute.delete('/logout', logout)
authRoute.get('/refresh', refresh)

module.exports = { authRoute }
