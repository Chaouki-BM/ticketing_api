const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const verifToken = async (req, res, next) => {
    let token = req.headers['access-token'];
    if (!token) {
        res.status(400).json({
            success: false,
            message: 'No token provided'
        })
    } else {
        try {
            let verif = jwt.verify(token, process.env.TOKEN_SECRET);
            if (!verif) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid token provided'
                })
            } else {
                let decoded = jwt.decode(token);
                //console.log("decoded", decoded);
                let user = await User.findById(decoded.user);
                req.user = user;
                next()
            }
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }
}
module.exports = verifToken