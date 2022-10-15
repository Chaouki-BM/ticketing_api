const Error = require("../models/error.model");
const Equipment = require("../models/equipement.model");
const createError = async ({ equipment, errorDescription }) => {
    try {
        let exist = await Error.findOne({
            equipment: equipment,
            isResolved: false,
        });
        if (!exist) {
            await Equipment.findByIdAndUpdate(equipment, { isOnline: false });
            let newError = new Error({
                equipment: equipment,
                errorDescription: errorDescription,
            });
            let result = await newError.save();
        }
    } catch (error) {
        console.log("Error", error.message);
    }
};

const fixError = async (req, res) => {
    try {
        let { resolutionDescription } = req.body; //Object destruction
        let { id } = req.params;
        let img = req.file.path;
        let fixedError = await Error.findByIdAndUpdate(id, {
            isResolved: true,
            resolutionDescription: resolutionDescription,
            resolutionImg: img,
            resolvedBy: req.user._id
        }, { new: true });

        await Equipment.findByIdAndUpdate(fixedError.equipment, { isOnline: true })

        res.status(200).json({
            success: true,
            result: fixedError,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            result: error.message,
        });
    }
};
const getAllErrors = async (req, res) => {

    try {
        let result = await Error.find({}).populate('equipment').populate('resolvedBy');

        res.status(200).json({
            success: true,
            result: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            result: error.message,
        });
    }
}
module.exports = {
    fixError,
    createError, getAllErrors
};
