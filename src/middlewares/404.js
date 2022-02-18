// 404
module.exports = (req, res) => {
    res.status(404).json({
        error: 'Not Found'
    })
    console.log(req.path)
}
