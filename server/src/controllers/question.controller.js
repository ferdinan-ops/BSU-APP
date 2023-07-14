const { questionValidation } = require('../validations/question.validation')
const QuestionService = require('../services/question.service')
const { logger } = require('../utils/logger')
const { deleteFile } = require('../utils/fileUtils')

const createQuestion = async (req, res) => {
  const { path, body, method, userId } = req
  const { value, error } = questionValidation({ userId, ...body })
  if (error) {
    logger.error(`${method}:/questions${path}\t${error.details[0].message}`)
    return res.status(422).json({ error: error.details[0].message })
  }

  if (req.files.length === 0) {
    logger.error(`${method}:/questions${path}\tTidak ada gambar yang diupload`)
    return res.status(400).json({ error: 'Tidak ada gambar yang diupload' })
  }
  value.images = await QuestionService.proccessImages(req.files)
  value.semester = value.semester.toString()

  try {
    const data = await QuestionService.addQuestionToDB(value)
    logger.info(`${method}:/questions${path}\tSukses menambahkan soal baru`)
    return res.status(201).json({ message: `Sukses menambahkan soal ${value.mataKuliah}`, data: data._id })
  } catch (error) {
    logger.error(`${method}:/questions${path}\t${error}`)
    return res.status(400).json({ error })
  }
}

const getQuestions = async (req, res) => {
  const { path, method, query } = req
  const { search } = query

  const currentPage = query.page || 1
  const perPage = query.perPage || 6
  let skipItems = (parseInt(currentPage) - 1) * parseInt(perPage)

  let totalItem
  let questions

  console.log({ page: currentPage, perPage, skipItems })

  try {
    if (search) {
      const totalDoc = await QuestionService.getSearchQuestionCount(search)
      totalItem = totalDoc
      const data = await QuestionService.searchQuestion(search, perPage, skipItems)
      if (data.length === 0) {
        const message = `Tidak dapat menemukan soal dengan keyword ${search}`
        logger.error(`${method}:/questions?search=${search}\t${message}`)
        return res.status(404).json({ error: message })
      }
      questions = data
      logger.info(`${method}:/questions?search=${search}\tSukses menemukan soal dari keyword ${search}`)
    } else {
      const totalDoc = await QuestionService.getQuestionsCountFromDB()
      totalItem = totalDoc
      questions = await QuestionService.getQuestionsFromDB(perPage, skipItems)
      logger.info(`${method}:/questions${path}\tSukses seluruh mendapatkan soal`)
    }

    return res.status(200).json({
      data: questions,
      total_data: totalItem,
      current_page: parseInt(currentPage),
      per_page: parseInt(perPage)
    })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

const getQuestion = async (req, res) => {
  const { path, method, params } = req
  const { questionId } = params

  try {
    const question = await QuestionService.getQuestionById(questionId)
    if (!question) {
      logger.error(`${method}:/questions${path}\tTidak dapat menemukan soal`)
      return res.status(404).json({ error: `Tidak dapat menemukan soal dengan ID ${questionId}` })
    }

    logger.info(`${method}:/questions${path}\tSukses mendapatkan soal`)
    return res.status(200).json({ data: question })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

const updateQuestion = async (req, res) => {
  const { body, path, method, params, userId } = req
  if (!Array.isArray(body.images)) body.images = [body.images]

  const { questionId } = params
  const { value, error } = questionValidation({ userId, ...body })

  if (error) {
    logger.error(`${method}:/questions${path}\t${error.details[0].message}`)
    return res.status(422).json({ error: error.details[0].message })
  }

  if (req.files.length === 0 && !value.images) {
    logger.error(`${method}:/questions${path}\tTidak ada gambar yang diupload`)
    return res.status(400).json({ error: 'Tidak ada gambar yang diupload' })
  }

  if (req.files.length > 0) {
    const result = await QuestionService.proccessImages(req.files)
    value.images = [...value.images, ...result]
  }
  value.semester = value.semester.toString()

  try {
    await QuestionService.updateQuestionById(questionId, value)
    logger.info(`${method}:/questions${path}\tSukses mengubah soal`)
    return res.status(200).json({ message: `Berhasil mengubah soal dengan ID ${questionId}` })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

const deleteQuestion = async (req, res) => {
  const { path, method, params } = req
  const { questionId } = params

  try {
    const question = await QuestionService.getQuestionById(questionId)
    if (!question) {
      logger.error(`${method}:/questions${path}\tTidak dapat menemukan soal`)
      return res.status(404).json({ error: `Tidak dapat menemukan soal dengan ID ${questionId}` })
    }

    question.images.forEach((image) => deleteFile(image))
    await QuestionService.deleteQuestionById(questionId)
    logger.info(`${method}:/questions${path}\tSukses menghapus soal`)
    return res.status(200).json({ message: `Berhasil menghapus soal dengan ID ${questionId}` })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

const likeQuestion = async (req, res) => {
  const { path, method, params, userId } = req
  const { questionId } = params

  try {
    await QuestionService.likeQuestionByUserId(questionId, userId)
    logger.info(`${method}:/questions${path}\tSukses like soal`)
    return res.status(200).json({ message: `Berhasil like soal dengan questionId ${questionId}` })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

const saveQuestion = async (req, res) => {
  const { path, method, params, userId } = req
  const { questionId } = params

  try {
    await QuestionService.saveQuestionByUserId(questionId, userId)
    logger.info(`${method}:/questions${path}\tSukses menyimpan soal`)
    return res.status(200).json({ message: `Berhasil menyimpan soal dengan questionId ${questionId}` })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

module.exports = {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  likeQuestion,
  saveQuestion
}
