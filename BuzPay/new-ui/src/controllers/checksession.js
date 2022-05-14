import {getUserController} from "../services/auth"
export function session(history,reauth) {
   let sec = 0
   setInterval(function () {
      if (sec > 10000) {
         clearCounter()
         reauth()
         history.push("/")
      } else {
         sec++;
         // console.log(sec)
      }
   }, 1000);
}

function clearCounter() {
   // Get a reference to the last interval + 1
   const interval_id = window.setInterval(function () { },
      Number.MAX_SAFE_INTEGER);
   // Clear any timeout/interval up to that id
   for (let i = 1; i < interval_id; i++) {
      window.clearInterval(i);
   }
}

export function clearCounterController() {
   // Get a reference to the last interval + 1
   const interval_id = window.setInterval(function () { },
      Number.MAX_SAFE_INTEGER);
   // Clear any timeout/interval up to that id
   for (let i = 1; i < interval_id; i++) {
      window.clearInterval(i);
   }
}


// check if user object exist in the memory
export function checkUserSession(history) {
   if (getUserController(history) === null) {
      history.push("/login")
   } 
}