const router = require("express").Router(); 
const { 
   vendorApplyController,
   verifyBank,
   bankList,
   submitApplication
} = require("../../controllers/vendors/index")  
const {upload} = require("../../utilities/upload")

router.post("/apply", vendorApplyController) 
router.post("/verify-bank", verifyBank) 
router.get("/banks", bankList) 
router.post("/submit", upload.single("vendorID"), submitApplication)



module.exports = router 