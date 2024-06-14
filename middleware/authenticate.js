const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    var token = req.headers.authorization;
    if(!token) {
        return res.status(401).send('Unauthorized: No token provided');
    }

    jwt.verify(token,'S3cret',(err,decoded) => {
        if(err) {
            return res.status(401).send('Unauthorized: Invalid token');
        }
        req.userId = decoded.userId
        next();
    })
}

module.exports = { authenticate };
