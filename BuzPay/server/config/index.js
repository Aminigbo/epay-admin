require("dotenv").config();
let { createClient } = require('@supabase/supabase-js')
let supabase = createClient(process.env.supabaseUrl, process.env.supabaseKey)
module.exports = {
    supabase,
    port:process.env.PORT,
    secret: process.env.SECRET,  
    OTP_key: process.env.OTPAPIKEY,
    OTP_username:process.env.OTPAPIUSERNAME,
}