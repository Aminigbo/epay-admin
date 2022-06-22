const paystack = require('./paystack')('sk_live_6ad28e046a35ed799c11c73fc98ed2245935a81a')
 
  
const chargeCard = (req, res) => {
    paystack.chargeCard({
        // email: req.payload.email,
        email:'aminigbopaul@gmail.com',
        amount: req.body.amount,
        // metadata: {
        //     UserId: req.payload.id,
        //     custom_fields: [
        //         {

        //             fullName: req.payload.firstName + " " + req.payload.lastName,
        //         }
        //     ]
        // },
        card: {
            cvv: req.body.cvv,
            number: req.body.cardNumber,
            expiry_month: req.body.expiryMonth,
            expiry_year: req.body.expiryYear
        },
        //pin:  req.body.pin || ""
   }).then((response) => {
        if (response.status && response.data.status === "send_otp") {
            res.status(202).json({ success: response.status, message: response.data.display_text,
            code: 202, properties:{cardNumber: null, cvv: null, expiryMonth: null, expiryYear: null, pin: null}, data: response  });
        }else if(response.status && response.data.status === "send_pin"){
            res.status(202).json({ success: response.status, message: "please provide pin",
            code: 202, properties:{cardNumber: null, cvv: null, expiryMonth: null, expiryYear: null, pin: null}, data: response  });
        }else if(response.status && response.data.status === "failed"){
            res.status(202).json({ success: response.status, message: response.data.message,
            code: 202, properties:{cardNumber: null, cvv: null, expiryMonth: null, expiryYear: null, pin: null}, data: response  });
        }else if(response.status && response.data.status === "pending"){
            res.status(202).json({ success: response.status, message: response.status,
            code: 202, properties:{cardNumber: null, cvv: null, expiryMonth: null, expiryYear: null, pin: null}, data: response  });
        }else{

            // if(response.data.status == "success"){
            //     models.Wallet.findOne({where : {
            //     UserId: req.payload.id
            //     }}).then((wallet)=>{

            //     if(wallet){
            //         wallet.topUp = response.data.amount
            //         wallet.balance = Number.parseInt(response.data.amount) + Number.parseInt(wallet.balance)
            //         wallet.save()
            //     }else{
            //         models.Wallet.create({
            //         UserId: req.payload.id,
            //         topUp: response.data.amount,
            //         balance: response.data.amount
            //         })
            //     }

            //     })

            // }
            res.status(202).json({ success: response.status, message: response.message,
            code: 202, properties:{cardNumber: null, cvv: null, expiryMonth: null, expiryYear: null, pin: null}, data: response  });
        } 

    }).catch((error) => {
    return res.status(520).json({ success: false, message: "unknown error",
        code: 520, properties:{cardNumber: null, cvv: null, expiryMonth: null, expiryYear: null, pin: null}, error: error  });
    })
}

const chargeCardOTP = (req, res)=>{
    paystack.submitOTP({
        otp: req.body.otp,
        reference: req.body.transactionReference
    }).then((response) => {
      
        return res.status(200).json({ success: true, message: response.data.status,
        code: 200, properties:{ otp: req.body.otp || null,
        transactionReference: req.body.transactionReference || null}, data: response  });
    }).catch((error) => {
        console.log(error)
        return res.status(520).json({ success: false, message: "unknown error",
        code: 520, properties:{ otp: req.body.otp || null,
        transactionReference: req.body.transactionReference || null}, error: error  });
    })
}

const chargeCardPIN = (req, res) => {
    paystack.submitPIN({
        pin: req.body.pin,
        reference: req.body.transactionReference
    }).then((response) => {
        return res.send({
            response
        })
    }).catch((error) => {
    return res.send({error})
  })
}

module.exports = { 
    chargeCard,
    chargeCardOTP,
    chargeCardPIN
}