const mongoose = require('mongoose');

const ErrorSchema = new mongoose.Schema({
    isResolved: {
        type: Boolean, required: true, default: false
    },
    resolvedBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    equipment: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Equipment'
    },
    errorDescription: {
        type: String, default: null
    },
    resolutionDescription: {
        type: String, default: null
    },
    resolutionImg: {
        type: String, default: null
    }


}, {
    timestamps: true
})

module.exports = mongoose.model('Error', ErrorSchema)