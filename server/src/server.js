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
const { routes } = require('./routes')
const corsOptions = require('./config/corsOptions')

// connect to db
connectDB()

const app = express()
const port = process.env.PORT

app.use(cookieParser())
app.use(express.json())
app.use(cors(corsOptions))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

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
