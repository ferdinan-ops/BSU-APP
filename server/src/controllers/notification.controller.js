const NotificationService = require('../services/notification.service')
const { logger } = require('../utils/logger')

exports.getNotifications = async (req, res) => {
  const { userId, path, method } = req
  try {
    const notifications = await NotificationService.getNotificationsFromDB(userId)
    logger.info(`${method}: /notification/${path}\tBerhasil mengambil notifikasi dari userId ${userId}`)
    return res.status(200).json({ data: notifications })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

exports.markAsRead = async (req, res) => {
  const { userId, path, method, params } = req
  try {
    const notifications = await NotificationService.markNotificationAsRead(params.notifId, userId)
    logger.info(`${method}: /notification/${path}\tMembaca notifikasi dengan ID ${params.notifId}`)
    return res.status(200).json({ data: notifications })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

exports.markAllAsRead = async (req, res) => {
  const { userId, path, method } = req
  try {
    const notifications = await NotificationService.markAllNotificationAsRead(userId)
    logger.info(`${method}: /notification/${path}\tMembaca notifikasi dengan userId ${userId}`)
    return res.status(200).json({ data: notifications })
  } catch (error) {
    return res.status(400).json({ error })
  }
}
