const {
  isNum,
  isEmpty,
  generateOTP,
  sendOTP,
  roles,
} = require("../../../utilities/index");
 

function regOTP(req, res) {
const phone = req.body.phone;
  const otp = generateOTP(10000, 99999);
  const message = `<#> Please use ${otp} as your Buzz registration code.  Do not share this OTP with anyone`; // message to be sent
  sendOTP(phone, message)
    .then((response) => {
      res.send({
        success: true,
        message: `OTP sent to ${otp}`,
        otp: otp,
      });
    })  
    .catch((error) => {
      res.send({
        success: false,
        message: "A network error occured",
      });
    });
}

function sendBuzzAlert(req, res) {
  const { phone, sender, amount, desc, balance } = req.body;
  const message = `Buzz alert of NGN ${amount} from ${sender}. Date: ${new Date()}. Desc: ${desc}. Bal: NGN ${balance}`;

  sendOTP(phone, message)
    .then((res) => {
      res.send({
        success: true,
        message: `alert sent to recipient`,
        otp: otp,
      });
    })
    .catch((error) => {
      res.send({
        success: false,
        message: "A network error occured",
      });
    });
}

// @======== BUZZ REQUEST
function buzzRequest(req, res) {
  const { phones, sender, amount, desc } = req.body;
  const message = `You have a Buzz request of NGN ${amount} from ${sender}. Desc: ${desc}`;
  console.log("Trigger");
  sendOTP(phones, message);
}

function generateCashbackAlert(req, res) {
  const { phone, token, amount } = req.body;
  const message = `Do not share your cashback token of NGN ${amount} with anyone. ${token} `;
  console.log("Trigger");
  sendOTP(phone, message);
  console.log(req.body);
}

function resolvedCashback(req, res) {
  const { phone1, phone2, amount, name, name1, bal1, bal2 } = req.body;
  const message = `You resolved a cashback token of NGN ${amount}. Bal: NGN ${bal1} `;
  const message2 = `${name} resolved your cashback token of NGN ${amount}. Bal:NGN ${bal2} `;

  if (!phone1 || !phone2 || !amount || !name || !bal1 || !bal2) {
    res.send({
      success: false,
      message: "Provide all payloads",
    });
  } else {
    console.log("Triggered");
    sendOTP(phone1, message);
    if (name !== name1) {
      sendOTP(phone2, message2);
    }
  }
}

// @========  GIVE AWAY CREATED
function giveCreated(req, res) {
  const { phones, name, amount } = req.body;
  const message = `${name} created a giveaway of NGN ${amount} and you could be a beneficiary. `;

  sendOTP(phones, message)
    .then((res) => {
      res.send({
        success: true,
        message: `sent`,
        otp: otp,
      });
    })
    .catch((error) => {
      res.send({
        success: false,
        message: "A network error occured",
      });
    });
}

function giveawayBenefited(req, res) {
  const { phone, name, amount, bal } = req.body;
  const message = `Congratulations!!, you have been Buzzed NGN ${amount} from ${name}'s giveaway. Bal: NGN ${bal} `;

  sendOTP(phone, message)
    .then((res) => {
      res.send({
        success: true,
        message: `sent`,
        otp: otp,
      });
    })
    .catch((error) => {
      res.send({
        success: false,
        message: "A network error occured",
      });
    });
}

// @========  benefited from give away

module.exports = {
  regOTP,
  sendBuzzAlert,
  generateCashbackAlert,
  resolvedCashback,
  giveawayBenefited,
  buzzRequest,
  giveCreated,
};
