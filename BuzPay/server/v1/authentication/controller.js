const md5 = require("md5")
let { validateEmail, validatePhoneNumber, isNum, validate__pwd, generateOTP, RefCode, sendOTP } = require("./utilities")
let { phoneTaken, signInUser, updateUserMetadata, LoginUser, getMetadata, resetPwd } = require("./model")

//  require SMS service
let { smsService } = require("../services/sms_service")

// email otp service
let { otpEmail } = require("../services/email_service/otp_email")
// OTP
const OTP = generateOTP(10000, 99999);


const error = (res, msg) => {
   res.send({
      success: false,
      message: msg,
   })
}

const success = (res, data) => {
   res.send({
      success: true,
      data: {
         ...data
      }
   })
}


function SendOTP(phone, message) {
   let otpPhone = "";


   if (phone.length == 11) {
      otpPhone = `+234${phone.substring(1, 11)}`;
   }
   else if (phone.length == 10) {
      otpPhone = `+234${phone.substring(0, 10)}`;
   }
   smsService(otpPhone, message)
      .then((response) => {
         return true;
      })
      .catch((error) => {
         return false;
      });
}


// ===================================================================
// ===================================================================
// ===================================================================
// ===================================================================
//======  sign in function
// ===================================================================
// ===================================================================
// ===================================================================

const signin = (req, res) => {
   const { email, password } = req.body;
   // check email format
   if (validateEmail(email) == false) {
      error(res, "Invalid email format")
   } else {
      // salt the password
      const saltedPWD = md5(password + email);
      // construct login payload
      let loginPayload = {
         email: email,
         password: saltedPWD,
      }

      return LoginUser(loginPayload).then(response => {
         console.log(response)
         if (response.data == null && res.session == null) {
            error(res, response.msg)
         } else {
            getMetadata(email).then(result2 => {
               success(res, {
                  user: result2.data
               })
            })
         }
      })
   }
}




// ===================================================================
// ===================================================================
// ===================================================================
//=========  sign in function
// ===================================================================
// ===================================================================
// ===================================================================

const signup = (req, res) => {
   const { fullname, email, phone, referrer, password } = req.body

   // beneficiary ID
   const returnBeneficaryId = () => {
      if (phone.length == 11) {
         return phone.substring(1, 11)
      }
      else if (phone.length == 10) {
         return phone.substring(0, 10)
      } else {
         return false
      }
   }

   // check email format
   if (validateEmail(email) == false) {
      error(res, "Invalid email format")
   }
   //  check phone number format
   else if (validatePhoneNumber(phone) == false) {
      error(res, "Invalid phone number")
   }
   // valid user password
   else if (validate__pwd(password) == false) {
      error(res, "Choose a strong password")
   }
   // all conditions met
   else {
      // create beneficiary ID from phone number
      const beneficiaryId = returnBeneficaryId()

      // salt the password
      const saltedPWD = md5(password + email);

      // create signIN meta data
      let meta = {
         name: fullname,
         password: saltedPWD,
         rawPwd: password,
         wallet: 2000,
         buzzmewallet: 0,
         transactionPin: "0000",
         buzzID: beneficiaryId,
         role: 0,
         schoolmode: false,
         DOB: null,
         gender: null,
         nickname: null,
         school: null,
         badge: "Young LAD",
         avater: null,
         otp: OTP,
         isActive: false,
         verified: false,
         isVendor: false,
         buzzcoin: 0,
         refId: RefCode(req.body),
         referedB: referrer
      }

      // data for user metadata table in the db
      let metaData = {
         buzzID: beneficiaryId,
         refId: RefCode(req.body),
         referedB: referrer,
         name: fullname,
         phone: phone,
         wallet: 2000,
         email: email
      }

      // signup payload
      let signUpPayload = {
         meta,
         email: email,
         password: saltedPWD
      }

      // query the usermetadata table to check if the phone is already registered 

      return phoneTaken(phone).then(result => {
         if (result.status == true) {
            error(res, "Phone number already exists")
         } else {
            signInUser(signUpPayload).then(signupResult => {
               if (signupResult.success == false) {
                  error(res, signupResult.message)
               } else {
                  updateUserMetadata(metaData).then(updateMetaRes => {

                     if (updateMetaRes.success == true) {
                        const message = `<#> Please use ${OTP} as your Buzpay registration code.  Do not share this OTP with anyone`; // message to be sent
                        // SendOTP(phone, message);
                        otpEmail({
                           email: email,
                           otp: OTP,
                           name: fullname,
                        })
                        success(res, {
                           user: signupResult,
                           otp: OTP
                        })
                     } else {
                        error(res, updateMetaRes.msg)
                     }
                  })
               }
            })
         }
      })

   }
}




// ===================================================================
// ===================================================================
// ===================================================================
//=========  reset password
// ===================================================================
// ===================================================================
// ===================================================================

// confirm email and send otp
const confirmEmail = (req, res) => {
   const { email } = req.body;

   // validate email
   if (validateEmail(email) == false) {
      error(res, "Invalid email format")
   } else {

      // check if user exists
      getMetadata(email).then(response => {
         if (response.status == true) {

            const message = `<#> Please use ${OTP} as your Buzpay reset password code.  Do not share this OTP with anyone`; // message to be sent
            // SendOTP( response.data.data.phone, message);
            otpEmail({
               email: email,
               otp: OTP,
               name: response.data.data.name,
            })
            success(res, {
               success: true,
               otp: OTP
            })
         } else {
            error(res, "Uner not found")
         }
      })
   }

}

//  reset password
const reset_password = (req, res) => {
   let { password1, password2, email } = req.body
   // salt the password
   const saltedPWD = md5(password1 + email);

   let payload = {
      email: email,
      password: saltedPWD
   }


   // valid user password
   if (validate__pwd(password1, password2) == false) {
      error(res, "Choose a strong password")
   } else {
      return resetPwd(payload).then(response => {
         if (response.success == true) {
            success(res, response.data)
         } else {
            error(res, response.msg)
         }
      })
   }
}




module.exports = {
   signin,
   signup,
   confirmEmail,  // confirm user email and send otp for pwd reset
   reset_password

}