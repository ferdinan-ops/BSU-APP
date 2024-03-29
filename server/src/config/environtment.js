require('dotenv').config()

const CONFIG = {
  port: process.env.PORT,
  db: process.env.DB_URI,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  frontendUrl: process.env.FRONTEND_URL
}

module.exports = { CONFIG }
