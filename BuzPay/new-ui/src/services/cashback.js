
import { supabase } from '../configurations/index';
const newSupabase = supabase()




export async function insertBuzzmeTransactionService(payload) {
   return newSupabase.from("kashback_token")
      .insert([
         {
            
            token: payload.data.data.token,
            data: payload.data,
            active: true,
            user:payload.data.sender.buzzID
         },
      ])
}


export const allKashbackService = (userBuzzID) => {
   return newSupabase.from("kashback_token")
      .select("*")
      .eq("user",userBuzzID)
   .order('id', { ascending: false })
}




// export async function insertBuzzmeTransactionService(payload) {
//    return newSupabase.from("transactions")
//       .insert([
//          {
//             from: payload.buzzID,
//             to: null,
//             meta: payload.data,
//             type: "KASHBACK",
//          },
//       ])
// }