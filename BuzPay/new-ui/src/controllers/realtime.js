import { supabase } from '../configurations/index';
import { getUserController } from "../services/auth"
import mp3 from "../statics/audio/Doorbell.mp3";
const newSupabase = supabase()
var audio = new Audio(mp3);
const User = getUserController()


export const transactionListener = (realtime, user, notify) => {
   newSupabase.from(`transactions`)
      .on("*", (payload) => {
         const response = payload.new;
         // console.log(response);
         // console.log(User)
         if (response.type == "BUZZ ALERT") {
            if (response.to == User.user_metadata.buzzID) {
               // alert(User.user_metadata.buzzID+"--"+response.to)
               realtime([{ response }])
               audio.play()
            }
         }
         // else if (response.type == "SCANPAY") {
         //     if (response.from == User.user_metadata.buzzID) {
         //       // alert(User.user_metadata.buzzID+"--"+response.to)
         //       realtime([{ response }])
         //       audio.play()
         //    }
         // }
      })
      .subscribe();

   newSupabase.from(`notifications`)
      .on("INSERT", (payload) => {
         const response = payload.new;
         console.log(response);
         console.log(user)
         if (response.type == "SCANPAY") {
            if (response.to == User.user_metadata.buzzID) {
               notify(true)
               audio.play()
            }
         } else {
            const check = response.to.filter(e => e.value == User.user_metadata.buzzID)
            console.log(check)
            if (check.length > 0) {
               notify(true)
               audio.play()
            }
         }
      })
      .subscribe();
}

