const { getNotifications, markAsRead, markAllAsRead } = require('../controllers/notification.controller')
const verifyJwt = require('../middleware/verifyJwt')
const express = require('express')

const notificationRouter = express.Router()

notificationRouter.get('/', verifyJwt, getNotifications)
notificationRouter.put('/mark/:notifId', verifyJwt, markAsRead)
notificationRouter.put('/mark-all', verifyJwt, markAllAsRead)

module.exports = { notificationRouter }
