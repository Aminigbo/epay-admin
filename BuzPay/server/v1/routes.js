const router = require("express").Router(); 


//  started new
router.use("/auth", require("./authentication/routes"))


module.exports = router