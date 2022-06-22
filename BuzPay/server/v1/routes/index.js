const router = require("express").Router();  

const {prelaunch} = require("../controllers/prelaunch/index")

 // authentication route
router.use("/notifications", require("./notifications/index"))

router.use("/top-up", require("./topup/index"))

router.use("/make-post", require("./post/index"))

router.use("/vendor", require("./vendor/index"))

router.post("/prelaunch", prelaunch)

module.exports = router