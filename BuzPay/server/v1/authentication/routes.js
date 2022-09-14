const router = require("express").Router();

const { signin, signup,confirmEmail,reset_password } = require("./controller") 

router.post("/signin", signin)
router.post("/signup", signup) 
router.post("/resetpwd_otp", confirmEmail) 
router.post("/resetpwd", reset_password) 

module.exports = router