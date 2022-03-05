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
const {json} = require("express");

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
app.get('/api/notes', async (req, res) => {
    try {
        const notes = await Note.find({})
        res.json(notes)
    } catch (e) {
        console.log(e)
    }
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
app.delete('/api/notes/:id', async (req, res, next) => {
    // const {id} = req.params
    // console.log(id)
    // Note.findByIdAndDelete(id)
    //     .then(() => res.status(204).end())
    //     .catch(err => next(err))

    try {
        const {id} = req.params
        await Note.findByIdAndDelete(id)
        res.status(204).end()
    } catch (e) {
        next(e)
    }
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
app.post('/api/notes', async (req, res) => {
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

    try {
        const savedNote = await newNote.save()
        res.json(savedNote)
    } catch (error) {
        next(error)
    }

    // newNote.save()
    //     .then(savedNote => {res.json(savedNote)})
})

// 404
app.use(notFound)

// CATCH ERROR MIDDLEWEAR
app.use(handleError)

// LISTEN PORT
const server = app.listen(process.env.PORT, () => {
    console.log(`Se esta escuchando por el puerto ${process.env.PORT}`)
})

// const app = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'application/json' })
//     // res.end('como estas muchacho')
//     res.end(JSON.stringify(notes))
// })

module.exports = {app, server}