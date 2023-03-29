const { authRoute } = require('./auth.route')
const { questionRoute } = require('./question.route')
const { notificationRoute } = require('./notification.route')
const { reportRoute } = require('./report.route')
const { userRoute } = require('./user.route')
const { commentRoute } = require('./comment.route')

const _routes = [
  ['/auth', authRoute],
  ['/questions', questionRoute],
  ['/comments', commentRoute],
  ['/notifications', notificationRoute],
  ['/reports', reportRoute],
  ['/users', userRoute]
]

const routes = (app) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}

module.exports = { routes }
