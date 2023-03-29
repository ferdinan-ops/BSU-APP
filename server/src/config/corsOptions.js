const { logger } = require('../utils/logger')
const allowedOrigin = require('./allowedOrigin')

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigin.indexOf(origin !== -1 || !origin)) return callback(null, true)
    logger.error('Not allowed by CORS')
    callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
  optionsSuccessStatus: 200
}

module.exports = corsOptions
