// import from models
const { searchVendor } = require("../../models/vendor");
const base = "https://api.flutterwave.com/v3";
const API_KEY = "FLWSECK_TEST-8f61bec54454e6290c8371285b6a690b-X";
var request = require("request");

async function vendorApplyController(req, res) {
  let { pin, id } = (req.body);
  console.log(req.body)
  searchVendor(id).then((response) => {
    if (response.body && response.body.length > 0) {
      if (response.body[0].data.pin == pin) {
        if (response.body[0].data.isVendor == true) {
          res.send({
            success: false,
            message: "Already a vendor",
          });
        } else {
          res.send({
            success: true,
            name: response.body[0].data.name,
            phone: response.body[0].data.phone,
            // email: response.body[0].email,
            isVendor: response.body[0].data.isVendor,
          });
        }
      } else {
        res.send({
          success: false,
          message: "Invalid credentials",
        });
      }
    } else {
      res.send({
        response,
        success: false,
        message: "A network error occured",
      });
    }
  });
}

async function verifyBank(req, res) {
  let { acc_number, bank_code } = req.body;
  var options = {
    method: "POST",
    url: `${base}/accounts/resolve`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      account_number: acc_number,
      account_bank: bank_code,
    }),
  };
  request(options, function (error, response) {
    if (error) {
      res.send({
        success: false,
        error,
      });
    } else {
      res.send({
        success: true,
         data: JSON.parse(response.body),
      });
    }
  });

//   var options = {
//   'method': 'POST',
//   'url': `${base}/accounts/resolve`,
//   'headers': {
//     'Content-Type': 'application/json',
//      'Authorization': `Bearer ${API_KEY}`
//   },
//   body: JSON.stringify({"account_number":acc_number,"account_bank":"044"})

// };
// request(options, function (error, response) { 
//   if (error) throw new Error(error);
//   console.log(response.body);
// });
}

async function bankList(req, res) {
  var request = require("request");
  var options = {
    method: "GET",
    url: `${base}/banks/NG`,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  request(options, function (error, response) {
    if (error) {
      res.send({
        success: false,
        error,
      });
    } else {
      res.send({
        success: true,
        data: JSON.parse(response.body),
      });
    }
  });
}


async function submitApplication(req, res) {
  res.send({image:req.file,body:req.body})
}
module.exports = {
  vendorApplyController,
  verifyBank,
  bankList,
  submitApplication
};
