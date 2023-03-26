const Report = require('../models/report.model')

exports.createReport = async ({ message, userTarget, userSender }) => {
  return await Report.create({ message, userTarget, userSender })
}
