const router = require("express").Router(); 
const {
  regOTP,
  sendBuzzAlert,
  generateCashbackAlert,
  resolvedCashback,
  giveawayBenefited,
   buzzRequest,
  giveCreated
} = require("../../controllers/notifications/sms/index") 

const { otpEmail } = require("../../controllers/notifications/email/index")

router.post("/send-otp", regOTP)
router.post("/send-buzz-alert", sendBuzzAlert)
router.post("/send-generate-cashback-alert", generateCashbackAlert)
router.post("/send-resolve-cashback-alert", resolvedCashback)
router.post("/send-giveaway-created-alert", giveCreated)
router.post("/send-giveaway-benefited-alert", giveawayBenefited)
router.post("/send-buzz-request-alert", buzzRequest)

router.post("/send-otp-email", otpEmail)
module.exports = router 