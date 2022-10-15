const router = require('express').Router();
const { registerUser, loginUser, getAllUsers, registerEquipement, registerError } = require('../controllers/user.controller');
const verifToken = require('../utils/verifToken');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', verifToken, getAllUsers)





module.exports = router

