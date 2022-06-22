const sgMail = require("@sendgrid/mail");

async function otpEmail(req) {
  sgMail.setApiKey(
    "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"
   );
   const payload = req.body
   console.log(req.body)
  const msg = {
    // to: payload.tickets[i].buyer.email, // Change to your recipient
    // from: 'ogapredictor@gmail.com', // Change to your verified sender
    to: payload.email,
    from: {
      name: "Buzz Pay",
      email: "ogapredictor@gmail.com",
    },
    subject: `One time password`,
    // text: 'and easy to do anywhere, even with Node.js',

    // html: `Your <b>${payload.tickets[i].ticket.category}</b>  ticket purchase for <b>${payload.tickets[i].meta.event_title}</b> was successfull
    //         Your ticket ID is <b> ${payload.tickets[i].ticketId}</b> `,

    html: `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
    integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
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
         background-color: #f3f3f3;
         padding:15px
      }

      .email-container {
        width: 50%;
        background-color: #90b3cd;
        height: auto;
        padding-bottom: 30px;
        height: 580px;
        margin-left: 25%; 
        position: relative
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

      .footer {
        width: 100%;
        height: auto;
        display: flex;
        flex-flow: row wrap;
        background: linear-gradient(to bottom right, black, #124ac3);
        /* position:absolute; */
        /* bottom: 0px;
            left:32.5%; */
      }

      .logo-cont {
        width: 100%;
        padding: 0 20px;
      }

      .first-column {
        width: 30%;
        margin-right: 5%;
        padding: 0 20px;
        font-family: sans-serif;
        color: #fff
      }

      .second-column {
        width: 30%;
        padding: 0 20px;
        font-family: sans-serif;
        color: #fff
      }

      body {
        margin-top: 40px
      }

      .label {
        height: 10px;
        background: linear-gradient(to bottom right, black, #124ac3);
        margin-bottom: 30px
      }
    }






    @media only screen and (max-width: 800px) {
      body {
        background-color: #f3f3f3;
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
        background-color:#90b3cd;
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

      .footer {
        width: 100%;
        height: auto;
        display: flex;
        flex-flow: row wrap;
        background: linear-gradient(to bottom right, black, #124ac3);
        position: absolute;
        bottom: 0px;
        left: 0px;
      }

      .logo-cont {
        width: 100%;
        padding: 0 20px;
      }

      .first-column {
        width: 100%;
        margin-bottom: 20%;
        padding: 0 20px;
        font-family: sans-serif;
        color: #fff
      }

      .second-column {
        width: 100%;
        padding: 0 20px;
        font-family: sans-serif;
        color: #fff
      }

      .label {
        height: 10px;
        background: linear-gradient(to bottom right, black, #124ac3);
        margin-bottom: 30px
      }
    }

    p {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    }
  </style>
</head>

<body style='background-color:#f4f6f8'>
  <section class="email-container" style='font-family: Open Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;
    padding: 40px 20px;'>
    <div class="" style="padding:; font-family: sans-serif">
     
      <!-- <h2 style='color:#0a3d62'>Buzz pay</h2>
      <br />  -->
      <p
        style="font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif;">
        <b>Hello ${payload.name},</b>
      </p>
    </div>

    <div class="" style="padding: ; font-family: sans-serif">
      <br /> 
      <br />
      <p
        style="font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif;">
        Use the OTP below to complete your Buzz authentication process:
      </p>
    </div> <br>
    <div class="details" style="background-color:#f4f6f8; padding:20px;text-align:center; font-size: 25px; font-family: OCR A Std, monospace">
      <p>${payload.otp}</p> 
    </div><br> <br>

    <div style="border-bottom:0.5px solid lightgray"></div><br> <br>
    <div style="color: #9eb0b7;background-color:#f4f6f8; padding:10px;font-family: Open Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;font-size: 13px;
    font-weight: 300; ">
      Remember: <br>
      - Never share thhis OTP or your password with anyone<br>
      - Buzz staff will never call you to request any code or password<br>
      - Call +2349011684637 if you lose access to your account
    </div> <br><br>

    <div style="position:absolute;bottom:2.5%;width:100%; color: #9eb0b7;background-color:#f4f6f8; padding:15px;font-family: Open Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;font-size: 13px;
    font-weight: 300;text-align:center ">

      © Buzz Pay, Inc 2021 <br> <br>
      12,Elzazi plaza, Woji port Harcourt, Nigeria
    </div>
  </section>
</body>

</html>`,
  };
  sgMail
    .send(msg)
    .then((e) => {
      // return res.send(e)
      console.log(e);
    })
    .catch((error) => {
      // return res.send(error)
    });
}
module.exports = {
  otpEmail,
};
