import { verifytokenService, insertBuzzmeTransactionService, deactivateToken,insertBuzzRequestService } from "../../services/scanpay"
import { getBeneficiaryService, updateWalletService, } from "../../services/buzme"
export const verifyTokenValidity = (payload) => {
   console.log("going.....")
   verifytokenService(payload.token).then(res => {

      if (res.data !== null) {
         if (res.body[0].active == true) {
            payload.disp_scannedData(res.body[0])
            payload.history.push("/scan-success")
            // payload.setStates({
            //    ...payload.compState,
            //    loading: false,
            //    tokenData: res.body[0],
            //    tokenActive: true,
            //    error: false
            // })
            // payload.setDrawerState({ ...payload.drawerState, bottom: true });
         } else {
            payload.setStates({
               ...payload.compState,
               loading: false,
               tokenData: {},
               tokenActive: false,
               error: true,
               errorMsg: "The Kashback code has been used by another user"
            })
            payload.setDrawerState({ ...payload.drawerState, bottom: true });
         }
      } else {
         payload.setStates({
            ...payload.compState,
            loading: false,
            tokenData: {},
            tokenActive: false,
            error: true,
            errorMsg: "Invalide kashback code"
         })
         payload.setDrawerState({ ...payload.drawerState, bottom: true });
      }
   })
      .catch(error => {
         payload.setStates({
            ...payload.compState,
            loading: false,
            tokenData: {},
            tokenActive: false,
            error: true,
            errorMsg: "A network error occured"
         })
         payload.setDrawerState({ ...payload.drawerState, bottom: true });
      })

}

export const resolveKashbackController = (payload) => {
   console.log(payload)
   payload.setStates({
      ...payload.compState,
      loading: true
   })

   // check if caskback is still valid
   getBeneficiaryService(payload.user.buzzID).then(res => {
      console.log(res)
      payload.login_suc(res.body[0])
      // what vendor takes
      const whtVendorTakes = payload.data.data.data.amountPlusCharge - payload.data.data.data.adminCharge

      // user current wallet 
      let userCurrentWallet = res.data[0].wallet

      // receiver's new wallet 
      const receiverNewWallet = parseInt(whtVendorTakes) + parseInt(userCurrentWallet)

      // update receiver's wallet
      const updatepayload = {
         amount: receiverNewWallet,
         user: payload.user.buzzID
      }
      updateWalletService(updatepayload).then(response => {


         // update to transaction
         const transactionPayload = {
            sender: payload.data.data.sender.buzzID,
            to: payload.user.buzzID,
            meta: payload.data.data,
            type: "SCANPAY"
         }

         insertBuzzmeTransactionService(transactionPayload).then(resX => {


            // insert to notification
            const notificationPayload = {
               from: payload.user.buzzID,
               to: payload.data.data.sender.buzzID,
               meta: payload.data.data,
               type: "SCANPAY"
            }
            insertBuzzRequestService(notificationPayload)

            // deactivate token
            deactivateToken(payload.data.token).then(resDea => {
               console.log(resDea)
               payload.setresolved(true)
               payload.setStates({
                  ...payload.compState,
                  loading: false
               })
            })
               .catch(error => {
                  payload.setStates({
                     ...payload.compState,
                     loading: false
                  })
               })
         }).catch(error => {
            payload.setStates({
               ...payload.compState,
               loading: false
            })
         })
      }).catch(error => {
         payload.setStates({
            ...payload.compState,
            loading: false
         })
      })


   })
      .catch(error => {
         payload.setStates({
            ...payload.compState,
            loading: false
         })
      })
}