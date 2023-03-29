const { getNotifications, markAsRead, markAllAsRead } = require('../controllers/notification.controller')
const verifyJwt = require('../middleware/verifyJwt')
const express = require('express')

const notificationRoute = express.Router()

notificationRoute.get('/', verifyJwt, getNotifications)
notificationRoute.put('/mark/:notifId', verifyJwt, markAsRead)
notificationRoute.put('/mark-all', verifyJwt, markAllAsRead)

module.exports = { notificationRoute }
