import { supabase } from '../configurations/index';
const newSupabase = supabase()

export async function getAllUsersMetadaService() {
   return newSupabase.from("userMetadata")
      .select('*') 
}


export async function getUserMetadata(buzzID) {
   return newSupabase.from("userMetadata")
      .select('*')
      .eq('buzzID', buzzID)
}


// @======== GET USERS 
export async function fetchUsers(userId) {
  return newSupabase.from("userMetadata").select("*").neq("buzzID", userId);
  // .contains("meta", { school: payload });
}