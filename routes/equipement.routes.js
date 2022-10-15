const router = require('express').Router();
const verifToken = require('../utils/verifToken');
const { registerEquipement } = require('../controllers/equipment.controller')
router.post('/create', verifToken, registerEquipement);

module.exports = router; 