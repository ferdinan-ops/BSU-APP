const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  getNotificationNotRead
} = require('../controllers/notification.controller')
const verifyJwt = require('../middleware/verifyJwt')
const express = require('express')

const notificationRoute = express.Router()

notificationRoute.get('/', verifyJwt, getNotifications)
notificationRoute.get('/count', verifyJwt, getNotificationNotRead)
notificationRoute.put('/mark/:notifId', verifyJwt, markAsRead)
notificationRoute.put('/mark-all', verifyJwt, markAllAsRead)

module.exports = { notificationRoute }
