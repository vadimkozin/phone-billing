const { auth: { login, password } } = require('../config');

module.exports = (req, res, next) => {
    if (req.query.login === login && req.query.password === password) {
        
        req.user = { login };

        next();
    } else {
        res.redirect('/');
    }
};