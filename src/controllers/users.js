const usersRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

// GEL ALL USER

usersRouter.get('/', async (req, res, next) => {
    const users = await User.find({})
    res.json(users)

})

// POST
usersRouter.post('/', async (req, res) => {
    const {body} = req
    const {username, name, password} = body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        username,
        name,
        passwordHash
    })

    try {
        const savedUser = await user.save()
        res.status(201).json(savedUser)
    } catch (e) {
        console.log(e)
    }
})

module.exports = usersRouter
