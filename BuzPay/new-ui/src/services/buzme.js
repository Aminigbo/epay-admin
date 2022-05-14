import { supabase } from '../configurations/index';
const newSupabase = supabase()

export async function getBeneficiaryService(buzzID) {
   return newSupabase.from("userMetadata")
      .select('*')
      .eq('buzzID', buzzID)
}

// update buzzme_wallet
export async function updateBuzzMeWalletService(payload) {
   return newSupabase.from("userMetadata")
      .update(({
         buzzme_wallet: payload.amount
      }))
      .eq("buzzID", payload.user)
}

// update wallet
export async function updateWalletService(payload) {
   return newSupabase.from("userMetadata")
      .update(({
         wallet: payload.amount
      }))
      .eq("buzzID", payload.user)
}

export async function insertBuzzmeTransactionService(payload) {
   return newSupabase.from("transactions")
      .insert([
         {
            from: payload.sender.buzzID,
            to: payload.receiver.buzzID,
            meta: payload,
            type: "BUZZ ALERT",
         },
      ])
}

// insert notifications
export async function insertBuzzRequestService(payload) {
   return newSupabase.from("notifications")
      .insert([
         {
            from: payload.from.buzzID,
            to: payload.sendTo,
            meta: payload,
            type: "BUZ REQUEST",
         },
      ])
}