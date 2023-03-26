const Notification = require('../models/notification.model')

exports.pushNotification = async ({ message, userTarget, userSender, link }) => {
  return await Notification.create({ message, userTarget, userSender, link })
}

exports.getNotificationsFromDB = async (userId) => {
  return await Notification.find({ userTarget: userId })
    .populate('userSender', 'username photo')
    .sort({ createdAt: -1 })
}

exports.markNotificationAsRead = async (notifId, userId) => {
  return await Notification.findOneAndUpdate({ _id: notifId, userTarget: userId }, { read: true })
}

exports.markAllNotificationAsRead = async (userId) => {
  return await Notification.updateMany({ userTarget: userId }, { read: true })
}
