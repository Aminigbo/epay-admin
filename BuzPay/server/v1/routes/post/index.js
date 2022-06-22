const router = require("express").Router();
const {upload} = require("../../middlewares/upload")

const {
   makePost
} = require("../../controllers/post/index")  

router.post("/post", upload.single("postimage"), makePost) 

module.exports = router 