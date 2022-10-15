const ping = require('ping');
const Equipment = require('../models/equipement.model');
const { createError } = require('../controllers/error.controller');

const pingMachines = async () => {

    setInterval(async () => {
        let allMachines = await Equipment.find({});
        allMachines.forEach((equip) => {
            ping.sys.probe(equip.equipIP, async (isAlive) => {
                console.log("Is ALive", isAlive)
                if (!isAlive) {
                    await createError({ equipment: equip._id, errorDescription: "machine doesn't respond to ping request" })
                }
            });
        })
    }, 10 * 1000)

}
module.exports = { pingMachines }