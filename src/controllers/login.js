const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')



loginRouter.post('/', async (req, res) => {

    const {username, password} = req.body
    const user = await User.findOne({username})
    const passwordValid = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordValid)) {
        res.status(401).json({
            error: 'invalid user or password'
        })
    }

    const userForToken = {
        id: user._id,
        username: user.username,
    }

    const token = jwt.sign(userForToken, process.env.SECRETWORD, {expiresIn: 60 * 60 * 60})


    res.send({
        id: user._id,
        username: user.username,
        token
    })


})

module.exports = loginRouter