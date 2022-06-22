const router = require("express").Router();  

router.use("/authentication", require("./authentication/index"))


module.exports = router