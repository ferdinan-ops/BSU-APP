const NotificationService = require('../services/notification.service')
const { logger } = require('../utils/logger')

const getNotifications = async (req, res) => {
  const { userId, path, method } = req
  try {
    const notifications = await NotificationService.getNotificationsFromDB(userId)
    logger.info(`${method}: /notification/${path}\tBerhasil mengambil notifikasi dari userId ${userId}`)
    return res.status(200).json({ data: notifications })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

const markAsRead = async (req, res) => {
  const { userId, path, method, params } = req
  try {
    await NotificationService.markNotificationAsRead(params.notifId, userId)
    logger.info(`${method}: /notification/${path}\tMembaca notifikasi dengan ID ${params.notifId}`)
    return res.status(200).json({ message: `Membaca notifikasi dengan ID ${params.notifId}` })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

const markAllAsRead = async (req, res) => {
  const { userId, path, method } = req
  try {
    await NotificationService.markAllNotificationAsRead(userId)
    logger.info(`${method}: /notification/${path}\tMembaca notifikasi dengan userId ${userId}`)
    return res.status(200).json({ message: `Membaca seluruh notifikasi dengan userId ${userId}` })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

module.exports = { getNotifications, markAsRead, markAllAsRead }
