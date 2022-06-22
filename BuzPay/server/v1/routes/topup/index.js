const router = require("express").Router(); 
const {
   chargeCard,
   chargeCardOTP,
   chargeCardPIN
} = require("../../controllers/topup/index")  

router.post("/initiate", chargeCard)
router.post("/pinAuth", chargeCardPIN)
router.post("/otpAuth", chargeCardOTP)

module.exports = router 