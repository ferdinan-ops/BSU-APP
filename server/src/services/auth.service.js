const User = require('../models/user.model')
const { OAuth2Client } = require('google-auth-library')
const bcrypt = require('bcrypt')
const { CONFIG } = require('../config/environtment')
const axios = require('axios')
const jwt = require('jsonwebtoken')

const addUser = async (payload) => {
  return await User.create(payload)
}

const hashing = (password) => {
  return bcrypt.hashSync(password, 10)
}

const findUserByEmail = async (email) => {
  return await User.findOne({ email })
}

const checkPassword = (password, userPassword) => {
  return bcrypt.compareSync(password, userPassword)
}

const accessTokenSign = (payload) => {
  const accessToken = jwt.sign(payload, CONFIG.accessTokenSecret, { expiresIn: '1d' })
  return accessToken
}

const refreshTokenSign = (payload) => {
  const refreshToken = jwt.sign(payload, CONFIG.refreshTokenSecret, { expiresIn: '7d' })
  return refreshToken
}

const verifyGoogleIdToken = async (idToken) => {
  try {
    const client = new OAuth2Client(CONFIG.googleClientId)
    const ticket = await client.verifyIdToken({ idToken, audience: CONFIG.googleClientId })
    const payload = ticket.getPayload()
    return payload
  } catch (error) {
    return error
  }
}

const verifyGoogleAccessToken = async (accessToken) => {
  try {
    const { data } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return data
  } catch (error) {
    return error
  }
}

module.exports = {
  addUser,
  hashing,
  findUserByEmail,
  checkPassword,
  accessTokenSign,
  refreshTokenSign,
  verifyGoogleIdToken,
  verifyGoogleAccessToken
}
