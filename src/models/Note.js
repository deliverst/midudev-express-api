const {Schema, model } = require('mongoose')
const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema({
    title: String,
    body: String,
    date: Date,
    lastUpdate: Date
})

noteSchema.set('toJSON', ({
    transform: (document, returnOnject) => {
        returnOnject.id = returnOnject._id
        delete returnOnject._id
        delete returnOnject.__v
    }
}))

const Note = model('Note', noteSchema)
// Note.find({}).then(res =>{
//     console.log(res)
//     mongoose.connection.closed()
// })


module.exports = Note




// Note.find({}).then(res =>{
//     console.log(res)
//     mongoose.connection.closed()
// })



//
// const note = new Note({
//     title: "Hola mundo",
//     body: 'Este es el cuerpo de la nota para ver que pedo',
//     date: new Date(),
// })
//
// note.save()
//     .then(result => {
//         console.log(result)
//         mongoose.connection.close()
//     })
//     .then(err => {
//         console.error(err)
//     })

// useNewUrlParse:true,
//
//


