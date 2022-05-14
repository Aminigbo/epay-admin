import { allTransactionsService, moveBuzzBalanceService } from "../services/transactions"
import { getUserMetadata } from "../services/users"
export const allTransactionsController = (user, setStates, compState, disp_transactions) => {
   allTransactionsService(user).then(res => {
      console.log(res)

      if (res.data == null) {
         setStates({
            ...compState,
            loading: false,
            error: true,
         })
         disp_transactions([])
      } else {
         setStates({
            ...compState,
            loading: false,
            error: false
         })
         disp_transactions(res.data)
      }
   })
      .catch(err => {
         setStates({
            ...compState,
            loading: false,
            error: true,
         })
         disp_transactions([])
      })
}


export const moveBuzzBalanceController = (payload, login_suc, setStates, compState) => {
   setStates({
      ...compState,
      loading: true
   })

   getUserMetadata(payload.user).then(resp => {
      if (resp.data !== null && resp.data.length !== 0) {

         let newWallet = parseInt(resp.data[0].buzzme_wallet) + parseInt(resp.data[0].wallet)
         let newPayload = {
            wallet: newWallet,
            buzzme_wallet: 0,
            user: payload.user
         }
         moveBuzzBalanceService(newPayload).then(res => {
            login_suc(res.body[0])
            setStates({
               ...compState,
               loading: false
            })
         })
            .catch(error => {
               setStates({
                  ...compState,
                  loading: false
               })
            })
      }
   })
}
