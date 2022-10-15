const Equipment = require('../models/equipement.model');

const registerEquipement = async (req, res) => {
    try {
        let { equipIP, service, isOnline, equipType } = req.body;//Object destruction
        let newEquipment = new Equipment({ equipIP, service, isOnline, equipType });
        let result = await newEquipment.save();
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
module.exports = {
    registerEquipement
}
