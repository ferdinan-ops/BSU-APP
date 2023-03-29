const UserService = require('../services/user.service')
const { logger } = require('../utils/logger')
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const { userValidation } = require('../validations/user.validation')

const getUser = async (req, res) => {
  const { params, path, method } = req
  const { userId } = params

  try {
    const user = await UserService.getUserById(userId)
    if (!user) {
      logger.error(`${method}:/users${path}\tTidak dapat menemukan user`)
      return res.status(404).json({ error: `Tidak menemukan user dengan ID ${userId}` })
    }
    logger.info(`${method}:/users${path}\tBerhasil mendapatkan user dengan ID ${userId}`)
    return res.status(200).json({ data: user })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

const updateUser = async (req, res) => {
  const { userId, method, body, file } = req
  const { value, error } = userValidation(body)
  if (error) {
    logger.error(`${method}:/users\t${error.message}`)
    return res.status(400).json({ error: error.details[0].message })
  }

  const { filename } = file
  let { username, photo } = value

  try {
    if (req.file) {
      const compressedPath = path.join(__dirname, '../../assets/users', filename)
      sharp(path.join(__dirname, '../../uploads', filename))
        .resize(200, 200)
        .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
        .toFile(compressedPath, (err, info) => {
          if (info) {
            fs.unlinkSync(path.join(__dirname, '../../uploads', filename))
            photo = filename
          } else {
            logger.error(err)
          }
        })

      const user = await UserService.getUserById(userId)
      if (user.photo) {
        if (user.photo !== photo) {
          const deleted = UserService.deletePhoto(user.photo)
          logger.info(deleted)
        }
      }
    }

    await UserService.updateUserById(userId, { username, photo })
    logger.info(`${method}:/users${path}\tSukses mengubah data user`)
    return res.status(200).json({ message: 'Sukses mengubah data user' })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

const getUserQuestions = async (req, res) => {
  const { params, path, method } = req
  const { userId } = params

  try {
    const questions = await UserService.getMyQuestions(userId)
    if (!questions) {
      logger.error(`${method}:/users${path}\tTidak dapat menemukan soal dengan userId ${userId}`)
      return res.status(404).json({ error: `Tidak menemukan soal dengan userId ${userId}` })
    }
    logger.info(`${method}:/users${path}\tBerhasil mendapatkan soal dengan userId ${userId}`)
    return res.status(200).json({ data: questions })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

const getUserSaveQuestions = async (req, res) => {
  const { userId, path, method } = req

  try {
    const questions = await UserService.getMySaveQuestions(userId)
    if (!questions) {
      logger.error(`${method}:/users${path}\tTidak dapat menemukan soal yang disimpan dengan userId ${userId}`)
      return res.status(404).json({ error: `Tidak menemukan soal yang disimpan dengan userId ${userId}` })
    }
    logger.info(`${method}:/users${path}\tBerhasil mendapatkan soal yang disimpan dengan userId ${userId}`)
    return res.status(200).json({ data: questions })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

module.exports = { getUser, updateUser, getUserQuestions, getUserSaveQuestions }
