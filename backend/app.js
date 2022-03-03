const express = require('express')
require('express-async-errors')
const path = require('path');

const app = express()
app.use(express.static('build'))
app.use(express.json())

const config = require('./utils/config')
config.dbConnect()


app.use(express.static(path.join(__dirname, 'build')));

const booksRouter = require('./controllers/books')
app.use('/api/books', booksRouter)

const cors = require('cors')
app.use(cors())

const middleware = require('./utils/middleware')
app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
