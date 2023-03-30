// MODULES
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const path = require('path')

// UTILITY
const { logger } = require('./utils/logger')
const connectDB = require('./utils/connectDB')
const corsOptions = require('./config/corsOptions')
const { routes } = require('./routes')

// connect to db
connectDB()

const app = express()
const port = process.env.PORT

// body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// cors
app.use(cors(corsOptions))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

// cookies parser
app.use(cookieParser())

// routes
routes(app)

app.use('/assets', express.static(path.join(__dirname, '../assets')))

mongoose.connection.once('open', () => {
  logger.info('Connected to MongoDB')
  app.listen(port, () => {
    logger.info(`Server is run at http://localhost:${port}`)
  })
})

mongoose.connection.on('error', (error) => {
  const { no, code, syscall, hostname } = error
  logger.error(`${no}: ${code}\t${syscall}\t${hostname}`)
})
