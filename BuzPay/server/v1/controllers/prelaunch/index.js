const { supabase } = require("../../../config/index");

async function prelaunch(req, res) {
   supabase
      .from("prelaunch")
      .select("email")
      .eq("email", req.body.email)
      .then((resp) => {
         if (resp.body.length < 1) {
            supabase
               .from("prelaunch")
               .insert([
                  {
                     email: req.body.email
                  }
               ])
               .then((resp) => {

                  res.send(resp)
               })
               .catch((err) => {
                  return {
                     err,
                  };
               });
         } else {
            res.send("Already")
         }

      })
      .catch((err) => {
         return {
            err,
         };
      });
}

module.exports = {
   prelaunch,
};
