const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema(
  {
    userTarget: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    userSender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    message: {
      type: String,
      require: true
    },
    link: {
      type: String,
      require: true
    },
    read: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

const Notification = mongoose.model('notification', notificationSchema)
module.exports = Notification
