const { supabase } = require("../../config/index");

async function searchVendor(payload) { 
  return supabase
    .from("userMetadata")
    .select("*")
    .eq("buzzID", payload)
    .then((res) => {
      return (res);
      
    })
    .catch((err) => {
      return {
        err,
      };
    });
}

module.exports = {
  searchVendor,
};
