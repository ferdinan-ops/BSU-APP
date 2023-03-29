const Report = require('../models/report.model')
const User = require('../models/user.model')

const createReport = async ({ message, userTarget, userSender }) => {
  return await Report.create({ message, userTarget, userSender })
}

const getSystems = async () => {
  return await User.findOne({ isAdmin: true }, { _id: 1 })
}

module.exports = { createReport, getSystems }
