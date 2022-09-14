// batabase connection
const { OTP_key, OTP_username, secret } = require("../../config/");
const jwt = require("jsonwebtoken");

// Set your app credentials
const credentials = {
  apiKey: OTP_key,
  username: OTP_username,
};

// Initialize the SDK
const AfricasTalking = require("africastalking")(credentials);

// Roles
const roles = (roleID) => {
  if (roleID === 0) {
    return "USER";
  } else {
    return "ADMIN";
  }
};

// generate token
const token = (event, jwt, secrete) => {
  return jwt.sign(
    {
      event: event,
    },
    secrete
  );
};


// @============  VALIDATE EMAIL
const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// @============= VALIDATE EMAIL
const validatePhoneNumber = (input_str)=>{
  var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(input_str);
}



const isNum = (number) => {
  let num = isNaN(parseFloat(number));
  if (num == true) {
    return true;
  } else {
    return false;
  }
};

const isEmpty = (str) => {
  if (!str || str.length < 10) {
    return true;
  } else {
    return false;
  }
};

const validate__pwd = (pwd1, pwd2) => {
  let charPwd1 = pwd1.match(/\d+/g);
  if (!pwd2) {
    if (charPwd1 === null || pwd1.length < 6) {
      return false;
    } else {
      return true;
    }
  } else {
    let charPwd2 = pwd2.match(/\d+/g);
    if (
      charPwd1 === null ||
      charPwd2 === null ||
      pwd1.length < 6 ||
      pwd2.length < 6 ||
      pwd1 != pwd2
    ) {
      return false;
    } else {
      return true;
    }
  }
};

const isEmail = (userData) => {
  return userData;
};

// generate otp
const generateOTP = (min, max) => {
  let randomNum = Math.random() * (max - min) + min;
  return Math.floor(randomNum);
};

const sendOTP = (sendTo, message) => {
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
  isNum,
  isEmail,
  isEmpty,
  sendOTP,
  generateOTP,
  roles,
  token,
  validate__pwd,
  validateEmail,
  validatePhoneNumber,
};
