require('./mongo')
require('dotenv').config()

const express = require('express')
const app = express()
const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/notes')
const loginRouter = require('./controllers/login')

// middelwars
const cors = require('cors')
const notFound = require('./middlewares/404')
const logger = require('./middlewares/loggerMiddleware')
const handleError = require('./middlewares/handleError')

// middleware exe
app.use(express.json())
app.use(logger)
app.use(cors())
app.use('/images', express.static('src/images'))

// HOME
app.get('/', (req, res) => {res.send('<h1>Hola guapo</h1>')})

// NOTES
app.use('/api/notes', notesRouter)

// USERS
app.use('/api/users', usersRouter)

// LOGIN
app.use('/login', loginRouter)

// 404
app.use(notFound)

// CATCH ERROR MIDDLEWARE
app.use(handleError)

// LISTEN PORT
const server = app.listen(process.env.PORT, () => {
    console.log(`Listen in port ${process.env.PORT}`)
})

// const app = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'application/json' })
//     // res.end('como estas muchacho')
//     res.end(JSON.stringify(notes))
// })

module.exports = {app, server}