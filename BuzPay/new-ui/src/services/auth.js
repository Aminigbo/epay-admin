import { supabase } from '../configurations/index';
const newSupabase = supabase()

export let signinService = (payload) => {
   return newSupabase.auth
      .signIn({
         email: payload.email,
         password: payload.password,
      })
}

export let signupService = (payload) => {
   return newSupabase.auth.signUp(
      {
         email: payload.email,
         password: payload.password,
      },
      {
         data: payload.meta
      }
   )
}

export var upadeuserMetadataService = (payload) => {
   return newSupabase.from("userMetadata")
      .insert([
         {
            buzzID: payload.buzzID,
            data: payload,
            phone: payload.phone,
            wallet: payload.wallet,
            buzzme_wallet:0
         },
      ]);
}

export var updateuserService = (data) => {
   return newSupabase.auth.update(
      { data: data }
   )
}
export let checkPhone = (phone) => {
   return newSupabase.from("userMetadata").select("phone").eq('phone', phone)
}

// get user object from memory
export var getUserController = () => {
   return newSupabase.auth.user()
}


//  get user session from storage
export var userSessionService = () => {
   return newSupabase.auth.session()
}

// get user object from database
export var DBgetUser = (ACCESS_TOKEN_JWT) => {
   return newSupabase.auth.api.getUser(
     ACCESS_TOKEN_JWT,
   )
} 

export var logoutService = () => {
    return newSupabase.auth.signOut()
}

// @======== GET USERS 
export async function fetchUsers(userId) {
  return newSupabase.from("userMetadata").select("*").eq("buzzID", userId);
  // .contains("meta", { school: payload });
}