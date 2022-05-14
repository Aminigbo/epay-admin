import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { successAlert } from "../../components/alert"
import "../../statics/style.css"
import {
   Backspace,
   KeyboardBackspace,
} from "@material-ui/icons";
import { cashbackchargecentage, buzzPayChargeOnKashbak, cashbackRegEx, formatAMPM, daysOfTheWeek, monthsOfTheYear } from "../../Utilities/index"
import Logo from "../../statics/assets/logo.png"
import Card from "../../statics/assets/card.png"
import Cardlogo from "../../statics/assets/cardlogo.png"
import { Drawer } from "@mui/material";
import { userSessionService, } from '../../services/auth'
import { session, clearCounterController } from "../../controllers/checksession"
import {
   login,
   re_auth,
   disp_realtime,
   disp_noti,
   allKashback
} from "../../redux";
import { transactionListener } from "../../controllers/realtime"
import { createKashbackController } from "../../controllers/kashback"



function Home({
   appState,
   login_suc,
   realtime,
   reauth,
   dispNoti,
   dispAllKashbacks
}) {

   var QRCode = require("qrcode.react");

   const [status, setstatus] = useState(null)
   const [tokendata, settokendata] = useState()
   const state = appState;
   const history = useHistory();
   const [amount, setamount] = useState("");
   const [compState, setStates] = useState("");
   const [pin, setPin] = useState("");
   const [pinError, setpinError] = useState("");
   let User = userSessionService().user.user_metadata

   React.useEffect(() => {
      transactionListener(realtime, state.userData.buzzID, dispNoti)

   }, []);

   function separator(numb) {
      var str = numb.toString().split(".");
      str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return str.join(".");
   }

   // 👇️ Get last 2 digits of current year
   const last2 = new Date().getFullYear().toString().slice(-2);
   const year = Number(last2);


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


   const appendPin = (e) => {
      setpinError("")
      let newPin = pin + e;
      if (pin.length !== 4) {
         setPin(newPin);
      }
      if (newPin.length == 4) {
         verify(newPin);
      }
      //  console.log(newPin)
   };

   const clearPin = (e) => {
      let pinLength = pin.length;
      let clearOne = pinLength - 1;
      setPin(pin.substring(0, clearOne));
   };

   const verify = (newPin) => {
      if (newPin == User.transactionPin) {
         setDrawerState({ ...drawerState, bottom: false });
         setStates({
            ...compState,
            loading: true
         })

         // percentage plus charge  (To be deducted from the user's account)
         const amountPlusCharge = parseInt(amount) + parseInt(cashbackchargecentage(amount))

         // admin takes
         const adminTakes = parseInt(buzzPayChargeOnKashbak(amount))

         const payload = {
            amount: parseInt(amount),
            amountPlusCharge,
            adminTakes,
            User: state.userData,
            compState, setStates,
            status, setstatus,
            charge: parseInt(cashbackchargecentage(amount)),
            cashbackRegEx,
            login_suc, settokendata,
            date: {
               day: daysOfTheWeek(new Date),
               month: monthsOfTheYear(),
               year: new Date().getFullYear(),
               date: new Date().getDate(),
               time: formatAMPM(new Date())
            },
            dispAllKashbacks,
            state
         }

         createKashbackController(payload)

         // proceed create
         setPin("");
      } else {
         setpinError("Incorrect pin");
         setPin("");
         console.log("Not same");
         window.navigator.vibrate([200]);
      }
      //  console.log(state.loggedInUser.user.meta.transactionPin)
      //  console.log(newPin)
   };


   const buttonValue = (e) => {
      if (e == "clear") {
         return <Backspace />;
      } else if (e == "out") {
         return <KeyboardBackspace />;
      } else {
         return <>{e}</>;
      }
   };

   //   AUTHENTICATION KEYBOARD
   const authKeyboaard = () => {
      let pinNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'out', 0, "clear"];
      return pinNumbers.map((e) => {
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
                     margin: "15px 20px",
                     fontSize: "20px",
                     textAlign: "center",
                     borderRadius: "5px",
                  }}
                  value={e}
                  onClick={() => {
                     if (e == "clear") {
                        clearPin(e);
                     } else if (e == "out") {
                        setDrawerState({ ...drawerState, bottom: false });
                     } else {
                        appendPin(e);
                     }
                  }}
               >
                  {buttonValue(e)}
               </button>
            </>
         );
      });
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

   const [drawerState, setDrawerState] = React.useState({
      bottom: false,
   });

   const toggleDrawer = (anchor, open, post) => (event) => {
      setamount("")
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
            {/* {compState.loading == true && loader()} */}
            <div
               style={{
                  position: "fixed",
                  width: "100%",
                  height: "100%",
                  top: "30px",
                  left: "0px",
                  // zIndex: "10000",
                  background: "",
               }}
            >
               <div style={{ marginBottom: "60px", height: "30px", background: " ", padding: "0px 15px" }}>
                  <KeyboardBackspace onClick={() => {
                     history.goBack()
                  }} style={{ float: "left", fontSize: "30px" }} />
                  <img src={Logo} style={{ width: "80px", float: "right" }} />
                  <div style={{ position: "absolute", top: "65px", fontSize: "" }} >
                     <b style={{ fontSize: "19px", color: "#0C1825" }}>Kashback</b>
                     <div>
                        <small> Enter amount of kashback to generate </small>
                     </div>
                  </div>
               </div>


               <div
                  style={{
                     height: "",
                     // background: "black",
                     padding: " ",
                     textAlign: "center",
                  }}
               >
                  <div style={{
                     color: "white",
                     position: "relative",
                     top: "30px",
                     width: "94%",
                     left: "3%",
                     height: "170px",
                  }}>
                     <img src={Card} style={{
                        color: "white",
                        position: "absolute",
                        top: "0%",
                        width: "100%",
                        top: "0px",
                        left: "0%",
                        height: "100%",
                     }} />
                     <img src={Cardlogo} style={{ width: "90px", position: "absolute", left: "20px", top: "5px" }} />

                     {compState.loading == true ?
                        <div
                           style={{
                              position: "absolute", left: "15%", bottom: "40%", color: "white", width: "70%",
                              border: "none", background: "none",
                              letterSpacing: "10px", textAlign: "center", outline: "none", padding: "9px 4px"
                           }}>
                           Generating....
                        </div>
                        :
                        <>
                           {status == true ?
                              <div
                                 style={{
                                    position: "absolute", left: "15%", bottom: "38%", color: "gold", width: "70%",
                                    border: "none", background: "none",
                                    letterSpacing: "25px", textAlign: "center", outline: "none", padding: "9px 4px", fontSize: "25px"
                                 }}>
                                 {tokendata && tokendata}
                              </div> :
                              <input
                                 onChange={(e) => {
                                    setamount(e.target.value)
                                 }}
                                 value={amount}
                                 style={{ position: "absolute", left: "15%", bottom: "40%", color: "white", width: "70%", border: "none", borderBottom: "1px solid white", background: "none", letterSpacing: "32px", textAlign: "center", outline: "none", padding: "9px 4px" }} placeholder="AMOUNT " type="number" name="fname" autoFocus />}</>
                     }
                     <span style={{ width: "", position: "absolute", left: "20px", bottom: "15px" }} >{User.name}</span>
                     <span style={{ width: "", position: "absolute", right: "20px", bottom: "15px" }} >{new Date().getDate()}/{new Date().getMonth() + 1}/{year}</span>
                     {compState.loading == true ? <div className="loader" style={{ position: "absolute", right: "20px", top: "15px", color: "white" }} >

                     </div> : <>
                        <b style={{ width: "", position: "absolute", right: "20px", top: "5px", fontSize: "20px" }} >₦{separator(amount)}</b>

                     </>}
                  </div>

                  {status == true && <div style={{
                     color: "white",
                     position: "relative",
                     top: "50px",
                     width: "94%",
                     left: "3%",
                     height: "170px",
                  }}>
                     <img src={Card} style={{
                        color: "white",
                        position: "absolute",
                        top: "0%",
                        width: "100%",
                        top: "0px",
                        left: "0%",
                        height: "100%",
                     }} />
                     <img src={Cardlogo} style={{ width: "90px", position: "absolute", left: "20px", top: "5px" }} />

                     {compState.loading == false &&
                        <>
                           {status == true ?
                              <div
                                 style={{
                                    position: "absolute", left: "10%", bottom: "4%", color: "gold", width: "80%",
                                    border: "none", background: "none",
                                    letterSpacing: "25px", textAlign: "center", outline: "none", padding: "9px 4px", fontSize: "25px"
                                 }}>
                                 {tokendata && <>  <QRCode style={{marginLeft:"80px",width:"150px"}} value={tokendata.toString()} /></>}
                              </div> :
                              <input
                                 onChange={(e) => {
                                    setamount(e.target.value)
                                 }}
                                 value={amount}
                                 style={{ position: "absolute", left: "15%", bottom: "40%", color: "white", width: "70%", border: "none", borderBottom: "1px solid white", background: "none", letterSpacing: "32px", textAlign: "center", outline: "none", padding: "9px 4px" }} placeholder="AMOUNT " type="number" name="fname" autoFocus />}</>
                     }
                  </div>}



                  <div style={{ textAlign: "center", marginTop: " 45px", width: "100%" }}>
                     <div>
                        {amount < 500 ? <small style={{ color: "crimson" }}>Minimum amount is ₦500</small> : <>
                           {amount > parseInt(state.userData.wallet) ? <small style={{ color: "crimson" }}>You have insufficient fund</small> :
                              <>

                                 {status == true ?
                                    <>
                                      
                                    </> :
                                    <input
                                       type="button"
                                       value="Create Kashback"
                                       style={{
                                          background: "#0C1825",
                                          color: "white",
                                          opacity: compState.loading == true ? 0 : 1,
                                          border: "none",
                                          outline: "none",
                                          padding: "7px 50px",
                                          marginTop: "5px",
                                          marginLeft: "3%",
                                          borderRadius: "6px",
                                          // width: "100px",
                                          height: "42px"
                                       }}
                                       onClick={() => {
                                          setDrawerState({ ...drawerState, bottom: true });
                                          //  console.log(new Date().getTime())
                                       }}
                                    />}

                              </>}
                        </>}
                     </div>
                  </div>
               </div>
            </div>
            {/* {console.log(actionType)}
            {console.log(proceedSend)} */}
            {/* {finallySend === true && <>{initiateTransaction()}</>} */}

            <React.Fragment key="bottom">
               <Drawer
                  anchor="bottom"
                  open={drawerState["bottom"]}
                  onClose={toggleDrawer("bottom", false, false)}
               >
                  <div
                     style={{
                        // height: " 460px",
                        background: " ",
                        // padding: "10px",
                        textAlign: "center",
                     }}
                  >

                     <div style={{
                        color: "white",
                        position: "relative",
                        top: "5px",
                        width: "94%",
                        left: "3%",
                        height: "160px",
                        background: "rgb(254,239,239)"
                     }}>
                        {/* <img src={Card} style={{
                           color: "white",
                           position: "absolute",
                           top: "0%",
                           width: "100%",
                           top: "0px",
                           left: "0%",
                           height: "100%",
                        }} /> */}
                        {/* <img src={Cardlogo} style={{ width: "90px", position: "absolute", left: "20px", top: "5px" }} /> */}
                        <div
                           onChange={(e) => {
                              setamount(e.target.value)
                           }}
                           value={amount}
                           style={{
                              position: "absolute", left: "5%", bottom: "10%", color: "crimson", width: "90%",
                              border: "none", borderBottom: "1px solid crimson", background: "none", letterSpacing: "",
                              textAlign: "left", outline: "none", padding: "9px 4px"
                           }} placeholder="AMOUNT " type="number" name="fname" autoFocus >
                           You will be charged ₦{separator(80)} as service fee. <br /> <br />

                           <b>Enter pin to authorize this transaction.</b>
                        </div>
                        <b style={{ width: "", position: "absolute", left: "20px", top: "5px", fontSize: "20px", color: "#0C1825" }} >₦{separator(amount)}</b>
                        <small style={{ width: "", position: "absolute", right: "20px", top: "5px", color: "#0C1825" }} >{new Date().getDate()}/{new Date().getMonth() + 1}/{year}</small>
                     </div>

                     <div style={{ marginTop: "10px", marginBottom: " " }}>

                        <div
                           style={{
                              padding: "15px",
                              // background: "black",
                              color: "white",
                              //  marginBottom:"5px"
                              marginTop: "5px"
                           }}
                        >
                           {pinVal()}


                        </div>
                        {authKeyboaard()}
                        <span style={{ color: "crimson" }}>{pinError}</span>
                     </div>
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
      realtime: (data) => dispatch(disp_realtime(data)),
      dispNoti: (payload) => dispatch(disp_noti(payload)),
      login_suc: (data) => dispatch(login(data)),
      reauth: () => dispatch(re_auth()),
      dispAllKashbacks: (payload) => dispatch(allKashback(payload)),

   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
