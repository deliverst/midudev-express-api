const {Schema, model} = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    name: String,
    passwordHash: String,
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }]
})

userSchema.set('toJSON', ({
    transform: (document, returnOnject) => {
        returnOnject.id = returnOnject._id
        delete returnOnject._id
        delete returnOnject.__v
        delete returnOnject.passwordHash
    }
}))

userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)

module.exports = User