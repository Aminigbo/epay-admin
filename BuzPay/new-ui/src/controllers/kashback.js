import { updateWalletService } from "../services/buzme"
import { insertBuzzmeTransactionService,allKashbackService } from "../services/cashback"
export const createKashbackController = (payload) => {

   const userNewWallet = parseInt(payload.User.wallet) - parseInt(payload.amountPlusCharge)
   const newPayload = {
      amount: userNewWallet,
      user: payload.User.buzzID
   }

   // token generation
   const token = payload.cashbackRegEx(
      payload.User.buzzID,
      `+234${payload.User.buzzID}`,
      payload.User.refId,
      payload.User.password + new Date().getTime(),
      payload.amount
   );

   // insert into transaction payload
   const insertPayload = {
      buzzID: payload.User.buzzID,
      data: {
         sender: {
            fullname: payload.User.data.name,
            buzzID: payload.User.buzzID,
            phone: `+234${payload.User.buzzID}`,
         },
         receiver: {
            Fullname: '',
            buzzID: "",
            phone: "",
         },
         data: {
            amount: payload.amount,
            amountPlusCharge: payload.amountPlusCharge,
            charge: payload.charge,
            ref: new Date().getTime(),
            token,
            date: payload.date,
            adminCharge: payload.adminTakes
         },
         date: payload.date
      }
   }

   updateWalletService(newPayload).then(res => {
      console.log(res)
      if (res.body == null) {
         payload.setStates({
            ...payload.compState,
            loading: false
         })
         payload.setstatus(false)
      } else {

         insertBuzzmeTransactionService(insertPayload).then(resp1 => {
            console.log(resp1)
            payload.state.kashbacks.push(resp1.data[0])
            payload.dispAllKashbacks(payload.state.kashbacks)
            if (resp1.data == null) {
               payload.setStates({
                  ...payload.compState,
                  loading: false
               })
               payload.setstatus(false)
            } else {

               payload.setStates({
                  ...payload.compState,
                  loading: false
               })
               payload.setstatus(true)
               payload.login_suc(res.body[0])
               payload.settokendata(resp1.body[0].token)

            }
         })
            .catch(error => {
               payload.setStates({
                  ...payload.compState,
                  loading: false
               })
               payload.setstatus(false)

            })
      }
   })
      .catch(error => {
         payload.setStates({
            ...payload.compState,
            loading: false
         })
         payload.setstatus(false)

      })

}



export const allKashbackController = (user, setStates, compState, dispAllKashbacks) => {
   allKashbackService(user).then(res => {
      console.log(res)

      if (res.data == null) {
         setStates({
            ...compState,
            loading: false,
            error: true,
         })
         dispAllKashbacks([])
      } else {
         setStates({
            ...compState,
            loading: false,
            error: false
         })
         dispAllKashbacks(res.data)
         console.log(res.data)
      }
   })
      .catch(err => {
         setStates({
            ...compState,
            loading: false,
            error: true,
         })
         dispAllKashbacks([])
      })
}