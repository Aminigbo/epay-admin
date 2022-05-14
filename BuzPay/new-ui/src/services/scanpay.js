import { supabase } from '../configurations/index';
const newSupabase = supabase()


export async function verifytokenService(payload) {
   return newSupabase.from("kashback_token")
      .select('*')
      .eq("token", payload)
}

export async function insertBuzzmeTransactionService(payload) {
   return newSupabase.from("transactions")
      .insert([
         {
            from: payload.sender,
            to: payload.to,
            meta: payload.meta,
            type: "Kashback",
         },
      ])
}

// deactivate token 
export async function deactivateToken(payload) {
   return newSupabase.from("kashback_token")
      .update({
      active:false
   })
   .eq("token", payload)
}


// insert notifications
export async function insertBuzzRequestService(payload) {
   return newSupabase.from("notifications")
      .insert([
         {
            from: payload.from,
            to: payload.to,
            meta: payload,
            type: "Kashback",
         },
      ])
}