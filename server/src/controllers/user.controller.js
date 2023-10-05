const UserService = require('../services/user.service')
const { logger } = require('../utils/logger')
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
  const { userId, path, method, body, file } = req
  const { value, error } = userValidation(body)
  if (error) {
    logger.error(`${method}:/users\t${error.message}`)
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    const user = await UserService.getUserById(userId)

    if (req.file) {
      value.photo = await UserService.processPhoto(user._doc.photo, file.filename)
    } else if (req.file === '') {
      value.photo = user._doc.photo
    }

    await UserService.updateUserById(userId, value)
    const { username, photo } = await UserService.getUserById(userId)
    logger.info(`${method}:/users${path}\tSukses mengubah data user`)
    return res.status(200).json({ message: 'Sukses mengubah data user', data: { username, photo } })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

const getUserQuestions = async (req, res) => {
  const { params, path, method, query } = req
  const { userId } = params

  const currentPage = query.page || 1
  const perPage = query.perPage || 6
  let skipItems = (parseInt(currentPage) - 1) * parseInt(perPage)
  let totalItem

  try {
    const totalDoc = await UserService.getMyQuestionsCount(userId)
    totalItem = totalDoc

    const questions = await UserService.getMyQuestions(userId, perPage, skipItems)
    if (!questions) {
      logger.error(`${method}:/users${path}\tTidak dapat menemukan soal dengan userId ${userId}`)
      return res.status(404).json({ error: `Tidak menemukan soal dengan userId ${userId}` })
    }
    logger.info(`${method}:/users${path}\tBerhasil mendapatkan soal dengan userId ${userId}`)
    return res
      .status(200)
      .json({ data: questions, total_data: totalItem, per_page: perPage, current_page: currentPage })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

const getUserSaveQuestions = async (req, res) => {
  const { path, method, query } = req
  const { userId } = req.params

  const currentPage = query.page || 1
  const perPage = query.perPage || 6
  let skipItems = (parseInt(currentPage) - 1) * parseInt(perPage)
  let totalItem

  try {
    const totalDoc = await UserService.getMySaveQuestionsCount(userId)
    totalItem = totalDoc

    const questions = await UserService.getMySaveQuestions(userId, perPage, skipItems)
    if (!questions) {
      logger.error(`${method}:/users${path}\tTidak dapat menemukan soal yang disimpan dengan userId ${userId}`)
      return res.status(404).json({ error: `Tidak menemukan soal yang disimpan dengan userId ${userId}` })
    }
    logger.info(`${method}:/users${path}\tBerhasil mendapatkan soal yang disimpan dengan userId ${userId}`)
    return res
      .status(200)
      .json({ data: questions, total_data: totalItem, per_page: perPage, current_page: currentPage })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

const getUserLikeQuestions = async (req, res) => {
  const { path, method, query } = req
  const { userId } = req.params

  const currentPage = query.page || 1
  const perPage = query.perPage || 6
  let skipItems = (parseInt(currentPage) - 1) * parseInt(perPage)
  let totalItem

  try {
    const totalDoc = await UserService.getMyLikesQuestionsCount(userId)
    totalItem = totalDoc

    const questions = await UserService.getMyLikesQuestions(userId, perPage, skipItems)
    if (!questions) {
      logger.error(`${method}:/users${path}\tTidak dapat menemukan soal yang disukai dengan userId ${userId}`)
      return res.status(404).json({ error: `Tidak menemukan soal yang disukai dengan userId ${userId}` })
    }
    logger.info(`${method}:/users${path}\tBerhasil mendapatkan soal yang disukai dengan userId ${userId}`)
    return res
      .status(200)
      .json({ data: questions, total_data: totalItem, per_page: perPage, current_page: currentPage })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

module.exports = { getUser, updateUser, getUserQuestions, getUserSaveQuestions, getUserLikeQuestions }
