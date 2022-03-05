const {app} = require('../src/index')
const supertest = require('supertest')
const api = supertest(app)

const initialNotes = [{
    title: "PXNDX",
    body: "La revancha del principe charro",
    date: new Date()
}, {
    title: "PXNDX",
    body: "Para ti con desprecio",
    date: new Date()
}, {
    title: "Alison",
    body: "Fragil",
    date: new Date()
}]

const getAllContetFromNotes = async () => {
    const response = await api.get('/api/notes')
    return {
        contents: response.body.map(note => note.content),
        response
    }
}

const getAllTitlesFromNotes = async () => {
    const response = await api.get('/api/notes')
    return {
        body: response.body.map(note => note.body),
        response
    }
}

module.exports = {initialNotes, api, getAllContetFromNotes, getAllTitlesFromNotes}
