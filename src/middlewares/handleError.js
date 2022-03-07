const ERROR_HADNLES = {
    'CastError': res => res.status(400).send({err: 'id used is malformed'}),
    'ValidationError': (res, err) => res.status(409).send({error: err.message}),
    'JsonWebTokenError': res => res.status(401).json({error: 'toke invalid'}),
    'DefaultError': res => res.status(500).end(),
    'TokenHasEpirerError': res => res.status(401).json({error: 'Token Expired'})

}

module.exports = (err, req, res) => {
    console.error(err.name)
    const handler = ERROR_HADNLES[err.name] || ERROR_HADNLES.DefaultError
    handler(res, error)

}