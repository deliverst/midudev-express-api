require('./mongo')
require('dotenv').config()

const http = require('http')
const express = require('express')
const app = express()
const Note = require('./models/Note')

// middelwars
const cors = require('cors')
const notFound = require('./middlewares/404')
const logger = require('./middlewares/loggerMiddleware')
const handleError = require('./middlewares/handleError')

// middelwars exe
app.use(express.json())
app.use(logger)
app.use(cors())
app.use('/images', express.static('src/images'))


// HOME
app.get('/', (req, res) => {
    res.send('<h1>Hola muchachin</h1>')
})

//GET ALL NOTES
app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes)
    })
    // res.json(notes)
})

// GET
app.get('/api/notes/:id', (req, res, next) => {
    const {id} = req.params
    // const note = notes.find(notes => notes.id === Number(id))
    Note.findById(id).then(note => {
        if (note) {
            return res.json(note)
        } else {
            console.log('1')
            res.status(404).end()
        }
    }).catch(err => {
        console.log('1.5')
        next(err)
        console.log('1.6')
    })
})

// DELETE
app.delete('/api/delete/:id', (req, res, next) => {
    const {id} = req.params
    Note.findByIdAndDelete(id)
        .then(() => res.status(204).end())
        .catch(err => next(err))
})

// PUT
app.put('/api/update/:id', (req, res, next) => {
    const {id} = req.params
    const {title, body} = req.body
    const newNoteInfo = {
        title: title,
        body: body,
        lastUpdate: new Date()
    }
    Note.findByIdAndUpdate(id, newNoteInfo, {new: true})
        .then(result => {res.json(result)})
        .catch(err => next(err))
})

// POST
app.post('/api/notes', (req, res) => {
    let info = req.body

    if (!info || !req.body.body || !req.body.title) {
        return res.status(400).json({error: 'note.content is missing'})
    }

    const newNote = new Note({
        title: req.body.title || '',
        body: req.body.body,
        date: new Date().toLocaleString(),
        lastUpdate: null
    })
    // const ids = notes.map(note => note.id)

    newNote.save()
        .then(savedNote => {res.json(savedNote)})
})

// 404
app.use(notFound)

// CATCH ERROR MIDDLEWEAR
app.use(handleError)

// LISTEN PORT
app.listen(process.env.PORT, () => {
    console.log(`Se esta escuchando por el puerto ${process.env.PORT}`)
})

// const app = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'application/json' })
//     // res.end('como estas muchacho')
//     res.end(JSON.stringify(notes))
// })