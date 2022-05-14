import React, { useState } from "react";
import { connect } from "react-redux";
import { transactionListener } from "../controllers/realtime"
import {
   HomeOutlined,
   SettingsOutlined,
   BarChartOutlined,
   LocalAtm,
   AccountBalanceWallet,
   CompareArrows,
   NotificationsNoneOutlined
} from "@material-ui/icons";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/QrCode2Outlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import userAvater from "../statics/assets/user.png"
import debit_icon from "../statics/assets/credit-icon.png"
import credit_icon from "../statics/assets/debit-icon.png"
import { ArrowRightAlt } from "@material-ui/icons";
import { userSessionService, } from '../services/auth'
import { moveBuzzBalanceController } from "../controllers/transactions"

import { useHistory } from "react-router-dom";
import { loader } from "../components/loader"
import { successAlert } from "../components/alert"
import { session, clearCounterController } from "../controllers/checksession"
import {
   login,
   disp_session,
   re_auth,
   disp_realtime,
   disp_noti,
   logOut
} from "../redux";



const formSTyle = {
   background: "",
   // height: "1000px"
   width: "100%",
}
function Login({
   appState,
   login_suc,
   realtime,
   reauth,
   dispNoti
}) {


   const [compState, setStates] = useState("")
   const [vewbuzzmewallet, setvewbuzzmewallet] = useState(false)
   const state = appState;
   let history = useHistory();
   let User = userSessionService()

   // move buzzme to wallet
   const moneToWallet = () => {
      let payload = {
         user: state.userData.buzzID,
      }
      moveBuzzBalanceController(payload, login_suc, setStates, compState)
   }

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
      if (state.realtime[0].response.meta.data) { 

         return (
            <>
               <b>{state.realtime[0].response.type} Alert</b> <br />
               {state.realtime[0].response.type =="SCANPAY" && <><p>₦{separator(parseInt(state.realtime[0].response.meta.data.amountPlusCharge)-parseInt(state.realtime[0].response.meta.data.adminCharge) )}</p></>}
               {state.realtime[0].response.type =="BUZZ ALERT" && <><p>₦{separator(state.realtime[0].response.meta.data.amount)}</p></>}
               <p>  from {state.realtime[0].response.meta.sender.fullname}</p>
            </>
         )
      }
   }

// BUZZ ALERT
   return (
      <>
         {state.realtime.length > 0 && successAlert(clearRealtime, 'hello man', realtimeMsg)}
         {state.loggedIn === false && history.push("/")}
         {compState.loading == true && loader()}
         {clearCounterController()}
         {session(history, reauth)}

         <Fab onClick={() => {
            history.push("/scan")
         }} style={{ position: "fixed", bottom: "9%", right: "6px", zIndex: "10000", background: "#0a3d62" }} color="secondary" aria-label="add">
            <AddIcon />
         </Fab>


         <div style={formSTyle} >
            <div style={{
               marginBottom: "20px", height: "220px",
               background: "linear-gradient(180deg, rgba(41, 70, 97, 0.5) 17.29%, rgba(41, 70, 97, 0) 100%)",
               padding: "30px 10px",
               position: "relative",
               // width: "100%"
               // border: "1px solid red"
            }}>
               <div style={{ position: "absolute", left: '10px', top: "30px", width: " ", background: " " }}>
                  <img src={userAvater} onClick={() => {
                     // history.goBack()
                  }} style={{ display: "inline-block" }} />
               </div>
               <b style={{ position: "absolute", left: '70px', top: "30px", fontWeight: "700px", fontSize: "20px", lineHeight: "140%" }}>
                  Welcome Back
               </b>

               <div style={{ position: "absolute", left: '70px', top: "60px", fontSize: "16px" }}>
                  <span>{User !== null && User.user.user_metadata.name.split(" ")[0]}</span>
               </div>
               <center style={{ background: state.notification == true ? "crimson" : "#0C1825", width: "30px", height: "30px", float: "right", borderRadius: "30px" }}>
                  <NotificationsNoneOutlined style={{ color: "white" }} />
               </center>

               <div style={{ position: "absolute", left: '15%', top: "120px", fontSize: "16px", width: "70%", background: "", textAlign: "center" }}>
                  <div style={{ marginBottom: "6px" }}>
                     <small style={{ color: "rgba(12, 24, 37, 0.54)" }}>Avaliable fund</small></div>
                  <b style={{ fontWeight: "700px", fontSize: "30px", lineHeight: "140%" }}>
                     NGN {state.userData !== null && separator(state.userData.wallet)}<small style={{ fontSize: "10px" }}>.00</small>
                  </b>
                  <button style={{ width: "169px", height: "45px", borderRadius: "4px", background: "#0C1825", padding: " 5px 16px 6px", color: "white", border: "none", marginTop: "10px" }}>
                     <AccountBalanceWallet style={{ fontSize: "12px" }} /> &nbsp;Fund Wallet
                  </button>
               </div>
            </div>


            {/* ========== */}

            <div style={{ padding: "10px", background: "  ", textAlign: "center", width: "" }}>
               <div
                  onClick={() => {
                     history.push("/buzzme")
                  }}
                  style={{
                     height: "120px", width: "40%", background: "#0C1825", display: "inline-block", borderRadius: "8px",
                     color: "white", textAlign: "left", padding: "10px"
                  }}>
                  <LocalAtm />
                  <div style={{ margin: "8px 0px" }}><b style={{ fontSize: "14px" }}>Buzz me</b></div>
                  <small style={{ fontSize: "10px" }}>Tranfer money to Marchants, friends and family</small>
               </div>
               <div
                  onClick={() => {
                     history.push("/kashback")
                  }}
                  style={{
                     height: "120px", width: "40%", background: "#0C1825", display: "inline-block", marginLeft: "7%",
                     borderRadius: "8px", color: "white", textAlign: "left", padding: "10px"
                  }}>
                  <CompareArrows />
                  <div style={{ margin: "8px 0px" }}><b style={{ fontSize: "14px" }}>Kashback</b></div>
                  <small style={{ fontSize: "10px" }}>Create Kashback for Marchants and Friends</small>
               </div>
            </div>




            {/* =========================== */}


            <div style={{ padding: "15px", background: " ", textAlign: "left", width: "", marginTop: "20px" }}>

               <div>
                  <b>
                     Account Summary
                  </b>
               </div>
               <br />


               <div style={{
                  boxShadow: "0px 7px 9px rgba(12, 24, 37, 0.16)", height: "145px", width: "90%", borderRadius: "8px", position: " ",
                  background: "white", padding: "15px", marginBottom: "20px"
               }}>
                  {/* <img src={debit_icon} style={{ position: "absolute", top: "10px", right: "10px" }} /> */}

                  <div style={{ marginBottom: "10px", marginTop: "5px" }}>
                     <b style={{ color: "rgba(12, 24, 37, 0.33)" }}>
                        Kashback
                     </b>
                  </div>

                  <div style={{ marginTop: "15px" }}>
                     <b style={{ float: "left" }}>₦50,000,000</b>
                     <img src={debit_icon} style={{ float: "right" }} />
                  </div>
                  <br />
                  <div style={{ marginTop: "30px" }}>
                     <b style={{ float: "left" }}>₦50,000,000</b>
                     <img src={credit_icon} style={{ float: "right" }} />
                  </div>
                  <br />
                  <div style={{ marginTop: "25px" }}>
                     <small style={{ float: "left" }}>12 Sept. 2021 - 12 Sept. 2021</small>
                     {/* <small style={{ float: "right", marginRight: "10px" }}>see history</small> */}
                  </div>

               </div>


               <div style={{
                  boxShadow: "0px 7px 9px rgba(12, 24, 37, 0.16)", height: "145px", width: "90%", borderRadius: "8px", position: " ",
                  background: "white", padding: "15px", marginBottom: "20px"
               }}>
                  {/* <img src={debit_icon} style={{ position: "absolute", top: "10px", right: "10px" }} /> */}

                  <div style={{ marginBottom: "10px", marginTop: "5px" }}>
                     <b style={{ color: "rgba(12, 24, 37, 0.33)" }}>
                        Buzz me
                     </b>
                  </div>

                  <div style={{ marginTop: "15px" }}>
                     <b style={{ float: "left" }}>₦50,000,000</b>
                     <img src={debit_icon} style={{ float: "right" }} />
                  </div>
                  <br />
                  <div style={{ marginTop: "30px" }}>
                     <b style={{ float: "left" }}>₦50,000,000</b>
                     <img src={credit_icon} style={{ float: "right" }} />
                  </div>
                  <br />
                  <div style={{ marginTop: "25px" }}>
                     <small style={{ float: "left" }}>12 Sept. 2021 - 12 Sept. 2021</small>
                     {/* <small style={{ float: "right", marginRight: "10px" }}>12:00am</small> */}
                  </div>

               </div>


               <br /><br /><br />

            </div>

            <div style={{ height: "64px", width: "100%", position: "fixed", background: "#FFFFFF", bottom: "0px", left: "0px", borderTop: "1px solid rgba(12, 24, 37, 0.18)", textAlign: "center" }}>
               <center style={{ height: "100%", width: "30%", background: "", display: "inline-block", padding: "5px", color: "grey" }}>
                  <HomeOutlined style={{ float: "" }} />
                  <div><small>Home</small></div>
               </center>
               <center onClick={() => {
                  history.push("/transaction")
               }} style={{ height: "100%", width: "30%", background: "", display: "inline-block", padding: "5px" }}>
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
      login_suc: (userMetadata) => dispatch(login(userMetadata)),
      set_session: (time) => dispatch(disp_session(time)),
      reauth: () => dispatch(re_auth()),
      realtime: (data) => dispatch(disp_realtime(data)),
      dispNoti: (payload) => dispatch(disp_noti(payload)),
      log_out: () => dispatch(logOut()),


   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
