const mongoose = require('mongoose')
require('dotenv').config()
const {NODE_ENV, MONGO_DB_UNIT_TEST, MONGO_DB_UNIT_PROD} = process.env
// console.log(NODE_ENV)
const connectionString = NODE_ENV === 'test' ? MONGO_DB_UNIT_TEST : MONGO_DB_UNIT_PROD

// connection to database with mongooso
mongoose.connect(connectionString, {
    useNewUrlParser: true,
})
    .then(() => {
        const actualConnection = NODE_ENV === 'test' ? 'Development' : 'Production'
        console.log(`Database Connected to ${actualConnection}`)
    }).catch(err => {
    console.error(err)
})
//
// process.on('uncaughtException'), () => {
//     mongoose.connection.disconnect()
// }
//













