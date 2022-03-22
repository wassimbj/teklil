const multer = require("multer")
const Storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, './storages')
        }
        ,
        filename: function (req, file, cb) {
            cb(null,file.originalname)
        }
    }
)
module.exports = multer({
    storage: Storage,
    limits: { _fileSize: 1024 * 1024 * 1024 * 10 },
    fileFilter: function (req, file, cb) {
        if (file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png") {
            cb(null, true);
        } else {
            cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
        }
    }
}
)