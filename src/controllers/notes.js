const notesRouter = require('express').Router()
const Note = require('../models/Note');
const User = require("../models/User");
const {decode} = require("jsonwebtoken");
const userExtractor = require('../middlewares/userExtractor')

// GET ALL NOTES
notesRouter.get('/', async (req, res) => {
    try {
        const notes = await Note.find({}).populate('user', {
            username: 0,
            notes: 0,
            name: 0
        })
        res.json(notes)
    } catch (e) {

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
notesRouter.delete('/:id', userExtractor, async (req, res, next) => {
    try {
        const {id} = req.params
        await Note.findByIdAndDelete(id)
        res.status(204).end()
    } catch (e) {
        next(e)
    }
})

// PUT
notesRouter.put('/:id', userExtractor, async (req, res, next) => {
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
    } catch (e) {
        next(e)
    }
})

// POST
notesRouter.post('/', userExtractor, async (req, res, next) => {
    let {body, title} = req.body

    // await User.deleteMany({})

    const {userId} = req

    console.log(userId)
    const user = await User.findById(userId)

    if (!req.body || !body || !title) {
        return res.status(400).json({
            error: 'note.content is missing'
        })
    }

    const newNote = new Note({
        title: title || '',
        body: body,
        date: new Date().toLocaleString(),
        lastUpdate: null,
        user: user._id
    })

    try {

        const savedNote = await newNote.save()

        // save id of the note in the in each user
        console.log('before')
        console.log(savedNote._id)
        user.notes = user.notes.concat(savedNote._id)
        console.log(user.notes)
        console.log('after')
        await user.save()

        res.json(savedNote)
    } catch (error) {
        next(error)
    }
})

module.exports = notesRouter



















