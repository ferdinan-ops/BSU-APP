const { registerValidation, loginValidation } = require('../validations/auth.validation')
const AuthService = require('../services/auth.service')
const { OAuth2Client } = require('google-auth-library')
const { CONFIG } = require('../config/environtment')
const { logger } = require('../utils/logger')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  const { body, path, method } = req
  const { value, error } = registerValidation(body)
  if (error) {
    logger.error(`${method}:/auth${path}\t${error.details[0].message}`)
    return res.status(422).json({ error: error.details[0].message })
  }

  try {
    const isExist = await AuthService.findUserByEmail(value.email)
    if (isExist) {
      logger.warn(`${method}:/auth${path}\tEmail telah terdaftar`)
      return res.status(402).json({ message: 'Email telah terdaftar' })
    }

    value.password = `${AuthService.hashing(value.password)}`
    await AuthService.addUser(value)
    logger.info(`${method}:/auth${path}\tSukses menambahkan ${value.username}`)
    return res.status(201).json({ message: `Sukses menambahkan ${value.username}` })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

const login = async (req, res) => {
  const { body, path, method } = req
  const { value, error } = loginValidation(body)

  if (error) {
    logger.error(`${method}:/auth${path}\t${error.details[0].message}`)
    return res.status(422).json({ error: error.details[0].message })
  }

  try {
    const user = await AuthService.findUserByEmail(value.email)
    if (!user) {
      logger.error(`${method}:/auth${path}\tEmail salah!`)
      return res.status(401).json({ error: 'Email anda salah' })
    }

    const isValidPwd = AuthService.checkPassword(value.password, user.password)
    if (!isValidPwd) {
      logger.error(`${method}:/auth${path}\tPassword salah!`)
      return res.status(401).json({ error: 'Password anda salah' })
    }

    const { password, ...other } = user._doc
    const accessToken = jwt.sign({ ...other }, CONFIG.accessTokenSecret, { expiresIn: '1d' })
    const refreshToken = jwt.sign({ ...other }, CONFIG.refreshTokenSecret, { expiresIn: '7d' })
    logger.info(`${method}:/auth${path}\tSukses login ${user.username}`)

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 hari
    })

    return res.status(200).json({ accessToken })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

const loginWithGoogle = async (req, res) => {
  const { body, path, method } = req
  const client = new OAuth2Client(CONFIG.googleClientId)

  try {
    // Verify Google ID token
    const ticket = await client.verifyIdToken({ idToken: body.idToken, audience: CONFIG.googleClientId })
    if (ticket.getPayload()) {
      const email = ticket.getPayload()?.email
      const username = ticket.getPayload()?.name
      const photo = ticket.getPayload()?.picture

      let user = await AuthService.findUserByEmail(email)
      if (!user) {
        user = await AuthService.addUser({ username, email, photo })
      }

      const { password, ...other } = user._doc
      const accessToken = jwt.sign({ ...other }, CONFIG.accessTokenSecret, { expiresIn: '1d' })
      const refreshToken = jwt.sign({ ...other }, CONFIG.refreshTokenSecret, { expiresIn: '7d' })
      logger.info(`${method}:/auth${path}\tSukses login ${username}`)

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 hari
      })
      return res.status(200).json({ accessToken })
    }
  } catch (error) {
    return res.status(400).json({ error })
  }
}

const refresh = (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) {
    logger.error(`${req.method}:/auth${req.path}\tTidak ada cookie jwt atau cookie secure`)
    return res.status(401).json({ message: 'unauthorized' })
  }
  const refreshToken = cookies.jwt

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    const { email } = decoded
    if (err) {
      logger.error(`${req.method}:/auth${req.path}\tForbidden`)
      return res.status(403).json({ message: 'Forbidden' })
    }

    const foundUser = await AuthService.findUserByEmail(email)
    if (!foundUser) {
      logger.error(`${req.method}:/auth${req.path}\tUnaouthorized`)
      return res.status(401).json({ message: 'unauthorized' })
    }

    const { password, ...other } = foundUser._doc
    const accessToken = jwt.sign({ ...other }, CONFIG.accessTokenSecret, { expiresIn: '1d' })
    logger.info(`${req.method}:/auth${req.path}\tBerhasil melakukan refresh token`)
    res.json({ accessToken })
  })
}

const logout = (req, res) => {
  const { cookies } = req
  if (!cookies?.jwt) {
    logger.error(`${req.method}:/auth${req.path}\tTidak ada cookie jwt atau cookie secure`)
    return res.sendStatus(204)
  }

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
  logger.info(`${req.method}:/auth${req.path}\tBerhasil menghapus token`)
  res.status(200).json({ message: 'Cookie cleared' })
}

module.exports = { register, login, loginWithGoogle, refresh, logout }
