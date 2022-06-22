const {signupController} = require ("../../controllers/authentication/signup")
const router = require("express").Router();  


router.post("/signup", signupController)
// router.use("/login", require("./authentication/index"))



module.exports = router