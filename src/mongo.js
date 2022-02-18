const mongoose = require('mongoose')
require('dotenv').config()
const connectionString = `mongodb+srv://midudev:${process.env.PASS}@midudev6api.ylvog.mongodb.net/midudev6api?retryWrites=true&w=majority`

// connection to database with mongooso
mongoose.connect(connectionString, {
    useNewUrlParser: true,
})
    .then(() => {
        console.log('Database Connected')
    }).catch(err => {
    console.error(err)
})















