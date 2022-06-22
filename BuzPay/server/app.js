const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");  
const { success, error } = require("consola"); 
const passport = require("passport"); 


/**
 * @DESC Bring in the app constants and database connection
 */ 
const { supabase, port } = require("./config/");


/**
 * @DESC Initialize the application
 */
const app = express()


app.use(bodyParser.urlencoded({
  extended: true
}));


// for post requests
app.use(bodyParser.json()) 

// files
app.use(express.static("public"));


// Middlewares
// this middleware allows CORS (cross origin resource sharing)
// which means api can be shared between different servers running
// on different ports,
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");// this can be predictor.com
    res.setHeader("Access-Control-Allow-Method", "GET,POST,PUT,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})



/**
 * @DESC Route middleware
 */
// In-app
app.use("/api/v1", require("./v1/routes/")) 

// third party
app.use("/buzz-api/v1", require("./v1/third-party/routes/")) 

app.use("/", (req, res)=>{
    res.send("Pay with Buzz")
})



// declare port
let PORT = port || '2000'
if (supabase) {
    app.listen(PORT, ()=>{
        success({ 
            message: `Server started on PORT ${PORT}`,
            badge: true 
        })
    })
}