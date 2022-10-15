const mongoose = require('mongoose');
const EquipmentSchema = new mongoose.Schema({
    equipType: { type: Number, required: true },
    equipIP: {
        type: String, required: true
    },
    service: {
        type: String, required: true
    },
    isOnline: {
        type: Boolean, required: true, default: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Equipment', EquipmentSchema)