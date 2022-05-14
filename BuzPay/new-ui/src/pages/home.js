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
import { clearCounterController } from "../controllers/checksession"
import { KeyboardBackspace } from "@material-ui/icons";
import { reAuthControler } from "../controllers/auth"

import {
   login,
   logOut,
   allKashback,
   transactions
} from "../redux";



import { getUserController } from "../services/auth"
function Home({ appState, log_out, log_In, dispAllKashbacks, disp_transactions }) {
   const state = appState;
   const history = useHistory();
   const [pin, setPin] = useState("");
   const [first, setfirst] = useState(null)
   const [error, seterror] = useState(false)
   const [compState, setStates] = useState("")
   var User = null
   if (getUserController() === null) {
      log_out()
      history.push("/login")
   } else {
      User = getUserController().user_metadata;
      // User = "Aminigbo Paul";
   }






   const verify = () => {
      console.log(pin)
      if (pin.length == 4) {
         if (User.transactionPin == pin) {
            if (state.loggedIn == false) {
               setStates({
                  ...compState,
                  loading: true
               })
               const payload = {
                  user: User.buzzID, dispAllKashbacks, disp_transactions, log_In,
                  setStates, compState, setPin
               }
               reAuthControler(payload)
            } else {
               let userData = state.userData
               log_In(userData)

            }
         } else {
            window.navigator.vibrate([200]);
            seterror(true)
            setfirst(null)
            setPin("");
         }
      }
   };
   const append = (e) => {
      let newPin = pin + e;
      if (pin.length !== 4) {
         setPin(newPin);
      }
      if (pin.length > 2) {
         verify();
         console.log(pin.length)
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
               <div style={{ height: "45px", width: "50px", background: "#0C1825", borderRadius: "8px", display: "inline-block" }}></div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "lightgrey", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "lightgrey", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "lightgrey", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
            </>
         );
      } else if (pin.length == 2) {
         return (
            <>
               <div style={{ height: "45px", width: "50px", background: "#0C1825", borderRadius: "8px", display: "inline-block" }}></div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "#0C1825", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "lightgrey", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "lightgrey", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
            </>
         );
      } else if (pin.length == 3) {
         return (
            <>
               <div style={{ height: "45px", width: "50px", background: "#0C1825", borderRadius: "8px", display: "inline-block" }}></div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "#0C1825", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "#0C1825", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "lightgrey", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
            </>
         );
      } else if (pin.length == 4) {
         return (
            <>
               <div style={{ height: "45px", width: "50px", background: "#0C1825", borderRadius: "8px", display: "inline-block" }}></div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "#0C1825", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "#0C1825", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
               <div style={{ height: "45px", width: "50px", background: "#0C1825", borderRadius: "8px", display: "inline-block" }}> </div> &nbsp; &nbsp;
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
            {state.authenticated === true && history.push('/dashboard')}
            {clearCounterController()}
            {pin.length == 4 && verify()}
            {console.log(state)}
            {compState.loading == true && loader()}
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
                           <b style={{ fontSize: "19px", color: "#0C1825" }}>Welcome back, {User !== null && <>{User.name.split(" ")[0]}</>}!</b>
                           <div>
                              <small> Enter your pin to re-authenticate </small>
                           </div>
                        </div>


                     </div>



                  </div>
                  <div
                     style={{ marginTop: "30px" }}
                  >
                     {pinVal()}
                     {/* {verify()} */}

                  </div>
                  <div
                     style={{
                        position: " ",
                        bottom: "30px",
                        width: "100%",
                        marginTop: "55px",
                     }}
                  >
                     {buttons()}
                  </div>

                  <div style={{ color: "black", marginTop: "10px" }}>
                     {error == true && <><small style={{ color: "crimson" }}>Wrong authentication pin</small></>}


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
                           log_out();
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
      log_In: (data) => dispatch(login(data)),
      log_out: () => dispatch(logOut()),
      dispAllKashbacks: (payload) => dispatch(allKashback(payload)),
      disp_transactions: (payload) => dispatch(transactions(payload)),

   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
