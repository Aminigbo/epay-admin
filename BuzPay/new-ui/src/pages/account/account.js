import React, { useState } from "react";
import { connect } from "react-redux";
import { logoutService } from "../../services/auth"
import {
   HomeOutlined,
   SettingsOutlined,
   BarChartOutlined,
   ArrowForwardIosOutlined,
   Person,
   HelpOutlineOutlined,
   LibraryBooksOutlined,
   CreditCardOutlined,
   LockOutlined
} from "@material-ui/icons"; 
import userAvater from "../../statics/assets/user.png"
import { session, clearCounterController } from "../../controllers/checksession" 

import { userSessionService, } from '../../services/auth'


import { useHistory } from "react-router-dom";
import { loader } from "../../components/loader" 
import {
   re_auth,
   disp_session,
} from "../../redux";



const formSTyle = {
   background: "white",
   // height: "1000px"
}
function Login({
   log_out,
   appState,
   set_session,
}) { 
   const [compState, setStates] = useState("") 
   const state = appState;
   let history = useHistory(); 
   let User = userSessionService()
   React.useEffect((compState) => {
      window.scrollTo(0, 0);

      // clearCounterController()
      // session(history)
   }, []);



   return (
      <>
         {compState.loading == true && loader()}
         {state.authenticated === false && history.push("/")}
         {clearCounterController()}
         {session(history)}
         {console.log(state)}
         <div style={formSTyle} >
            <div style={{
               marginBottom: "20px",
               background: "white",
               padding: "30px 10px",
               position: "relative",
               // width: "100%"
               // border: "1px solid red"
            }}>
               <b style={{ position: "absolute", left: '20px', top: "30px", fontWeight: "700px", fontSize: "20px", lineHeight: "140%" }}>
                  My Account
               </b>

               <div style={{ position: "absolute", left: '20px', top: "60px", fontSize: "16px" }}>
                  <span>{User !== null && User.user.user_metadata.buzzID}</span>
               </div>
               <img src={userAvater} style={{ width: " ", float: "right" }} />
            </div>




            {/* =========================== */}


            <div style={{ padding: "10px", background: "  ", textAlign: "left", width: "", marginTop: "70px", color: "white" }}>



               <div
                  onClick={() => {
                     history.push("/account-details")
                  }}
                  style={{
                     height: "34px", width: "100%", borderRadius: "8px", position: "relative",
                     background: "#0C1825", padding: "20px 0px", marginBottom: "20px", textAlign: " "
                  }}>
                  <div style={{ position: "absolute", left: "78px", }}>
                     <b style={{ fontSize: "16px" }}>Your Profile</b>
                     <div style={{ marginTop: "5px", color: "rgba(255, 255, 255, 0.5)", fontSize: "12px" }}><span>{User !== null && User.user.user_metadata.name}</span></div>
                  </div>
                  <Person style={{ position: "absolute", left: "25px", fontSize: "30px" }} />
                  <ArrowForwardIosOutlined style={{ position: "absolute", right: "15px", }} />

               </div> 

               <div style={{
                  height: "34px", width: "100%", borderRadius: "8px", position: "relative",
                  background: "#0C1825", padding: "20px 0px", marginBottom: "20px", textAlign: " "
               }}>
                  <div style={{ position: "absolute", left: "78px", }}>
                     <b style={{ fontSize: "16px" }}>Saved beneficiaries</b>
                     <div style={{ marginTop: "5px", color: "rgba(255, 255, 255, 0.5)", fontSize: "12px" }}><span>Manage beneficiaries</span></div>
                  </div>
                  <CreditCardOutlined style={{ position: "absolute", left: "25px", }} />
                  <ArrowForwardIosOutlined style={{ position: "absolute", right: "15px", }} />

               </div>




               <div
                  onClick={() => {
                     history.push('/get-help')
                  }}
                  style={{
                     height: "34px", width: "100%", borderRadius: "8px", position: "relative",
                     background: "#0C1825", padding: "20px 0px", marginBottom: "20px", textAlign: " "
                  }}>
                  <div style={{ position: "absolute", left: "78px", }}>
                     <b style={{ fontSize: "16px" }}>Get Help</b>
                     <div style={{ marginTop: "5px", color: "rgba(255, 255, 255, 0.5)", fontSize: "12px" }}><span>Get support or send feedback</span></div>
                  </div>
                  <HelpOutlineOutlined style={{ position: "absolute", left: "25px", }} />
                  <ArrowForwardIosOutlined style={{ position: "absolute", right: "15px", }} />

               </div>

               <div
                  onClick={() => {
                     history.push("/terms")
                  }}
                  style={{
                     height: "34px", width: "100%", borderRadius: "8px", position: "relative",
                     background: "#0C1825", padding: "20px 0px", marginBottom: "20px", textAlign: " "
                  }}>
                  <div style={{ position: "absolute", left: "78px", }}>
                     <b style={{ fontSize: "16px" }}>Terms and Conditions</b>
                     <div style={{ marginTop: "5px", color: "rgba(255, 255, 255, 0.5)", fontSize: "12px" }}><span>About our contract with you</span></div>
                  </div>
                  <LibraryBooksOutlined style={{ position: "absolute", left: "25px", }} />
                  <ArrowForwardIosOutlined style={{ position: "absolute", right: "15px", }} />

               </div>



               <div
                  onClick={() => {
                     history.push("/security")
               }}
                  style={{
                  height: "34px", width: "100%", borderRadius: "8px", position: "relative",
                  background: "#0C1825", padding: "20px 0px", marginBottom: "20px", textAlign: " "
               }}>
                  <div style={{ position: "absolute", left: "78px", }}>
                     <b style={{ fontSize: "16px" }}>Security</b>
                     <div style={{ marginTop: "5px", color: "rgba(255, 255, 255, 0.5)", fontSize: "12px" }}><span>Protect yourself from intruders</span></div>
                  </div>
                  <LockOutlined style={{ position: "absolute", left: "25px", }} />
                  <ArrowForwardIosOutlined style={{ position: "absolute", right: "15px", }} />

               </div>


            </div>
            <br />
            <div onClick={() => {
               log_out()
            }} style={{ color: "#DA1414", textAlign: "center", fontWeight: "600", fontSize: "19px" }}> <b>Sign Out</b> </div>
            <br /><br /><br /> <br /><br />

            <div style={{ height: "64px", width: "100%", position: "fixed", background: "#FFFFFF", bottom: "0px", left: "0px", borderTop: "1px solid rgba(12, 24, 37, 0.18)", textAlign: "center" }}>
               <center onClick={() => {
                  history.push("/dashboard")
               }} style={{ height: "100%", width: "30%", background: "", display: "inline-block", padding: "5px",  }}>
                  <HomeOutlined style={{ float: "" }} />
                  <div><small>Home</small></div>
               </center>
               <center onClick={() => {
                  history.push("/transaction")
               }}  style={{ height: "100%", width: "30%", background: "", display: "inline-block", padding: "5px" }}>
                  <BarChartOutlined style={{ float: "" }} />
                  <div><small>Transactions</small></div>
               </center>
               <center onClick={() => {
                  history.push("/account")
               }} style={{ height: "100%", width: "30%", background: "", display: "inline-block", padding: "5px",color: "grey" }}>
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
      log_out: () => dispatch(re_auth()),
      set_session: (time) => dispatch(disp_session(time)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
