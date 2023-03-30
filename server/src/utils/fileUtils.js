const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const deleteFile = async (filePath) => {
  fs.unlinkSync(path.join(__dirname, '../../assets', filePath))
}

const compressedFile = async (filename) => {
  return new Promise((resolve, reject) => {
    const compressedPath = path.join(__dirname, '../../assets', filename)
    const sourcePath = path.join(__dirname, '../../uploads', filename)
    sharp(sourcePath)
      .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
      .toFile(compressedPath, (error, info) => {
        if (error) {
          reject(error)
        } else {
          fs.unlinkSync(path.join(__dirname, '../../uploads', filename))
          resolve(filename)
        }
      })
  })
}

module.exports = { deleteFile, compressedFile }
