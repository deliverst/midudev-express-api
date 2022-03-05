const {app, server} = require('../src/index')
const supertest = require('supertest')
const mongoose = require("mongoose");
const api = supertest(app)
const User = require('../src/models/User')

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
}, {
    title: "Eli Noise",
    body: "Dulce duerme dulce",
    date: new Date()
}]

const updateNotes = [{
    title: "The Faceless",
    body: "Ancient Covenant"
}, {
    title: "Whitechapel",
    body: "Section 8"
}, {
    title: "Veil of Maya",
    body: "Crawl Back"
}, {
    title: "Eminem",
    body: "Slim Shaidy"
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

const getUsers = async () => {
    const usersDB = await User.find({})
    return usersDB.map(user => user.toJSON())
}
const closeAllConnections = () => {
    server.close()
    mongoose.connection.close()
}

module.exports = {
    initialNotes,
    api,
    getAllContetFromNotes,
    getAllTitlesFromNotes,
    updateNotes,
    closeAllConnections,
    getUsers
}


