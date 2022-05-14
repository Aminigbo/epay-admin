import React, { useState } from "react";
import { connect } from "react-redux";
import {
   HomeOutlined,
   SettingsOutlined,
   BarChartOutlined,
   SignalCellularConnectedNoInternet0Bar,
   RefreshOutlined
} from "@material-ui/icons";
import { Redirect, useHistory } from "react-router-dom";
import { loader } from "../../components/loader"
import { session, clearCounterController } from "../../controllers/checksession"
import { transactionListener } from "../../controllers/realtime"
import { allTransactionsController } from "../../controllers/transactions"
import { userSessionService, } from '../../services/auth'
import { transactionComponent } from "../../components/transactions"
import {
   transactions,
   transactionsToView,
   disp_session,
   re_auth,
   disp_realtime,
   disp_noti,
   login
} from "../../redux";

import { successAlert } from "../../components/alert"

const inputStyle = {
   height: "55px",
   width: "100%",
   padding: "10px"
}
const formSTyle = {
   width: "90%",
   marginLeft: "5%",
   marginTop: "30px"
}
function Login({
   appState,
   disp_transactions,
   dispTransactionToView,
   set_session,
   login_suc,
   realtime,
   reauth,
   dispNoti,


}) {


   let User = userSessionService()

   const [compState, setStates] = useState({
      error: false,
      loading: false
   })
   const state = appState;
   let history = useHistory();
   React.useEffect((compState) => {
      window.scrollTo(0, 0);

      if (User == null) {
         // logOut()
         history.push("/login")
      } else if (state.userData == null) {
         reauth()
      } else {
         // reauth

         transactionListener(realtime, state.userData.buzzID, dispNoti)
      }
   }, []);

   const refreshTransactions = () => {
      if (User !== null) {
         setStates({
            ...compState,
            loading: true
         })
         allTransactionsController(User.user.user_metadata.buzzID, setStates, compState, disp_transactions)
      }
   }

   function separator(numb) {
      var str = numb.toString().split(".");
      str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return str.join(".");
   }

   const clearRealtime = () => {
      let userNewData = {
         ...state.userData,
         buzzme_wallet: parseInt(state.userData.buzzme_wallet) + parseInt(state.realtime[0].response.meta.data.amount)
      }
      login_suc(userNewData)
      realtime([])
   }
   const realtimeMsg = () => {
      return (
         <>
            <b>Buzz me Alert</b> <br />

            <p>₦{separator(state.realtime[0].response.meta.data.amount)}  from {state.realtime[0].response.meta.sender.fullname}</p>
         </>
      )
   }


   const tryAgain = () => {
      if (User !== null) {
         setStates({
            ...compState,
            loading: true
         })
         allTransactionsController(User.user.user_metadata.buzzID, setStates, compState, disp_transactions)
      } else {

      }
   }

   return (
      <>
         {/* {console.log(state)} */}
         {state.realtime.length > 0 && successAlert(clearRealtime, 'hello man', realtimeMsg)}
         {state.loggedIn === false && history.push("/")}
         {compState.loading == true && loader()}
         {clearCounterController()}
         {session(history)}
         <div style={{ position: "sticky", top: "0px", backgroundColor: "white", padding: "20px", zIndex: "10000" }}>
            <b style={{
               fontWeight: ' 700',
               fontSize: ' 17px',
               lineHeight: '30px',
               /* identical to box height */

               letterSpacing: '-0.02em',

               color: '#0C1825',
            }}>
               Transactions
            </b>

            <RefreshOutlined onClick={() => {
               refreshTransactions()
            }} style={{ float: "right", cursor: "pointer", fontSize: "30px" }} />
         </div>
         <form style={formSTyle} noValidate autoComplete="off" >


            {compState.error == true ? <div style={{ position: "fixed", top: "30%", textAlign: " ", width: "100%", background: " ", left: "0px" }}>
               <center>
                  <SignalCellularConnectedNoInternet0Bar style={{ fontSize: "85px", color: "red  " }} /> <br />
                  <small style={{ color: "red" }}>
                     Ensure you are connected to the internet.
                  </small>
                  <br /><br />
                  <b style={{ color: "#0a3d62" }} onClick={() => {
                     tryAgain()
                  }} >Try again</b>
               </center>
            </div> : <div style={{ padding: " ", background: "  ", textAlign: "left", width: "", marginTop: "20px", color: " " }}>
               {compState.loading === false && transactionComponent(state, history, User.user, dispTransactionToView)}

            </div>}

         </form>

         <br /><br /><br /> <br /><br />

         <div style={{ height: "64px", width: "100%", position: "fixed", background: "#FFFFFF", bottom: "0px", left: "0px", borderTop: "1px solid rgba(12, 24, 37, 0.18)", textAlign: "center" }}>
            <center onClick={() => {
               history.push("/dashboard")
            }} style={{ height: "100%", width: "30%", background: "", display: "inline-block", padding: "5px", }}>
               <HomeOutlined style={{ float: "" }} />
               <div><small>Home</small></div>
            </center>
            <center style={{ height: "100%", width: "30%", background: "", display: "inline-block", padding: "5px", color: "grey" }}>
               <BarChartOutlined style={{ float: "" }} />
               <div><small>Transactions</small></div>
            </center>
            <center onClick={() => {
               history.push("/account")
            }} style={{ height: "100%", width: "30%", background: "", display: "inline-block", padding: "5px" }}>
               <SettingsOutlined style={{ float: "" }} />
               <div><small>Account</small></div>
            </center>
         </div>

      </>
   );
}

const mapStateToProps = (state) => {
   return {
      appState: state.user,
   };
};

const mapDispatchToProps = (dispatch, encoded) => {
   return {
      disp_transactions: (payload) => dispatch(transactions(payload)),
      dispTransactionToView: (payload) => dispatch(transactionsToView(payload)),
      set_session: (time) => dispatch(disp_session(time)),
      realtime: (data) => dispatch(disp_realtime(data)),
      dispNoti: (payload) => dispatch(disp_noti(payload)),
      login_suc: (data) => dispatch(login(data)),
      reauth: () => dispatch(re_auth()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
