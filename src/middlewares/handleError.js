module.exports = (err, req, res, next) => {
    console.log('2')
    console.error(err.name)
    if (err.name === 'CastError') {
        res.status(400).send({err: 'id used is malformed'})
    } else {
        res.status(500).end()
    }

}