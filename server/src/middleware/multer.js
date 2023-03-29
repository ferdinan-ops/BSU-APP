const multer = require('multer')
const logger = require('../utils/logger')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + ' - ' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/svg']
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    logger.info('File type not supported')
    cb(new Error('File type not supported', false))
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB
  }
})

module.exports = upload
