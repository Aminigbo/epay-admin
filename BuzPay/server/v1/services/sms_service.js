// batabase connection
const { OTP_key, OTP_username, secret } = require("../../config/index"); 

// Set your app credentials
const credentials = {
  apiKey: OTP_key,
  username: OTP_username,
};

// Initialize the SDK
const AfricasTalking = require("africastalking")(credentials);
 
 
const smsService = (sendTo, message) => {
  // Get the SMS service
  const sms = AfricasTalking.SMS;
  const options = {
    to: [sendTo],
    message,
    // from: 'XXYYZZ'
  };
  return sms
    .send(options)
    .then((response) => {
      console.log(response)
      return response;
    })
    .catch((error) => {
      console.log(error)
      return error;
    });
};

module.exports = { 
  smsService, 
};
