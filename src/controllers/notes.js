const notesRouter = require('express').Router()
const Note = require('../models/Note');

// GET ALL NOTES
notesRouter.get('/', async (req, res) => {
    try {
        const notes = await Note.find({})
        res.json(notes)
    } catch (e) {
        console.log(e)
    }
})

// GET ONE NOTE
notesRouter.get('/:id', async (req, res, next) => {
    const {id} = req.params
    // const note = notes.find(notes => notes.id === Number(id))
    Note.findById(id).then(note => {
        if (note) {
            return res.json(note)
        } else {

            res.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
})

// DELETE
notesRouter.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        await Note.findByIdAndDelete(id)
        res.status(204).end()
    } catch (e) {
        next(e)
    }
})

// PUT
notesRouter.put('/:id', async (req, res, next) => {
    const {id} = req.params
    const {title, body} = req.body
    const newNoteInfo = {
        title: title,
        body: body,
        lastUpdate: new Date()
    }
    try {
        const result = await Note.findByIdAndUpdate(id, newNoteInfo, {new: true})
        res.json(result)
    }catch (e) {
        next(e)
    }
})

// POST
notesRouter.post('/', async (req, res) => {
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
})

module.exports = notesRouter



















