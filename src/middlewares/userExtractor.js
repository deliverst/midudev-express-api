const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    const jwt = require("jsonwebtoken");
    const authorization = req.get('authorization')

    let token = null
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7)
    }

    let decodedToken = {}
    decodedToken = jwt.verify(token, process.env.SECRETWORD)

    const date = new Date(decodedToken.exp * 1000)
    console.log(date.toLocaleString())

    if (!token || !decodedToken.id) {
        return res.status(401).json({error: 'toke  missing or invalid'})
    }

    const {id: userId} = decodedToken
    req.userId = userId
    next()
}