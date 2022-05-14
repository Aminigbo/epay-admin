import { supabase } from '../configurations/index';
const newSupabase = supabase()


export async function insertNotificationService(payload) {
   return newSupabase.from("notifications")
      .insert([
         {
            from: payload.sender,
            to:payload.receiver,
            meta: payload.data,
            type: "BUZZ ALERT",
         },
      ])
}