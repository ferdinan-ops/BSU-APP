const jwt = require('jsonwebtoken')
const { logger } = require('../utils/logger')
const { CONFIG } = require('../config/environtment')

const verifyJwt = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (!authHeader?.startsWith('Bearer ')) {
    logger.error(`${req.method}:${req.path}\tunaiuthorized`)
    return res.status(401).json({ message: 'unauthorized' })
  }

  const token = authHeader.split(' ')[1]
  jwt.verify(token, CONFIG.accessTokenSecret, (err, decoded) => {
    if (err) {
      logger.error(`${req.method}:${req.path}\tforbidden`)
      return res.status(403).json({ message: 'forbidden' })
    }
    req.userId = decoded._id
    req.isAdmin = decoded.isAdmin
    next()
  })
}

module.exports = verifyJwt
