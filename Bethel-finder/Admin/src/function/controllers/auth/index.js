import { supabase } from "../../config/index" 
import md5 from "md5"
import {isNum, validate__pwd, isEmail, success, error} from "../../utils/index"



//  registration function
export async function signUp(payload) {
   if (!payload || !payload.name || !payload.phone || !payload.email || !payload.password || !payload.confirm_password) {
      return error("missing payload")
   }

   //  validate phone
   if (isNum(payload.phone) == false) {
      return error("Invalid phone number")
   }

   //  validate email
   if (isEmail(payload.email) == false) {
      return error("Invalid email address")
   }

   // validate password
   if (validate__pwd(payload.password, payload.confirm_password) == false) {
      // return error({
      //    message: "mismatched password",
      //    Hint:"Passwords must be the same and must contain at least one integer"
      // })
      return error("mismatched password, Hint: Passwords must be the same and must contain at least one integer")
   }

   // encrypt password
   let encryptedPassword = md5(payload.password).toString()
   let password = payload.password
   let email = payload.email
   let signUp_public =  ''

   await supabase.from("users").select("*").eq("email", payload.email).then(check => { 
      if (check.body.length > 0) { 
         return signUp_public = error("User already exists")
      } else {
         supabase.auth.signUp({ email, password }) 
         return supabase.from("users").insert([{ name: payload.name, email: payload.email, meta: { ...payload, password: password, confirm_password: encryptedPassword } }]).then(inserted => {
            if (inserted.body.length > 0 && inserted.error == null) {
               let meta = {...inserted.body[0].meta, confirm_password:'**', password:"**", id:inserted.body[0].id}
               return signUp_public = success("User registered successfully", meta)
            }
         }) 
      } 
   })  
   return signUp_public
   
}






// login
export async function logIn(payload) {
   if (!payload || !payload.email || !payload.password) {
      return error("missing payload")
   }
   let signUp_public = ''
   let user = {}
   //  validate email
   if (isEmail(payload.email) == false) {
      return error("Invalid email address")
   } else {
      
      let { email, password } = payload 
      
     return await supabase.from("users").select("*").eq("email", email) 
   }  
}





export async function logout() {
   return await supabase.auth.signOut()
}