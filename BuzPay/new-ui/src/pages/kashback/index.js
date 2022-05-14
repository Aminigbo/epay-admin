import React, { useState } from "react";
import { connect } from "react-redux";
import {
   HomeOutlined,
   SettingsOutlined,
   BarChartOutlined,
   SignalCellularConnectedNoInternet0Bar,
   RefreshOutlined,
   AddOutlined,
   KeyboardBackspace
} from "@material-ui/icons";
import { Redirect, useHistory } from "react-router-dom";
import { loader } from "../../components/loader"
import { session, clearCounterController } from "../../controllers/checksession"
import { transactionListener } from "../../controllers/realtime"
import { allKashbackController } from "../../controllers/kashback"
import { userSessionService, } from '../../services/auth'
import { KashbackComponent } from "../../components/kashback"
import {
   allKashback,
   transactionsToView,
   disp_session,
   re_auth,
   disp_realtime,
   disp_noti,
   login,
   logOut
} from "../../redux";
import Logo from "../../statics/assets/logo.png"

import { Drawer, Divider } from "@mui/material";
import { successAlert } from "../../components/alert"
import Fab from '@mui/material/Fab';

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
   dispAllKashbacks,
   dispTransactionToView,
   set_session,
   login_suc,
   realtime,
   reauth,
   dispNoti,
   log_out

}) {


   let User = userSessionService()

   const [compState, setStates] = useState({
      error: false,
      loading: false
   })
   const [historyview, sethistoryview] = useState("active")
   const state = appState;
   let history = useHistory();
   React.useEffect((compState) => {
      window.scrollTo(0, 0);
      if (User == null) {
         logOut()
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
         allKashbackController(User.user.user_metadata.buzzID, setStates, compState, dispAllKashbacks)
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
         allKashbackController(User.user.user_metadata.buzzID, setStates, compState, dispAllKashbacks)
      } else {

      }
   }

   return (
      <>
         {/* {console.log(state)} */}
         {state.realtime.length > 0 && successAlert(clearRealtime, 'hello man', realtimeMsg)}

         {compState.loading == true && loader()}
         {clearCounterController()}
         {session(history)}
         {state.loggedIn === false && history.push("/")}

         <div style={{ marginBottom: "60px", height: "50px", background: "  ", padding: "0px 15px", marginTop: "30px" }}>
            <RefreshOutlined onClick={() => {
               refreshTransactions()
            }} style={{ float: "left", fontSize: "30px" }} />
            <img onClick={() => {
               history.push("/dashboard")
            }} src={Logo} style={{ width: "80px", float: "right" }} />


            <div style={{ position: "absolute", top: "111px", fontSize: "" }} >
               <b style={{ fontSize: "19px", color: "#0C1825" }}>Kashback</b>
               <div style={{ marginTop: "5px" }} >
                  <small>Kashback history</small>
               </div>


            </div>
            <div
               onClick={() => {
                  history.push("/create-kashback")
               }}
               style={{ position: "absolute", top: "106px", background: "#0C1825", right: "20px", width: "", textAlign: "center", padding: "10px", color: "white", borderRadius: "8px" }}>
               Create kashback
            </div>
         </div> <br />
         <Divider style={{ margin: "30px 0px" }} />

         <div style={{ background: " ", height: "40px", width: " ", padding: "15px 15%", position: "sticky", top: "0px", zIndex: "10000", background: "white" }}>

            <span onClick={() => {
               sethistoryview("active")
            }} style={{ float: "left", borderBottom: historyview == "active" && "2px solid #0C1825", color: historyview == "active" ? "#0C1825" : "grey" }}>Active</span>
            <span onClick={() => {
               sethistoryview("used")
            }} style={{ float: "right", color: historyview == "used" ? "#0C1825" : "grey", borderBottom: historyview == "used" && "2px solid #0C1825" }}>Used</span>
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
               {compState.loading === false && KashbackComponent(state, history, User.user, dispTransactionToView, historyview)}

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
            <center onClick={() => {
               history.push("/transaction")
            }} style={{ height: "100%", width: "30%", background: "", display: "inline-block", padding: "5px", color: " " }}>
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
      dispAllKashbacks: (payload) => dispatch(allKashback(payload)),
      dispTransactionToView: (payload) => dispatch(transactionsToView(payload)),
      set_session: (time) => dispatch(disp_session(time)),
      realtime: (data) => dispatch(disp_realtime(data)),
      dispNoti: (payload) => dispatch(disp_noti(payload)),
      login_suc: (data) => dispatch(login(data)),
      reauth: () => dispatch(re_auth()),
      log_out: () => dispatch(logOut()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
