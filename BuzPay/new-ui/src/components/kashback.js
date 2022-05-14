import debit_icon from "../statics/assets/credit-icon.png"
import credit_icon from "../statics/assets/debit-icon.png"


function separator(numb) {
   var str = numb.toString().split(".");
   str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   return str.join(".");
}


export const KashbackComponent = (state, history, User, dispTransactionToView, historyview) => {
   // console.log(User)
   // console.log(state)
   let filterActive = state.kashbacks.filter(e => e.active == true)

   let filterInactive = state.kashbacks.filter(e => e.active == false)



   let arrey = []
   if (historyview == "active") {
      arrey = filterActive
   } else {
      arrey = filterInactive
   }
   if (arrey.length < 1) {
      return (
         <>
            <div style={{

               boxShadow: "0px 7px 9px rgba(42, 14, 97, 0.16)", height: "", width: "", borderRadius: "0px", position: " ",
               background: "rgb(254,239,239)", padding: "40px", marginBottom: "20px",marginTop:"60px",textAlign:"center"
            }}>
               No history found
            </div>
         </>
      )
   } else {
      return arrey.map((e) => {
         // console.log(e)
         return (
            <>
               <div
                  onClick={() => {
                     dispTransactionToView(e)
                     history.push("/view-kashback")
                  }}
                  style={{

                     boxShadow: "0px 7px 9px rgba(12, 24, 37, 0.16)", height: "70px", width: "90%", borderRadius: "0px", position: "relative",
                     background: "white", padding: "15px", marginBottom: "20px"
                  }}>
                  <b style={{ position: "absolute", top: "10px", right: "10px" }} >₦{separator(e.data.data.amountPlusCharge - e.data.data.adminCharge)}</b>
                  <div style={{ fontSize: "13px", }}>
                     <b>Kashback of ₦{separator(e.data.data.amountPlusCharge - e.data.data.adminCharge)}.</b>
                  </div>
                  {e.active == true ?
                     <div style={{ fontSize: "13px", marginTop: "10px", color: "green" }}>
                        Active
                     </div> :
                     <div style={{ fontSize: "13px", marginTop: "10px", color: "crimson" }}>
                        Used
                     </div>}
                  <div style={{ marginTop: "10px" }}>
                     <b style={{ float: "left", fontSize: "12px" }}>{e.data.date.date} {e.data.date.month}.  {e.data.date.year}</b>
                     <b style={{ float: "right", marginRight: "10px", fontSize: "12px" }}>{e.data.date.time}</b>
                  </div>
               </div>
            </>
         )
      })
   }
}