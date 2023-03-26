const ReportService = require('../services/report.service')
const { pushNotification } = require('../services/notification.service')
const { logger } = require('../utils/logger')
const { reportCommentValidation } = require('../validations/report.validation')

exports.reportComment = async (req, res) => {
  const { body, path, method, userId } = req
  const { value, error } = reportCommentValidation(body)
  if (error) {
    logger.error(`${method}:/reports${path}\t${error.details[0].message}`)
    return res.status(422).json({ error: error.details[0].message })
  }

  const { message, questionId: link, userCommentId: userTarget } = value
  if (userId === userTarget) {
    logger.error(`${method}: /reports${path}\tAnda tidak dapat melapor diri sendiri`)
    return res.status(204).json({ error: 'Anda tidak dapat melapor diri sendiri' })
  }

  const messageNotif = 'Komentar anda telah dilaporkan, silahkan buat komentar yang baik & benar'
  const system = '63ad4799c1ebf859f3011684'

  try {
    await ReportService.createReport({ message, userTarget, userSender: userId })
    await pushNotification({ message: messageNotif, userTarget, link, userSender: system })
    logger.info(`${method}: /reports${path}\tBerhasil melaporkan komentar dan push notifikasi`)
    res.status(200).json({ msg: 'Berhasil melaporkan komentar' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.reportQuestion = async (req, res) => {
  const { body, path, method, userId } = req
  const { value, error } = reportCommentValidation(body)
  if (error) {
    logger.error(`${method}:/reports${path}\t${error.details[0].message}`)
    return res.status(422).json({ error: error.details[0].message })
  }

  const { message, questionId: link, userQuestionId: userTarget } = value
  if (userId === userTarget) {
    logger.error(`${method}: /reports${path}\tAnda tidak dapat melapor diri sendiri`)
    return res.status(204).json({ error: 'Anda tidak dapat melapor diri sendiri' })
  }

  const messageNotif = 'Soal anda telah dilaporkan, silahkan upload soal yang benar'
  const system = '63ad4799c1ebf859f3011684'

  try {
    await ReportService.createReport({ message, userTarget, userSender: userId })
    await pushNotification({ message: messageNotif, userTarget, link, userSender: system })
    logger.info(`${method}: /reports${path}\tBerhasil melaporkan soal dan push notifikasi`)
    res.status(200).json({ msg: 'Berhasil melaporkan soal' })
  } catch (error) {
    res.status(500).json({ error })
  }
}
