import md5 from "md5";
import {
   validateEmail,
   validatePhoneNumber,
   generateOTP
} from "../Utilities/index"
import { signinService, signupService, checkPhone, upadeuserMetadataService, DBgetUser, userSessionService, fetchUsers } from "../services/auth"
import { send_otp, sendEmailOtp } from "../services/apiservice"


import { allKashbackController } from "./kashback"
import { allTransactionsController } from "./transactions"
// signup controller
export async function signupController(payload) {

   let otpPhone = `+234${payload.phone.substring(0, 11)}`;
   const otp = generateOTP(10000, 99999);
   if (
      !payload.name ||
      payload.email.length < 5 ||
      payload.phone.length < 10 ||
      payload.password.length < 5
   ) {
      payload.setStates({
         ...payload.compState,
         error: true,
         loading: false,
         msg: "Fill all forms",
      });
   } else if (payload.name.length < 5) {
      payload.setStates({
         ...payload.compState,
         error: true,
         loading: false,
         msg: "Provide your full name",
      });
   } else if (validateEmail(payload.email) === false || payload.email.length < 6) {
      payload.setStates({
         ...payload.compState,
         error: true,
         loading: false,
         msg: "Invalid email",
      });
   } else if (validatePhoneNumber(payload.phone) === false || payload.phone.length != 10) {
      payload.setStates({
         ...payload.compState,
         error: true,
         loading: false,
         msg: "Invalid phone",
      });
   } else {
      payload.setStates({
         ...payload.compState,
         error: false,
         loading: true,
      });

      // create unique ref ID
      const createRefCode = () => {
         let first = payload.name.substring(0, 2) + payload.phone[10]
         let second = payload.phone.substring(4, 6);
         let third = payload.name.substring(3, 5) + payload.phone[5];
         let combined = first + "-" + second + '-' + third
         return combined.toUpperCase()
      }

      let curvedBenId = payload.phone.substring(0, 11)  // beneficiary id gotten from phone number
      const new_pwd = md5(payload.password + payload.email);

      let meta = {
         name: payload.name,
         password: new_pwd,
         rawPwd: payload.password,
         wallet: 2000,
         buzzmewallet: 0,
         transactionPin: "0000",
         buzzID: curvedBenId,
         role: 0,
         schoolmode: false,
         DOB: null,
         gender: null,
         nickname: null,
         school: null,
         badge: "Young LAD",
         avater: null,
         otp: otp,
         isActive: false,
         verified: false,
         isVendor: false,
         buzzcoin: 0,
         refId: createRefCode(),
         referedB: payload.ref
      }

      // data for user metadata table in the db
      let metaData = {
         buzzID: curvedBenId,
         refId: createRefCode(),
         referedB: payload.ref,
         name: payload.name,
         phone: payload.phone,
         wallet: 2000,
      }

      let newPayload = {
         meta,
         email: payload.email,
         password: new_pwd
      }

      checkPhone(payload.phone).then(response => {
         console.log(response)
         if (response.data.length < 1) {

            signupService(newPayload).then(res => {
               if (res.data == null) {
                  payload.setStates({
                     ...payload.compState,
                     error: true,
                     loading: false,
                     msg: "Email already taken",
                  });
               } else {
                  upadeuserMetadataService(metaData).then(responseX => {
                     send_otp({ phone: otpPhone }).then((resX) => {
                        sendEmailOtp(payload.email, payload.name, otp)
                        // payload.login_suc()
                        payload.setregistered(true)
                        payload.setStates({
                           ...payload.compState,
                           loading: false,
                        });
                     })
                  }).catch(err => {
                     payload.setStates({
                        ...payload.compState,
                        error: true,
                        loading: false,
                        msg: "A network error occuredsss",
                     });
                  })

               }
            }).catch(error => {
               payload.setStates({
                  ...payload.compState,
                  error: true,
                  loading: false,
                  msg: "A network error occured",
               });
            })
         } else {
            payload.setStates({
               ...payload.compState,
               error: true,
               loading: false,
               msg: "Phone number already taken",
            });
         }
      })
         .catch(error => {
            console.log(error)
            payload.setStates({
               ...payload.compState,
               error: true,
               loading: false,
               msg: "A network error occured",
            });
         })

   }
}

export async function signinController(payload) {
   payload.setStates({ ...payload.compState, loading: true, error: false, success: false });
   if (!payload.email || !payload.password) {
      payload.setStates({
         ...payload.compState,
         error: true,
         loading: false,
         msg: "Please you have to fill out all forms",
      });
   } else {
      if (validateEmail(payload.email) == false) {
         payload.setStates({
            ...payload.compState,
            error: true,
            loading: false,
            msg: "Provide a valid email   ",
         });
      } else {
         const new_pwd = md5(payload.password + payload.email);

         // construct login payload
         let loginPayload = {
            email: payload.email,
            password: new_pwd
         }
         // call login service
         signinService(loginPayload).then(res => {
            console.log(res.error)
            if (res.data == null && res.session == null) {
               payload.setStates({
                  ...payload.compState,
                  error: true,
                  loading: false,
                  msg: "Internet connection failed",
               });
            } else {
               console.log(res)
               fetchUsers(res.user.user_metadata.buzzID).then(response => {
                  if (response.data !== null) {
                     payload.setStates({
                        ...payload.compState,
                        error: false,
                        loading: false,
                     });
                     console.log(response)
                     payload.login_suc(response.data[0])

                     // null function
                     let Nul = () => {

                     }

                     allKashbackController(response.data[0].buzzID, Nul, null, payload.dispAllKashbacks)
                     allTransactionsController(response.data[0].buzzID, Nul, null, payload.disp_transactions)
                  } else {
                     payload.setStates({
                        ...payload.compState,
                        error: true,
                        loading: false,
                        msg: "Internet connection failed",
                     });
                  }
               })
                  .catch(err => {
                     payload.setStates({
                        ...payload.compState,
                        error: true,
                        loading: false,
                        msg: "Internet connection failed",
                     });
                  })


            }
         })
            .catch(err => {
               console.log(err)
               payload.setStates({
                  ...payload.compState,
                  error: true,
                  loading: false,
                  msg: "A network error occured, make sure you are connected to the internet.",
               });
            })
      }
   }

}

export async function resetpwdController(payload) {
   const userData = userSessionService();  // get user session from memory 
   console.log(userData.user.user_metadata)
   DBgetUser(userData.access_token).then(res => {
      if (res.error !== null) {

         // let otpPhone = `+234${payload.phone.substring(1, 11)}`;
         // send_otp({ phone: otpPhone }).then((resX) => {
         //    sendEmailOtp(payload.email, payload.name, otp)
         //    // payload.login_suc()
         //    payload.setregistered(true)
         //    payload.setStates({
         //       ...payload.compState,
         //       loading: false,
         //    });
         // })
      }
   })

}


export async function reAuthControler(payload) {
   console.log("started")
   payload.setPin("")
   fetchUsers(payload.user).then(response => {
      payload.setStates({
         ...payload.compState,
         error: false,
         loading: false,
      });
      console.log(response)
      payload.log_In(response.data[0])

      // null function
      let Nul = () => {

      }

      allKashbackController(payload.user, Nul, null, payload.dispAllKashbacks)
      allTransactionsController(payload.user, Nul, null, payload.disp_transactions)
   })
      .catch(err => {
         payload.setStates({
            ...payload.compState,
            error: true,
            loading: false,
            msg: "Internet connection failed",
         });
      })
}