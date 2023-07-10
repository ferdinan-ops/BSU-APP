const Notification = require('../models/notification.model')

const pushNotification = async ({ message, userTarget, userSender, link }) => {
  return await Notification.create({ message, userTarget, userSender, link })
}

const getNotificationsFromDB = async (userId) => {
  return await Notification.find({ userTarget: userId })
    .populate('userSender', 'username photo provider')
    .sort({ createdAt: -1 })
}

const markNotificationAsRead = async (notifId, userId) => {
  return await Notification.findOneAndUpdate({ _id: notifId, userTarget: userId }, { read: true })
}

const markAllNotificationAsRead = async (userId) => {
  return await Notification.updateMany({ userTarget: userId }, { read: true })
}

module.exports = { pushNotification, getNotificationsFromDB, markNotificationAsRead, markAllNotificationAsRead }
