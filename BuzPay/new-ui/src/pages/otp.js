import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
   Backspace,
   InputOutlined,
   FiberManualRecord,
   FiberManualRecordOutlined,
} from "@material-ui/icons";
import { Drawer } from "@mui/material";
import { successAlert } from "../components/alert"
import { loader } from "../components/loader"
import { updateUserMetaController } from "../controllers/updatePin"
import Logo from "../statics/assets/logo.png"

import { KeyboardBackspace } from "@material-ui/icons";


import { getUserController } from "../services/auth"
function Home({ appState, login_suc, logout, set_session }) {
   const state = appState;
   const history = useHistory();
   const [pin, setPin] = useState("");
   const [first, setfirst] = useState(null)
   const [error, seterror] = useState(false)
   const [loading, setloading] = useState(true)
   const userOTP = getUserController().user_metadata.otp;



   const verify = () => {
      if (pin.length == 5) {
         if (userOTP == pin) {
            // setfirst(true)
            let btnAction = () => { history.push("/setpin") }
            let message = "One Time Password verified successfully"
            return successAlert(btnAction, message)

         } else {
            console.log(pin)
            console.log(userOTP)
            window.navigator.vibrate([200]);
            seterror(true)
            setfirst(null)
            setPin("");
         }
      }
   };
   const append = (e) => {
      let newPin = pin + e;
      if (pin.length !== 5) {
         setPin(newPin);
      }
      if (pin.length > 3) {
         verify();
      }
   };

   const clear = (e) => {
      let pinLength = pin.length;
      let clearOne = pinLength - 1;
      setPin(pin.substring(0, clearOne));
   };

   const buttonValue = (e) => {
      if (e == "clear") {
         return <Backspace />;
      } else if (e == "out") {
         return <InputOutlined />;
      } else {
         return <>{e}</>;
      }
   };

   const pinVal = () => {
      if (pin.length == 1) {
         return (
            <>
               {" "}
              <div style={{ height: "45px", width: "50px", background: "#073F74", borderRadius: "8px", display: "inline-block" }}></div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "lightgrey", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "lightgrey", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "lightgrey", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "lightgrey", borderRadius: "8px", display: "inline-block" }}> </div>&nbsp; &nbsp;
            </>
         );
      } else if (pin.length == 2) {
         return (
            <>
             <div style={{ height: "45px", width: "50px", background: "#073F74", borderRadius: "8px", display: "inline-block" }}></div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "#073F74", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "lightgrey", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "lightgrey", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "lightgrey", borderRadius: "8px", display: "inline-block" }}> </div>&nbsp; &nbsp;
            </>
         );
      } else if (pin.length == 3) {
         return (
            <>
               <div style={{ height: "45px", width: "50px", background: "#073F74", borderRadius: "8px", display: "inline-block" }}></div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "#073F74", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "#073F74", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "lightgrey", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "lightgrey", borderRadius: "8px", display: "inline-block" }}> </div>&nbsp; &nbsp;
            </>
         );
      } else if (pin.length == 4) {
         return (
            <>
               <div style={{ height: "45px", width: "50px", background: "#073F74", borderRadius: "8px", display: "inline-block" }}></div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "#073F74", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "#073F74", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "#073F74", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "lightgrey", borderRadius: "8px", display: "inline-block" }}> </div>&nbsp; &nbsp;
            </>
         );
      } else if (pin.length == 5) {
         return (
            <>
                <div style={{ height: "45px", width: "50px", background: "#073F74", borderRadius: "8px", display: "inline-block" }}></div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "#073F74", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "#073F74", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "#073F74", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "#073F74", borderRadius: "8px", display: "inline-block" }}> </div>&nbsp; &nbsp;
            </>
         );
      } else {
         return (
            <>
               {" "}
               <div style={{ height: "45px", width: "50px", background: "lightgrey", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "lightgrey", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "lightgrey", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "lightgrey", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "lightgrey", borderRadius: "8px", display: "inline-block" }}> </div>&nbsp; &nbsp;
            </>
         );
      }
   };
   React.useEffect(() => {
      if (getUserController() == null) {

      } else {

         console.log()
      }
   }, []);

   const buttons = () => {
      let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "out", "0", "clear"];
      return numbers.map((e) => {
         return (
            <>
               {/* {console.log(state)} */}
               <button
                  className="customInput"
                  style={{
                     width: "60px",
                     padding: "2px 20px",
                     fontWeight: "bold",
                     border: "none",
                     background: "white",
                     //   color: "black",
                     margin: "20px 20px",
                     fontSize: "20px",
                     textAlign: "center",
                     borderRadius: "5px",
                  }}
                  value={e}
                  onClick={() => {
                     seterror(false)
                     if (e == "clear") {
                        clear(e);
                     } else if (e == "out") {
                        setDrawerState({ ...drawerState, bottom: true });
                     } else {
                        append(e);
                     }
                  }}
               >
                  {buttonValue(e)}
               </button>
            </>
         );
      });
   };

   const [drawerState, setDrawerState] = React.useState({
      bottom: false,
   });

   const toggleDrawer = (anchor, open, post) => (event) => {
      // console.log("okk");
      if (
         event.type === "keydown" &&
         (event.key === "Tab" || event.key === "Shift")
      ) {
         return;
      }

      setDrawerState({ ...drawerState, [anchor]: open });
   };

   return (
      <div id="body bg">
         <>
            {/* {state.loggedInUser !== null && state.loggedInUser.user.meta.transactionPin == '0000' && <>{history.push("/login")} </>} */}
            {/* {console.log(state)} */}
            <div
               style={{
                  position: "fixed",
                  // width: "100%",
                  height: "100%",
                  top: "0px",
                  left: "0px",
                  // zIndex: "10000",
                  background: " ",
               }}
            >
               <div
                  style={{
                     height: "",
                     //  background: "black",
                     padding: " ",
                     textAlign: "center",
                  }}
               >




                  <div
                     style={{
                        marginTop: "20px",
                        // width: "100%",
                        textAlign: " left",
                     }}
                  >

                     <div style={{ marginBottom: "50px", height: "130px", background: " ", position: "relative", width: "90%", padding: "0px 30px" }}>

                        <img src={Logo} style={{ width: "80px", float: "right" }} />


                        <div style={{ position: "absolute", top: "65px", fontSize: "" }} >
                           <b style={{ fontSize: "19px", color: "#073F74" }}>Verification</b> <br /> <br />
                           <small style={{ fontWeight: "700" }}>
                              Enter the code Sent to your phone
                           </small> <br />

                           <small>
                              We sent it to your number <b>+2348118633277</b>
                           </small>
                        </div>


                     </div>



                  </div>
                  <div
                     style={{ marginTop: "30px" }}
                  >
                     {pinVal()}
                     {verify()}
                     <div style={{ color: "black", marginTop: "10px" }}>
                        {error == false ? <>
                           <>Enter OTP</>
                        </> : <><small style={{ color: "crimson" }}>Wrong OTP</small></>}


                     </div>
                  </div>
                  <div
                     style={{
                        position: " ",
                        bottom: "30px",
                        width: "100%",
                        marginTop: "35px",
                     }}
                  >
                     {buttons()}
                  </div>
                  <div class=" " style={{ textAlign: "center", fontFamily: " ", marginTop: "10px" }}> 
                     <span>Didn't get OTP?  <b style={{ color: "#0a3d62" }}>Resend</b></span>{" "}
                  </div>
               </div>
            </div>

            <React.Fragment key="bottom">
               <Drawer
                  anchor="bottom"
                  open={drawerState["bottom"]}
                  onClose={toggleDrawer("bottom", false, false)}
               >
                  <div
                     style={{
                        height: " ",
                        //  background: "black",
                        padding: "10px",
                        textAlign: "center",
                     }}
                  >
                     <p style={{ fontWeight: "bold", margin: "10px" }}>
                        {" "}
                       Are you sure you want to exit BuzzPay?
                     </p>
                     {/* setDrawerState({ ...drawerState, bottom: true }); */}
                     <br />
                     <input
                        type="button"
                        value="NO"
                        style={{
                           padding: "5px",
                           outline: "none",
                           width: "80px",
                           border: "none",
                           background: "#0a3d62",
                           color: "white",
                           borderRadius: "6px",
                           margin: "10px 19px",
                        }}
                        onClick={toggleDrawer("bottom", false)}
                     />
                     <input
                        type="button"
                        value="YES"
                        style={{
                           padding: "5px",
                           outline: "none",
                           width: "80px",
                           border: "none",
                           background: "crimson",
                           color: "white",
                           borderRadius: "6px",
                           margin: "10px 19px",
                        }}
                        onClick={() => {
                           logout("HARD");
                           history.push("/login");
                        }}
                     />
                     <br />
                     <br />
                  </div>
               </Drawer>
            </React.Fragment>
         </>
      </div>
   );
}

const mapStateToProps = (state) => {
   return {
      appState: state.user,
   };
};

const mapDispatchToProps = (dispatch, encoded) => {
   return {

   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
