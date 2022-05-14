import debit_icon from "../statics/assets/credit-icon.png"
import credit_icon from "../statics/assets/debit-icon.png"


function separator(numb) {
   var str = numb.toString().split(".");
   str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   return str.join(".");
}


export const transactionComponent = (state, history, User, dispTransactionToView) => {
   // console.log(User)
   // console.log(state)
   return state.transactions.map((e) => {
      return (
         <>
            <div
               onClick={() => {
                  dispTransactionToView(e)
                  history.push("/transaction-view")
               }}
               style={{

                  boxShadow: "0px 7px 9px rgba(12, 24, 37, 0.16)", height: "100px", width: "90%", borderRadius: "0px", position: "relative",
                  background: "white", padding: "15px", marginBottom: "20px"
               }}>
               {e.from == User.user_metadata.buzzID ? <>
                  <img src={debit_icon} style={{ position: "absolute", top: "10px", right: "10px" }} />
               </> : <>
                  <img src={credit_icon} style={{ position: "absolute", top: "10px", right: "10px" }} />
               </>}

               <div style={{ marginBottom: "10px", marginTop: "5px", fontSize: "14px" }}>
                  {e.from == User.user_metadata.buzzID ? <>
                     <b>
                        Debit
                     </b>
                  </> : <>
                     <b>
                        Credit
                     </b>
                  </>}

               </div>
               <b style={{ color: "rgba(7, 63, 116, 1)" }}>₦{separator(e.meta.data.amount)}</b>
               <div style={{ fontSize: "13px" }}>
                  {e.type}
                  {e.from == User.user_metadata.buzzID ? <>
                     <spam> to </spam>  {e.meta.receiver.Fullname}
                  </> : <>
                     <spam> from </spam>  {e.meta.sender.fullname}
                  </>}

               </div>
               <div style={{ marginTop: "15px" }}>
                  <small style={{ float: "left", fontSize: "12px" }}>{e.meta.date.date} {e.meta.date.month}.  {e.meta.date.year}</small>
                  <small style={{ float: "right", marginRight: "10px", fontSize: "12px" }}>{e.meta.date.time}</small>
               </div>
            </div>
         </>
      )
   })
}