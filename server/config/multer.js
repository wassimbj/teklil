const multer = require("multer");
const path = require("path");
const { nanoid } = require("nanoid");

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${path.join(__dirname, "../public/storage")}`);
  },
  filename: function (req, file, cb) {
    cb(null, `img_${nanoid(15) + path.extname(file.originalname)}`);
  },
});

let upload = multer({
  storage,
  limits: { fileSize: 3000000 }, // 3000000 = 3MB
  fileFilter: function (req, file, cb) {
    // file.fieldname == 'image' || file.fieldname == 'specialityImg'
    // console.log('File type: ', file.mimetype.split('/')[0])
    if (file.mimetype.split("/")[0] == "image") {
      var filetypes = /jpeg|jpg|png/;
      var mimetype = filetypes.test(file.mimetype);
      var extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );

      // success
      if (mimetype && extname) {
        return cb(null, true);
      }

      // Fail
      cb("Invalid image type");
    } else if (
      file.mimetype.split("/")[0] == "application" &&
      file.mimetype.split("/")[1] == "pdf"
    ) {
      return cb(null, true);
    }
  },
});

module.exports = upload;
