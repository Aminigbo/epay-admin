const {supabase} = require("../../../config/index")
const sgMail = require('@sendgrid/mail')



async function createEvent(req, res) { 
   let event = req.file
   let payload = req.body
   let all_Tickets = JSON.parse(payload.allTickets)
   console.log(all_Tickets)
   let meta =  {
      host, desc, startDate, endDate, startTime, endTime, location, link, category, type
   } = req.body;

   let newMeta = {...meta, tickets:all_Tickets}

   supabase.from("event").insert([{
      event_title: payload.event_title, seller_id: payload.seller_id, seller_name:payload.seller_name,blob:'url', ticket_image: event.filename, meta:newMeta, date: new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear()
   }]).then(success => {
      res.send(success)
      console.log("email sent")
   }).catch(error => {
      res.send("error")
   })
}




async function email(req, res) {
   let payload = req.body
   console.log(payload)
   for (let i = 0; i < payload.tickets.length; i++) {
      console.log("sent")

      sgMail.setApiKey("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")
      const msg = {
      to: payload.tickets[i].buyer.email, // Change to your recipient
      // from: 'ogapredictor@gmail.com', // Change to your verified sender
      // to:"aminigbopaul@gmail.com",
      from: {
         name: "Reelwood Ticket Purchase",
         email:"ogapredictor@gmail.com"
      },
      subject: `${payload.tickets[i].ticket.category} ticket purchase for ${payload.tickets[i].meta.event_title}`,
      // text: 'and easy to do anywhere, even with Node.js',

      // html: `Your <b>${payload.tickets[i].ticket.category}</b>  ticket purchase for <b>${payload.tickets[i].meta.event_title}</b> was successfull
      //         Your ticket ID is <b> ${payload.tickets[i].ticketId}</b> `,

         html: `
         <!DOCTYPE html>
         <html lang="en">
         <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <title>Document</title>
            <style>
               @media only screen and (min-width: 800px) {
               * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                  outline: none;
               }
               body {
                  width: 100%;
                  height: auto;
                  display: flex;
                  justify-content: center; 
               }
               .email-container {
                  width: 35%; 
                  background-color: #f4f5f8;
                  height: auto;
                  padding-bottom: 30px;
                  height: 100vh;
                  /* margin-left: 32.5%; */
               }
               .navigation-bar {
                  padding: 5px 20px 5px 20px;
                  margin-bottom: 10px;
               }
               .landing-img {
                  width: 100%;
                  height: auto;
                  display: flex;
                  justify-content: center;
               }
               .img {
                  width: auto;
                  height: 200px;
               }
               .img-holder {
                  width: 100%;
                  height: auto;
                  padding: 0 20px;
                  display: flex;
                  flex-flow: row wrap;
                  justify-content: space-between;
                  margin: 30px 0;
               }
               .btn {
                  padding: 10px 30px;
                  border-radius: 100px;
                  border: none;
                  font-size: 19px;
                  background-color: #124ac3;
                  color: #fff;
               }
               .footer{
                     width: 100%; 
                     height: auto;
                     display: flex;
                     flex-flow: row wrap;
                     background: linear-gradient(to bottom right, black, #124ac3);
                     /* position:absolute; */
                     /* bottom: 0px;
                     left:32.5%; */
               }
               .logo-cont{
                     width:100%;
                     padding: 0 20px;
               }
               .first-column{
                     width: 30%;
                     margin-right: 5%;
                     padding: 0 20px;
                     font-family: sans-serif;
                     color:#fff
               }
               .second-column{
                     width: 30%;
                     padding: 0 20px;
                     font-family: sans-serif;
                     color:#fff
               }

               body{
                  margin-top:40px
               }

               .label{
                  height:10px;
                  background: linear-gradient(to bottom right, black, #124ac3);
                  margin-bottom:30px
               }
               }






               @media only screen and (max-width: 800px) {
                  body{
                     background-color: #f4f5f8;
                  }
               * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                  outline: none;
               }
               body {
                  width: 100%;
                  height: auto;
                  display: flex;
                  justify-content: center;
               }
               .email-container {
                  width: 100%;
                  max-width: 100%;
                  background-color: #f4f5f8;
                  height: auto;
                  padding-bottom: 30px;
               }
               .navigation-bar {
                  padding: 5px 10px 5px 10px;
                  margin-bottom: 10px;
               }
               .landing-img {
                  width: 100%;
                  height: auto;
                  display: flex;
                  justify-content: center;
               }
               .img {
                  width: auto;
                  height: 100px;
               }
               .img-holder {
                     width: 100%;
                  height: auto;
                  padding: 0 20px;
                  display: flex;
                  flex-flow: row wrap;
                  justify-content: center;
                  margin: 30px 0;
               }
               .btn {
                  padding: 10px 30px;
                  border-radius: 100px;
                  border: none;
                  font-size: 19px;
                  background-color: #124ac3;
                  color: #fff;
               }
               .footer{
                     width: 100%;
                     height: auto;
                     display: flex;
                     flex-flow: row wrap;
                     background: linear-gradient(to bottom right, black, #124ac3);
                     position:absolute;
                     bottom: 0px;
                     left:0px;
               }
               .logo-cont{
                     width:100%;
                     padding: 0 20px;
               }
               .first-column{
                     width: 100%;
                     margin-bottom: 20%;
                     padding: 0 20px;
                     font-family: sans-serif;
                     color:#fff
               }
               .second-column{
                     width: 100%;
                     padding: 0 20px;
                     font-family: sans-serif;
                     color:#fff
               }

               .label{
                  height:10px;
                  background: linear-gradient(to bottom right, black, #124ac3);
                  margin-bottom:30px
               }  
               }

               p{
                  font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif;
               }
            </style>
         </head>
         <body>
            <section class="email-container">
               <div class="label"></div>
               <div class="" style="padding: 0 20px; font-family: sans-serif">
               <div style="text-align: center;">
                  <p> <b>Reelwood Plus Global Limited</b> </p>
               </div>
               <br /><br />
               <p style="font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif;"> 
                  Your payment was successful and has been received by Reelwood Plus Global Limited for <b>${payload.event.event_title}</b> event.
               </p>
               </div>

               <br> <br>
               <div  class="details" style="background-color:#f4f6f8; padding:0px 20px; text-align: center;font-weight: bold;font-size: 25px;">
               <h1>NGN ${payload.tickets[i].ticket.cost}</h1>
               </div><br> <br>


               <div  class="details" style="background-color:#f4f6f8; padding:0px 20px;font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif; ">
               <div style="margin-bottom: 7px;">
                  Categoty: <b style="float: right;">${payload.tickets[i].ticket.category}</b> 
               </div>
               <div style="margin-bottom: 7px;">
                  Amount: <b style="float: right;">NGN ${payload.tickets[i].ticket.cost}</b> 
               </div>
               <div style="margin-bottom: 7px;">
                  Date: <b style="float: right;">${payload.event.meta.startDate}</b> 
               </div>
               <div style="margin-bottom: 7px;">
                  Name: <b style="float: right;">${payload.tickets[i].buyer.name}</b> 
               </div>
               <div style="margin-bottom: 7px;">
                  Email: <b style="float: right;">${payload.tickets[i].buyer.email}</b> 
               </div>
               <div style="margin-bottom: 7px;">
                  Phone: <b style="float: right;">${payload.tickets[i].buyer.phone}</b> 
               </div> 

               <div> 
                  Ticket ID : <b style="float: right; background: linear-gradient(to bottom right, black, #124ac3);color:white;padding:4px 12px; border-radius: 7px; ">${payload.tickets[i].ticketId}</b> 
               </div> 
               </div><br> <br> 

               <div class="label"></div>
               <div style="background-color:#f4f6f8; padding:0px 20px;font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif; ">
                  © 2021 Reelwood Plus Global Limited. All rights reserved.
               </div>
            </section>
         </body>
         </html>
            `
      }
      sgMail
      .send(msg)
      .then((e) => {
         // return res.send(e) 
      })
      .catch((error) => {
         // return res.send(error) 
      })

   }
}


async function buyTicket(req, res) { 

   var request = require('request');
   let body = req.body  
   var options = {
   'method': 'POST',
   'url': 'https://api.flutterwave.com/v3/payments',
   'headers': {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer FLWSECK-a844a15f7fe7e9640fbe638da3ba8be3-X'  //aminigbo
       'Authorization': 'Bearer FLWSECK_TEST-224f03eca0a64cb4aced1326cd078896-X', //reelwood test
      // 'Authorization': 'Bearer FLWSECK_TEST-8f61bec54454e6290c8371285b6a690b-X'  // Aminigbo test

   }, 
      body: JSON.stringify(body)

   };
   request(options, function (error, response) { 
      if (error) throw new Error(error);
         res.send({
         response: JSON.parse(response.body)
      })
   });
}

module.exports = {
   createEvent,
   buyTicket,
   email
}
