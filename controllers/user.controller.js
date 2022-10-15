const User = require('../models/user.model')
const Equipment = require('../models/equipement.model')
const Error = require('../models/error.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        let { name, firstName, email, password, role } = req.body;//Object destruction
        let hash = await bcrypt.hash(password, 10);
        let newUser = new User({
            name, firstName, email, role, password: hash
        });
        let result = await newUser.save();
        res.status(200).json({
            success: true,
            result: result
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            result: error.message
        })
    }
}
const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email: email });
        if (user) {
            let verif = await bcrypt.compare(password, user.password);
            if (verif) {
                let token = jwt.sign({ user: user._id }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
                res.json({
                    success: true,
                    result: {
                        token: token,
                        id: user._id,
                        role: user.role,
                        name: user.name,
                        firstName: user.firstName
                    }
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Email or password incorrect'
                })
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Email or password incorrect'

            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            result: error.message
        })
    }
}
const getAllUsers = async (req, res) => {
    try {
        let users = await User.find();
        res.json({
            success: true,
            result: users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            result: error.message
        })
    }
}


module.exports = {
    registerUser, loginUser, getAllUsers
}