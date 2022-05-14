import { supabase } from '../configurations/index';
const newSupabase = supabase()


export const allTransactionsService = (userBuzzID) => {
   return newSupabase.from("transactions")
      .select("*")
      .or(`to.eq.${userBuzzID},from.eq.${userBuzzID}`)
   .order('id', { ascending: false })
}

export async function moveBuzzBalanceService(payload) {
   return newSupabase
      .from("userMetadata")
      .update({
         wallet: payload.wallet,
         buzzme_wallet: payload.buzzme_wallet
      })
   .eq("buzzID", payload.user)
}