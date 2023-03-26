const { logger } = require('../utils/logger')
const CommentService = require('../services/comment.service')
const { pushNotification } = require('../services/notification.service')
const { createCommentValidation, updateCommentValidation } = require('../validations/comment.validation')

exports.getComments = async (req, res) => {
  const { method, path, params } = req
  const { questionId } = params
  try {
    const comments = CommentService.getCommentsByQuestionID(questionId)
    logger.info(`${method}: /comments${path}\tSukses dapat seluruh komentar dengan questionId ${questionId}`)
    return res.status(200).json({ data: comments })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

exports.getComment = async (req, res) => {
  const { method, path, params } = req
  const { commentId } = params

  try {
    const comments = CommentService.getCommentByID(commentId)
    logger.info(`${method}: /comments${path}\tSukses dapat seluruh komentar dengan questionId ${commentId}`)
    return res.status(200).json({ data: comments })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

exports.createComment = async (req, res) => {
  const { body, method, path, userId } = req
  const { value, error } = createCommentValidation(body)

  if (error) {
    logger.error(`${method}:/comments${path}\t${error.details[0].message}`)
    return res.status(422).json({ error: error.details[0].message })
  }

  try {
    const { comment, questionId, userQuestionId: userTarget } = value
    const message = 'Mengomentari soal yang Anda buat'

    if (userId !== userTarget) {
      await pushNotification({ message, userTarget, userSender: userId, link: questionId })
      logger.info(`${method}: /notification${path}\tBerhasil push notifikasi`)
    }

    await CommentService.addCommentToDB({ comment, questionId, userId })
    logger.info(`${method}: /comments${path}\tBerhasil menambahkan komentar`)
    return res.status(201).json({ message: 'Berhasil menambahkan komentar' })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

exports.updateComment = async (req, res) => {
  const { body, method, path, params } = req
  const { commentId } = params

  const { value, error } = updateCommentValidation(body)
  if (error) {
    logger.error(`${method}:/comments${path}\t${error.details[0].message}`)
    return res.status(422).json({ error: error.details[0].message })
  }

  try {
    await CommentService.updateCommentByID(commentId, value.comment)
    logger.info(`${method}: /comments${path}\tBerhasil mengubah komentar`)
    return res.status(201).json({ message: `Berhasil mengubah komentar dengan ID ${commentId}` })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

exports.deleteComment = async (req, res) => {
  const { method, path, params } = req
  const { commentId } = params

  try {
    const comment = await CommentService.getCommentByID(commentId)
    if (!comment) {
      logger.error(`${method}:/questions${path}\tTidak dapat menemukan komentar`)
      return res.status(404).json({ error: `Tidak dapat menemukan komentar dengan ID ${commentId}` })
    }
    await CommentService.deleteCommentByID(commentId)
    logger.info(`${method}: /comments${path}\tBerhasil menghapus komentar`)
    return res.status(201).json({ message: 'Berhasil menghapus komentar' })
  } catch (error) {
    return res.status(400).json({ error })
  }
}
