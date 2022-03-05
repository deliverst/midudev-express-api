const mongoose = require('mongoose')
const Note = require("../src/models/Note");
const {server} = require('../src/index')
const {updateNotes, initialNotes, api, getAllContetFromNotes, getAllTitlesFromNotes, closeAllConnections} = require('./helpers')

describe('POST | Testing all notes', () => {

    beforeEach(async () => {
        await Note.deleteMany({})
        //-----------------LLAMADA MANUALMENTE-----------------//
        // const nota1 = new Note(initialNotes[0])
        // await nota1.save()

        // const nota2 = new Note(initialNotes[1])
        // await nota2.save()

        // ----------------------PARALELO----------------------//
        // No se tiene control de cual se guarda primero
        // const notesObjects = initialNotes.map(note => new Note(note))
        // const promies = notesObjects.map(note => note.save())
        // await Promise.all(promies)

        // ---------------------SECUENCIAL---------------------//
        for (const note of initialNotes) {
            const noteObject = new Note(note)
            await noteObject.save()
        }

    })

    test('1.- Notes are returned to json', async () => {
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('2.- Check insertion initalNotes in databse', async () => {
        const {response} = await getAllContetFromNotes()
        expect(response.body).toHaveLength(initialNotes.length)

    })

    test('3.- Check if one note content body of one note', async () => {
        const {body} = await getAllTitlesFromNotes()
        expect(body).toContain('La revancha del principe charro')
    })

    test('4.- Creation new note', async () => {
        const newNote = {
            title: "Division Minúscula",
            body: "Extrañando Casa"
        }
        await api.post('/api/notes')
            .send(newNote)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const {contents, response} = await getAllContetFromNotes()

        expect(response.body).toHaveLength(initialNotes.length + 1)

        expect(contents).toContain(newNote.content)

    })

    test('5.- Creation new nota without content is add (Error)', async () => {
        const newNote = {}

        await api.post('/api/notes')
            .send(newNote)
            .expect(400)

        const response = await api.get('/api/notes')
        expect(response.body).toHaveLength(initialNotes.length)

    })
})

describe('DELETE | Method Delete Notes', () => {

    test('1.- Delete first note add before and check if was delete', async () => {
        const {response: firstResponse} = await getAllContetFromNotes()
        const {body: notes} = firstResponse
        const noteToDelete = notes[0]
        await api
            .delete(`/api/notes/${noteToDelete.id}`)
            .expect(204)

        const {response: secondResponse} = await getAllContetFromNotes()
        expect(secondResponse.body).toHaveLength(initialNotes.length - 1)
        // expect(contents).not.toContain(noteToDelete.content)
    })

    test('2.- Delete a note that dont exist (Error)', async () => {
        await api
            .delete('/api/notes/12984urtjiefow3')
            .expect(500)
        // todo return 400 error

        const {response} = await getAllContetFromNotes()
        expect(response.body).toHaveLength(initialNotes.length - 1)
    })

});

describe('UPDATE NOTE', () => {
    test('Update Notes and check if note was update', async () => {
        const notesMongo = await getAllContetFromNotes()
        const {response: firstResponse} = notesMongo
        const idElement = firstResponse.body[0].id
        console.log(idElement)

        const localNotes = updateNotes[0]
        console.log(localNotes)

        await api
            .put(`/api/notes/${idElement}`)
            .expect(200)
            .send(localNotes)

        const {response: secondResponse} = await getAllContetFromNotes()
        const {response: firstResponseLocal} = notesMongo
        expect(secondResponse.body[0].body).toContain(localNotes.body)
        closeAllConnections()
    })
})

// npm run test -- -t "notes are returned to json"
