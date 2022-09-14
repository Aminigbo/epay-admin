const sgMail = require("@sendgrid/mail");

async function otpEmail(payload) {
   sgMail.setApiKey(
      "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"
   );

   const msg = {
      // to: payload.tickets[i].buyer.email, // Change to your recipient
      // from: 'ogapredictor@gmail.com', // Change to your verified sender
      to: payload.email,
      from: {
         name: "BuzPay",
         email: "ogapredictor@gmail.com",
      },
      subject: `One time password`,

      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
      integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <title>Ogapredictor</title>
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
          width: 60%;
          background-color: #f4f5f8;
          height: auto;
          padding-bottom: 30px;
          height: 100vh;
          margin-left: 20%;
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
          color: #fff;
        }
        .second-column {
          width: 30%;
          padding: 0 20px;
          font-family: sans-serif;
          color: #fff;
        }

        body {
          margin-top: 40px;
        }

        .label {
          height: 10px;
          background: linear-gradient(
            to bottom rgb(10, 61, 98),
            black,
            rgb(10, 61, 98)
          );
          margin-bottom: 30px;
        }
      }

      @media only screen and (max-width: 800px) {
        body {
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
          border-width: 10px;
          border-color: linear-gradient(to bottom right, black, orange);
          border-type: solid;
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
          color: #fff;
        }
        .second-column {
          width: 100%;
          padding: 0 20px;
          font-family: sans-serif;
          color: #fff;
        }

        .label {
          height: 10px;
          background: linear-gradient(
            to bottom right,
            rgb(10, 61, 98),
            rgb(10, 61, 98)
          );
          margin-bottom: 30px;
        }
      }

      p {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
      }
    </style>
  </head>
  <body>
    <section class="email-container">
      <div class="label"></div>
      <div class="" style="padding: 0 20px; font-family: sans-serif">
        <div style="text-align: center">
          <img
            style="width: 150px; display: inline-block"
            src="data:image/png;base64,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"
          />
        </div>
        <br /> <br />
        <b>Dear ${payload.name} <b/><br>
        <p
          style="
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
          "
        >
          Use the OTP below to complete your Buzpay authentication process:
        </p>
      </div>

      <br />
      <div
        class="details"
        style="
          background-color: #f4f6f8;
          padding: 0px 20px;
          text-align: center;
          font-weight: ;
          font-size: ;
        "
      >
        <div style="text-align: center">
          <b
            style="
              background-color: rgb(10, 61, 98);
              font-size: 25px;
              padding: 4px 20px;
              border-radius: 6px;
              color: white;
            "
            >${payload.otp}</b
          >
        </div>
        <br />
        <br />
        <br />

        <div
          style="
            color: #9eb0b7;
            background-color: #f4f6f8;
            padding: 10px;
            font-family: Open Sans, -apple-system, BlinkMacSystemFont, Roboto,
              Helvetica Neue, Helvetica, Arial, sans-serif;
            font-size: 13px;
            font-weight: 300;
            text-align: left;
          "
        >
          Remember: <br />
          - Never share thhis OTP or your password with anyone<br />
          - Buzpay staff will never call you to request any code or password<br />
          - Call +2349011684637 if you lose access to your account <br><br> 

        </div>
        <br /> 
          <b>Buzpay Team</b>
        </p>
      </div>
      <br />

      <br />

      <div class="label"></div>
      <div
        style="
          background-color: #f4f6f8;
          padding: 0px 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
        "
      >
        © 2021 Buzpay. All rights reserved.
      </div>
    </section>
  </body>
</html>
`,
   };
   sgMail
      .send(msg)
      .then((e) => {
         // return res.send(e)
         console.log(e);
      })
      .catch((error) => {
         // return res.send(error)
         console.log(error)
      });
}
module.exports = {
   otpEmail,
};
