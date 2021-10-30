export const isNum = (number)=>{
    let num = /\D/.test(number)
    if (num == true) {
        return false
    }else{
        return true
    }
}


export const validate__pwd = (pwd1, pwd2)=>{
    let charPwd1 = pwd1.match(/\d+/g)
    if (!pwd2) {
        if (charPwd1 === null || pwd1.length < 6 ) {
            return false;
        } else {
            return true
        }
    } else {
         let charPwd2 = pwd2.match(/\d+/g)
        if (charPwd1 === null || charPwd2 === null || pwd1.length < 6 || pwd2.length < 6 || pwd1 != pwd2 ) {
            return false;
        } else{
            return true
        }
    }
}


export const isEmail = (email) => {
   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


export const error = (msg, data) => {
   return {
      success: false,
      message:msg,
      data:null
   }
}


export const success = (msg, data) => {
   return {
      success: true,
      message:msg,
      data
   }
}