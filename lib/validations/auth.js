var auth = require('../auth')

module.exports = function(req, res, next) {
    let token = req.headers.authorization
    if (!token) {
        return res.status(401).send({ code: 'UNAUTHORIZATED', message: 'No se ha proporcionado un token' });
    }
    auth.verifyToken(token)
    .then(function(decoded) {
        req.decoded = decoded;
        next()
    })
    .catch(function(error) {
        return res.status(401).send({ code: 'UNAUTHORIZATED', message: 'El token es incorrecto' })
    });
}