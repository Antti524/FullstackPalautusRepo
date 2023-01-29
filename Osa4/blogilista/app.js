const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const morgan = require('morgan')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')


//Morgan consolitulostus
app.use(morgan('tiny'))

mongoose.connect(config.mongoUrl)
    .then(() => {
        console.log('Connected to DB')
    })
    .catch((error) => {
        console.log('error connection to DB:', error.message)
    })

app.use(cors())
app.use(express.json())
//Tämän pitää olla ennen routers osiota
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

//Blogrouters käyttöönotto
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


module.exports = app