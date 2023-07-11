const Report = require('../models/report.model')
const User = require('../models/user.model')

const createReport = async ({ userTarget, userSender }) => {
  return await Report.create({ userTarget, userSender })
}

const getSystems = async () => {
  return await User.findOne({ isAdmin: true }, { _id: 1 })
}

module.exports = { createReport, getSystems }
