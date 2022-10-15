const router = require('express').Router();
const verifToken = require('../utils/verifToken');
const multer = require('multer');
const { fixError, getAllErrors } = require('../controllers/error.controller');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        console.log("file", file)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${uniqueSuffix}_${file.originalname}`)
    }
})

const upload = multer({
    storage: storage
})
router.put('/fix/:id', verifToken, upload.single('image'), fixError);
router.get('/', verifToken, getAllErrors)
module.exports = router