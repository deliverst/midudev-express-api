const http = require('http')
const express = require('express')
const app = express()
const logger = require('./loggerMiddleware')
const cors = require('cors')


app.use(cors())

let notes = [
    {
        userId: 1,
        id: 1,
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
    },
    {
        userId: 1,
        id: 2,
        title: "qui est esse",
        body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla"
    },
    {
        userId: 1,
        id: 3,
        title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        body: "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut"
    }
]

// MIDELWARES
app.use(express.json())
app.use(logger)


// HOME
app.get('/', (req, res) => {
    res.send('<h1>Hola muchachin</h1>')
})

//GET ALL NOTES
app.get('/api/notes', (req, res) => {
    res.json(notes)
})

// GET
app.get('/api/notes/:id', (req, res) => {
    const {id} = req.params
    const note = notes.find(notes => notes.id === Number(id))

    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }

})

//DELETE
app.delete('/api/delete/:id', (req, res) => {
    const {id} = req.params
    console.log(id)
    notes = notes.filter(note => note.id !== Number(id))
    res.status(204).end()
})

// POST
app.post('/api/notes', (req, res) => {
    let info = req.body

    if (!info || !req.body.body || !req.body.title) {
        return res.status(400).json({error: 'note.content is missing'})

    }
    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)
    console.log(maxId)

    const newNote = {
        userId: 1,
        id: maxId + 1,
        title: req.body.title || '',
        body: req.body.body,
        date: new Date().toLocaleString()
    }

    console.log(newNote)
    notes = [...notes, newNote]

    res.status(201).json(newNote)
})

app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found'
    })
    console.log(req.path)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Se esta escuchando por el puerto ${PORT}`)
})

// const app = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'application/json' })
//     // res.end('como estas muchacho')
//     res.end(JSON.stringify(notes))
// })