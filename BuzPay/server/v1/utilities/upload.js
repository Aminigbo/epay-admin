// for image upload
const multer = require("multer");
const { success, error } = require("consola")
// define file storage
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "public/vendors-application");
   },
   filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + 'BuzPay-vendor' + file.originalname)
   }
})

const fileFilter = (req, file, cb) => {


   // check for the file type
   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true)
      success({
         message: `File uploaded!
                ${file.originalname}
                ${file.mimetype}`,
         badge: true
      })
   } else {
      cb(null, false)
      error({
         message: `file type not supported
                ${file.originalname}
                ${file.mimetype}`,
         badge: true
      })
   }
}

const upload = multer({
   storage: storage,
   fileFilter: fileFilter
})

module.exports = {
   upload
}