const { supabase } = require("../../config/index");


// =====   check if phone number already exists
async function phoneTaken(payload) {
   return supabase
      .from("userMetadata")
      .select("phone")
      .eq("phone", payload)
      .then((res) => {
         if (res.data.length > 0) {
            return {
               status: true,
               msg: null,
               data: res
            };
         } else {
            return {
               status: false
            };
         }

      })
      .catch((err) => {
         return {
            status: true,
            msg: err
         };
      });
}


// !+============   signin user
async function signInUser(payload) {
   return supabase.auth
      .signUp(
         {
            email: payload.email,
            password: payload.password,
         },
         {
            data: payload.meta
         }
      )
      .then((res) => {
         if (res.error != null) {
            return {
               success: false,
               msg: res.error.message
            };
         } else {
            return {
               success: true,
               data: {
                  ...res.data
               }
            };
         }

      })
      .catch((err) => {
         return {
            success: false,
            msg: err
         };
      });
}


// !==========================  UPDATE USER METADATA
async function updateUserMetadata(payload) {
   return supabase
      .from("userMetadata")
      .insert([
         {
            buzzID: payload.buzzID,
            data: payload,
            phone: payload.phone,
            wallet: payload.wallet,
            coin_wallet: 0,
            email: payload.email
         },
      ])
      .then((res) => {
         if (res.data.length > 0) {
            return {
               success: true,
            };
         } else {
            return {
               success: false,
               msg: res

            };
         }

      })
      .catch((err) => {
         console.log(err)
         return {
            success: false,
            msg: err
         };
      });
}



// !+============   signin user
async function LoginUser(payload) {
   return supabase.auth
      .signIn(
         {
            email: payload.email,
            password: payload.password,
         }
      )
      .then((res) => {
         if (res.error != null) {
            return {
               success: false,
               msg: res.error.message
            };
         } else {
            return {
               success: true,
               data: {
                  ...res.data
               }
            };
         }

      })
      .catch((err) => {
         return {
            success: false,
            msg: err
         };
      });
}


// =====   Get user's metadata
async function getMetadata(payload) {
   return supabase
      .from("userMetadata")
      .select("*")
      .eq("email", payload)
      .then((res) => {
         if (res.data.length > 0) {
            return {
               status: true,
               msg: null,
               data: res
            };
         } else {
            return {
               status: false
            };
         }

      })
      .catch((err) => {
         return {
            status: true,
            msg: err
         };
      });
}



// =====   UPDATE PASSWORD
async function resetPwd(payload) {
   return supabase
      .auth.update(
         {
            email: payload.email,
            password: payload.password,
         }
      )
      .then((res) => {
         if (res.error != null) {
            return {
               success: false,
               msg: res.error.message
            };
         } else {
            return {
               success: true,
               data: {
                  ...res.data
               }
            };
         }

      })
      .catch((err) => {
         return {
            success: false,
            msg: err
         };
      });
}


module.exports = {
   phoneTaken,
   signInUser,
   updateUserMetadata,
   LoginUser,
   getMetadata,
   resetPwd
};
