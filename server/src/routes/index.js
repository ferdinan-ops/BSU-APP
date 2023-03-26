const { authRoute } = require('./auth.route')
const { questionRoute } = require('./question.route')
const { notificationRouter } = require('./notification.route')
const { reportRouter } = require('./report.route')

const _routes = [
  ['/auth', authRoute],
  ['/questions', questionRoute],
  ['/notifications', notificationRouter],
  ['/reports', reportRouter]
]

const routes = (app) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}

module.exports = { routes }
