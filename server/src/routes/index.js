const { authRoute } = require('./auth.route')
const { questionRoute } = require('./question.route')

const _routes = [
  ['/auth', authRoute],
  ['/questions', questionRoute]
]

const routes = (app) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}

module.exports = { routes }
