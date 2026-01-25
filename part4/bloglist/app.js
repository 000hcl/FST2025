const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

const app = express()
app.use(express.json())

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { family: 4 })

app.use('/api/blogs', blogsRouter)
app.use(middleware.errorHandler)

module.exports = app