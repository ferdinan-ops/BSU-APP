const { questionValidation } = require('../validations/question.validation')
const QuestionService = require('../services/question.service')
const { logger } = require('../utils/logger')

const createQuestion = async (req, res) => {
  const { path, body, method, userId } = req
  const { value, error } = questionValidation({ userId, ...body })

  if (error) {
    logger.error(`${method}:/questions${path}\t${error.details[0].message}`)
    return res.status(422).json({ error: error.details[0].message })
  }

  try {
    await QuestionService.addQuestionToDB(value)
    logger.info(`${method}:/questions${path}\tSukses menambahkan soal baru`)
    return res.status(201).json({ message: `Sukses menambahkan soal ${value.mataKuliah}` })
  } catch (error) {
    logger.error(`/questions${path} | ${method} ~ ${error}`)
    return res.status(400).json({ error })
  }
}

const getQuestions = async (req, res) => {
  const { path, method, query } = req
  const { fakultas, search } = query

  try {
    let questions
    if (fakultas) {
      const data = await QuestionService.filterQuestionByFakultas(fakultas)
      if (data.length === 0) {
        const message = `Tidak dapat menemukan soal dari fakultas ${fakultas}`
        logger.error(`${method}:/questions?fakultas=${fakultas}\t${message}`)
        return res.status(404).json({ error: message })
      }
      questions = data
      logger.info(`${method}:/questions/?fakultas=${fakultas}\tSukses menemukan soal dari fakultas ${fakultas}`)
    } else if (search) {
      const data = await QuestionService.searchQuestion(search)
      if (data.length === 0) {
        const message = `Tidak dapat menemukan soal dengan keyword ${search}`
        logger.error(`${method}:/questions?search=${search}\t${message}`)
        return res.status(404).json({ error: message })
      }
      questions = data
      logger.info(`${method}:/questions?search=${search}\tSukses menemukan soal dari keyword ${search}`)
    } else {
      questions = await QuestionService.getQuestionsFromDB()
      logger.info(`${method}:/questions${path}\tSukses seluruh mendapatkan soal`)
    }

    return res.status(200).json({ data: questions })
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
  const { questionId } = params
  const { value, error } = questionValidation({ userId, ...body })

  if (error) {
    logger.error(`${method}:/questions${path}\t${error.details[0].message}`)
    return res.status(422).json({ error: error.details[0].message })
  }

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
    const question = QuestionService.getQuestionById(questionId)
    if (!question) {
      logger.error(`${method}:/questions${path}\tTidak dapat menemukan soal`)
      return res.status(404).json({ error: `Tidak dapat menemukan soal dengan ID ${questionId}` })
    }
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
