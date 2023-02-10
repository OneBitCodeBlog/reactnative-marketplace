const multer = require("multer")
const path = require("node:path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("public", "uploads", "products"))
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniquePrefix + file.mimetype.replace("image/", "."))
  }
})

const productUpload = multer({
  storage: storage,
  preservePath: true,
  fileFilter: function (req, file, callback) {
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      callback(new Error("only jpeg and png images allowed"))
    } else {
      callback(null, true)
    }
  }
})

module.exports = {
  productUpload
}