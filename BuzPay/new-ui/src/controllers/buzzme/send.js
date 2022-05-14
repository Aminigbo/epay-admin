import { userSessionService, updateuserService } from "../../services/auth"
import { getAllUsersMetadaService } from "../../services/users"

import {
   send_buzz_alert,
   buzz_request,
} from "../../services/apiservice"
// import * from buzz me services
import { getBeneficiaryService, updateBuzzMeWalletService, updateWalletService, insertBuzzmeTransactionService } from "../../services/buzme"
let userSession = userSessionService()


//  verify Buzz id and proceed
export const verifyBeneficiaryController = (payload) => {
   let {
      beneficiary,
      setverifyError,
      setStates, compState,
      setBeneficiaryData
   } = payload;

   // check if user is logged in
   if (userSession === null) return false

   // declear user data
   const User = userSession.user.user_metadata

   // check if beneficiary id length ==10
   if (beneficiary.length != 10) return setverifyError("Invalide ID")

   // prevent users from buzzing themselves
   if (beneficiary == User.buzzID) return setverifyError("Can't buzz yourself");

   setStates({ ...compState, loading: true });
   setverifyError("");
   getBeneficiaryService(beneficiary).then(response => {
      setStates({ ...compState, loading: false });
      if (response.error == null && response.data.length > 0) {
         setverifyError("");
         const storeBeneficiaryData = response.data[0]
         setBeneficiaryData({
            name: storeBeneficiaryData.data.name,
            buzzID: storeBeneficiaryData.buzzID
         })
         payload.setStage("SENDBUZZ-2")
         console.log(response)
      } else if (response.data == null) return setverifyError(response.error.message)
      else return setverifyError("A network error occured")
   })
      .catch(error => {
         setStates({ ...compState, loading: false });
      })
}

// initiate payment
export const initiateBuzzmeController = (payload) => {
   let amount = parseInt(payload.amount)
   payload.setStage(null)
   payload.setStates({ ...payload.compState, loading: true });
   getAllUsersMetadaService().then(res => {
      if (res.error == null && res.body.length > 0) {

         // get marchant wallet address
         let marchantWalletBalance = res.data.filter(e => e.buzzID == payload.beneficiaryData.buzzID)[0]
         let marchantNewBuzzmeWallat = parseInt(payload.amount) + parseInt(marchantWalletBalance.buzzme_wallet)

         // wallet update payload for Marchant
         let wallt_update_payload_for_marchants = {
            amount: marchantNewBuzzmeWallat,
            user: payload.beneficiaryData.buzzID
         }
         // console.log(marchantNewBuzzmeWallat)



         // get user's wallet balance
         let userWalletBalance = res.data.filter(e => e.buzzID == payload.User.buzzID)[0]
         let userBuzzmeWallaet = parseInt(userWalletBalance.wallet) - parseInt(payload.amount)

         // wallet update payload for User
         let wallt_update_payload_for_user = {
            amount: userBuzzmeWallaet,
            user: payload.User.buzzID
         }
         // console.log(userBuzzmeWallaet)


         // create payload to save in the transaction history
         let transactionPayload = {
            sender: {
               fullname: payload.User.name,
               buzzID: payload.User.buzzID,
               phone: `+234${payload.User.buzzID}`,
            },
            receiver: {
               Fullname: payload.beneficiaryData.name,
               buzzID: payload.beneficiaryData.buzzID,
               phone: `+234${payload.beneficiaryData.buzzID}`,
            },
            data: {
               amount,
               desc: payload.desc,
                ref:new Date().getTime()
            },
            date: payload.date,
            type:"BUZZ ALERT"
         };


         // deduct from who is sending
         updateWalletService(wallt_update_payload_for_user).then(response1 => {
            console.log("giver")
            console.log(response1)
            payload.login_suc(response1.data[0])
            // add to who is receiving
            updateBuzzMeWalletService(wallt_update_payload_for_marchants).then(response => {
               console.log(response)

               let smsPayload = {
                  phone: [
                     `+234${payload.beneficiaryData.buzzID}`,
                  ],
                  sender: userWalletBalance,
                  amount: amount,
                  desc: payload.desc,
                  balance: marchantNewBuzzmeWallat,
               }; 
               // send_buzz_alert(smsPayload)
               // insert to tansaction
               insertBuzzmeTransactionService(transactionPayload).then(responseX => {
                  console.log(responseX)
                  payload.setPin("")
                  payload.setStage("SENDBUZZ-SUCCESS")
                  payload.setStates({ ...payload.compState, loading: false });
               })
                  .catch(error1 => {
                     console.log(error1)
                     payload.setPin("")

                     payload.setStage("SENDBUZZ-ERROR")
                     payload.setStates({ ...payload.compState, loading: false });
                  })
            })
               .catch(error2 => {
                  payload.setPin("")
                  console.log(error2)
                  payload.setStage("SENDBUZZ-ERROR")
                  payload.setStates({ ...payload.compState, loading: false });
               })
         })
            .catch(error3 => {
               payload.setPin("")
               console.log(error3)
               payload.setStage("SENDBUZZ-ERROR")
               payload.setStates({ ...payload.compState, loading: false });
            })




      }
      console.log(res)
   }).catch(error4 => {
      payload.setPin("")
      console.log(error4)
      payload.setStage("SENDBUZZ-ERROR")
      payload.setStates({ ...payload.compState, loading: false });
   })


   // updateBuzzMeWalletService()
}