// const { logger } = require('../utils/logger')
// const allowedOrigin = require('./allowedOrigin')
import { logger } from '../utils/logger'
import allowedOrigin from './allowedOrigin'

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigin.indexOf(origin !== -1 || !origin)) return callback(null, true)
    logger.error('Not allowed by CORS')
    callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
  optionsSuccessStatus: 200
}
export default corsOptions
// module.exports = corsOptions
