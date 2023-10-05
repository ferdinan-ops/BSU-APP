const { CONFIG } = require('./environtment')
const allowedOrigin = ['http://localhost:5173', CONFIG.frontendUrl]
module.exports = allowedOrigin
