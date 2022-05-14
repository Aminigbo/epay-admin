import {
   send_buzz_alert,
   buzz_request,
} from "../../services/apiservice"

import { insertBuzzRequestService } from "../../services/buzme"


export const initializeBuzzRequesrController = (payload) => {
   payload.setStage(null)
   payload.setStates({ ...payload.compState, loading: true });
   console.log(payload)

   insertBuzzRequestService(payload).then(suc => {


      let sendToPhones = [];
      for (let i = 0; i < payload.sendTo.length; i++) {
         sendToPhones.push(`+234${payload.sendTo[i].phone.substring(1, 11)}`);
      }
      let smsPayload = {
         phones: sendToPhones, // array[]
         sender: payload.from.name,
         amount: parseInt(payload.amount),
         desc: payload.reason,
          ref:new Date().getTime()
      };

      console.log(suc)
      payload.setPin("")
      payload.setStage("REQUEST-SUCCESS")
      payload.setStates({ ...payload.compState, loading: false });


   })
      .catch(error => {
         payload.setStage("SENDBUZZ-ERROR")
         payload.setPin("")

         payload.setStates({ ...payload.compState, loading: false });
      })
}