const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET_KEY)
        next();

    }
    catch (err) {

        res.status(401).json({ message: 'you are not logged in' })
    }

}