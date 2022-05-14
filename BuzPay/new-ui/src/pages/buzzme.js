import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { successAlert } from "../components/alert"

import {
   Backspace,
   KeyboardBackspace,
   LockOpenOutlined,
   Lock,
   // KeyboardBackspace,
   PeopleAltOutlined,
   PublicOutlined,
   CloseOutlined
} from "@material-ui/icons";
import Naira from "react-naira";
import Logo from "../statics/assets/logo.png"
import { FormControl, Drawer } from "@mui/material";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import { formatAMPM, daysOfTheWeek, monthsOfTheYear } from "../Utilities/index"
import { loader } from "../components/loader"
// import buzz me request controllers
import { verifyBeneficiaryController, initiateBuzzmeController } from "../controllers/buzzme/send"
import { initializeBuzzRequesrController } from "../controllers/buzzme/request"
import { userSessionService, } from '../services/auth'
import { fetchUsers } from '../services/users'
import { session, clearCounterController } from "../controllers/checksession"
import {
   login,
   disp_session,
   re_auth,
   disp_realtime,
   disp_noti
} from "../redux";
import { transactionListener } from "../controllers/realtime"

const rec_inputs = {
   width: "97%",
   padding: "8px",
   height: "70px",
   border: "0.5px solid lightgrey",
   color: "grey",
   outline: "none",
   fontSize: "13px",
   resize: "none",
   borderRadius: "5px"
};

const rec_inputs3 = {
   // margin: "5%",
   width: "96%",
   padding: "4px",
   border: "5px",
   height: "70px",
   border: "0.3px solid lightgrey",
   // backgroundColor: "#f4f6f7",
   color: "#4e7a97",
   outline: "none",
   fontSize: "13px",
   resize: "none",
   marginTop: "20px",
   borderRadius: "4px",
};

const rec_inputs2 = {
   margin: "3px 5%",
   width: "90%",
   padding: "4px 2px",
   border: "5px",
   // height: "630px",
   // borderBottom: "0.5px solid grey",
   // backgroundColor: "#f4f6f7",
   color: "#4e7a97",
   outline: "none",
   fontSize: "13px",
   resize: "none",
};

let modal_footer2_btn_holder = {
   // position: 'absolute',
   marginTop: "15px",
   marginBottom: "10px",
   // backgroundColor: '#f3f3f3',
   width: "100%",
   opacity: "70000",
};

let action_btn_success2 = {
   // background:"#1e272e",
   backgroundColor: "#2C3A47",
   // background:"#58B19F",
   padding: "10px 14px",
   marginLeft: "5%",
   color: "white",
   borderRadius: "3px",
   float: " ",
   border: "none",
   width: "90%",
};

function Home({
   appState,
   login_suc,
   realtime,
   reauth,
   dispNoti
}) {

   const [stage, setStage] = useState(null)

   const state = appState;
   const history = useHistory();
   const [desc, setDesc] = useState("");
   const [amount, setAmount] = useState(0);
   const [max, setMax] = useState("");
   const [pin, setPin] = useState("");
   const [pinError, setpinError] = useState("");
   const [compState, setStates] = useState("");
   const [beneficiary, setbeneficiary] = useState("");
   const [verifyError, setverifyError] = useState("");
   const [stateAlert, setStateAlert] = useState("");
   const [actionType, setActiontype] = useState(null); // set treu if action type is send else set false if action type is request
   const [maxDesc, setMaxDesc] = useState(false);
   // @==== RESET ALL STATE UON SUCCESS
   const sendToDefault = () => {
      setbeneficiary("");
      setActiontype(null);
      setPin("");
      setAmount(0);
      setDrawerState({ ...drawerState, bottom: false });
      setStates("")
   };
   let User = userSessionService().user.user_metadata
   const append = (e) => {
      //  let newPin = pin + "" + e;
      //   setPin(newPin);

      let newPin = amount + "" + e;
      setAmount(newPin);
      // if (newPin < state.loggedInUser.user.meta.wallet) {
      // }


      //  if (newPin > 9999) {
      //    setMax("Maximum amount reached");
      //  } else



      // if (newPin > state.loggedInUser.user.meta.wallet) {
      //   setMax("Insufficient wallet balance");
      // } else {
      //   setMax("");
      // }
   };

   const clear = (e) => {
      let pinLength = pin;
      let clearOne = pinLength - 1;
      setAmount(0);
      setMax("");
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

   const showAmount = () => {
      return (
         <>
            {" "}
            <b style={{ opacity: "1", color: "#0a3d62", fontSize: "35px" }}>
               <Naira>{amount}</Naira>
            </b>
         </>
      );
   };

   const pinVal = () => {
      if (pin.length == 1) {
         return (
            <>
               {" "}
               <b style={{ opacity: "1", color: "#0a3d62" }}>
                  <LockOpenOutlined />
               </b>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <span style={{ opacity: "0.4", color: "orange" }}>
                  <Lock />
               </span>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <span style={{ opacity: "0.4", color: "orange" }}>
                  <Lock />
               </span>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <span style={{ opacity: "0.4", color: "orange" }}>
                  <Lock />
               </span>
            </>
         );
      } else if (pin.length == 2) {
         return (
            <>
               {" "}
               <span style={{ opacity: "1", color: "#0a3d62" }}>
                  <LockOpenOutlined />
               </span>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <span style={{ opacity: "1", color: "#0a3d62" }}>
                  <LockOpenOutlined />
               </span>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <span style={{ opacity: "0.4", color: "orange" }}>
                  <Lock />
               </span>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <span style={{ opacity: "0.4", color: "orange" }}>
                  <Lock />
               </span>
            </>
         );
      } else if (pin.length == 3) {
         return (
            <>
               {" "}
               <span style={{ opacity: "1", color: "#0a3d62" }}>
                  <LockOpenOutlined />
               </span>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <span style={{ opacity: "1", color: "#0a3d62" }}>
                  <LockOpenOutlined />
               </span>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <span style={{ opacity: "1", color: "#0a3d62" }}>
                  <LockOpenOutlined />
               </span>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <span style={{ opacity: "0.4", color: "orange" }}>
                  <Lock />
               </span>
            </>
         );
      } else if (pin.length == 4) {
         return (
            <>
               {" "}
               <span style={{ opacity: "1", color: "#0a3d62" }}>
                  <LockOpenOutlined />
               </span>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <span style={{ opacity: "1", color: "#0a3d62" }}>
                  <LockOpenOutlined />
               </span>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <span style={{ opacity: "1", color: "#0a3d62" }}>
                  <LockOpenOutlined />
               </span>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <span style={{ opacity: "1", color: "#0a3d62" }}>
                  <LockOpenOutlined />
               </span>
            </>
         );
      } else {
         return (
            <>
               {" "}
               <span style={{ opacity: "0.4", color: "orange" }}>
                  <Lock />
               </span>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <span style={{ opacity: "0.4", color: "orange" }}>
                  <Lock />
               </span>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <span style={{ opacity: "0.4", color: "orange" }}>
                  <Lock />
               </span>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <span style={{ opacity: "0.4", color: "orange" }}>
                  <Lock />
               </span>
            </>
         );
      }
   };

   React.useEffect(() => {

      if (User == null) {
         // logOut()
         history.push("/login")
      } else if (state.userData == null) {
         history.push("/")
      } else {
         // reauth

         transactionListener(realtime, state.userData.buzzID, dispNoti)
         let filterOpt = [];
         fetchUsers(User.buzzID).then(res => {
            console.log(res)
            res.body.map((resp) => {
               let prepared = {
                  value: resp.buzzID,
                  // label: resp.fullname,
                  label: resp.buzzID,
                  email: resp.data.name,
                  phone: resp.phone,
                  id: resp.id,
               };
               filterOpt.push(prepared);
            });
            console.log(filterOpt);
            setStates({ ...compState, filterOption: filterOpt });
         })
            .catch(error => {
               console.log(error)
            })
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
      return (
         <>
            <b>Buzz me Alert</b> <br />

            <p>₦{separator(state.realtime[0].response.meta.data.amount)}  from {state.realtime[0].response.meta.sender.fullname}</p>
         </>
      )
   }



   const buttons = () => {
      let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "00", 0, "clear"];
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
                     if (e == "clear") {
                        clear(e);
                     } else if (e == "out") {
                        history.push("/");
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

   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // @============== REQUEST BUZZ
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================

   const [reason, setReason] = useState("");
   const [privacy, setPrivacy] = useState(1);
   const [sendTo, setSendTo] = useState("");
   const animatedComponents = makeAnimated();
   //   const loggedInUserSchool = state.loggedInUser.user.meta.school;
   //   const { fullname, email, phone, id } = state.loggedInUser.user;
   // const userId = state.loggedInUser.meta.user.id;

   const filterSchoolMates = (inputValue) => {
      return compState.filterOption.filter((i) =>
         i.value.toLowerCase().includes(inputValue.toLowerCase())
      );
   };

   const loadOptions = (inputValue, callback) => {
      setTimeout(() => {
         callback(filterSchoolMates(inputValue));
      }, 1000);
   };

   let handleInputChange = (newValue) => {
      const inputValue = newValue;
      setSendTo(inputValue);
   };

   const proceedAuthForRequest = () => {
      if (reason.length < 10) {
         setStates({
            ...compState,
            loader: false,
            alertMsg: "Please give a clear reason for your request",
         });
      } else if (privacy == 1 && sendTo.length < 1) {
         setStates({
            ...compState,
            loader: false,
            alertMsg: "Add who receives the request or change the request privacy",
         });
         document.getElementById("sendto").focus();
      } else {
         setStage('SENDBUZZ-3');
      }
   };

   //   ?@==========================
   const placeRequest = () => {
      let payload = {
         sendTo,
         reason,
         amount: parseInt(amount),
         from: {
            name: User.name,
            buzzID: User.buzzID,
            phone: User.phone,
         },
         date: {
            day: daysOfTheWeek(new Date),
            month: monthsOfTheYear(),
            year: new Date().getFullYear(),
            date: new Date().getDate(),
            time: formatAMPM(new Date())
         },
         setStates, compState,
         setStage,
         setDrawerState,
         drawerState,
         setPin
      };

      initializeBuzzRequesrController(payload)
   }

   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================

   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   //   ==================     BUZZ ME
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   const [beneficiaryData, setBeneficiaryData] = useState()
   let verifyBeneficiary = () => {
      let payload = {
         beneficiary,
         setverifyError,
         setStates, compState,
         setBeneficiaryData,
         setStage
      }

      verifyBeneficiaryController(payload)
   }

   const initiateTransaction = () => {
      let payload = {
         setStates, compState,
         amount,
         beneficiaryData, setBeneficiaryData,
         User,
         desc,
         setStage,
         setDrawerState,
         drawerState,
         date: {
            day: daysOfTheWeek(new Date),
            month: monthsOfTheYear(),
            year: new Date().getFullYear(),
            date: new Date().getDate(),
            time: formatAMPM(new Date())
         },
         setPin,
         login_suc
      }

      initiateBuzzmeController(payload)
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
         console.log(actionType)
         if (actionType == "REQUEST") {
            placeRequest();
         } else {
            initiateTransaction();
         }
      } else {
         setpinError("Incorrect pin");
         setPin("");
         console.log("Not same");
         window.navigator.vibrate([200]);
      }
      //  console.log(state.loggedInUser.user.meta.transactionPin)
      //  console.log(newPin)
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
                        setStage(null);
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


   let successPayload = {
      title: "SUCCESS",
      msg: compState.alertMsg,
      error: false,
   };

   let errorPayload = {
      title: "error",
      msg: compState.alertMsg,
      error: true,
   };

   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================
   // ============================================================================================

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
         {state.realtime.length > 0 && successAlert(clearRealtime, 'hello man', realtimeMsg)}
         {clearCounterController()}
         {session(history, reauth)}
         <>
            {/* {console.log(state)} */}
            {compState.loading == true && loader()}
            {stateAlert === true &&
               alert(successPayload, setStateAlert, sendToDefault)}
            {stateAlert === false && alert(errorPayload, setStateAlert)}
            {/* {pin == "validated" && <> {cashbackloader()}</>} */}
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
                     <b style={{ fontSize: "19px", color: "#0C1825" }}>BuzzMe</b>
                     <div>
                        <small> Send or receive Buzz in few steps </small>
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
                  <div
                     style={{
                        padding: "15px",
                        // background: "lightgray",
                        color: "white",
                        position: "absolute",
                        top: "21%",
                        width: "100%",
                        textAlign: "center",
                     }}
                  >
                     {showAmount()}
                     {/* {verify()} */}
                     <div style={{ color: "crimson" }}>{max}</div>
                  </div>
                  <div style={{ position: "absolute", top: "35%", width: "100%" }}>
                     {buttons()}
                     <br /> <br />
                     <div>
                        <input
                           onClick={() => {
                              if (amount < 100) {
                                 setMax("Minimum amount is NGN 100");
                              } else {
                                 if (amount > 20000) {
                                    setMax("Maximum amount to request is ₦20,000");
                                 }
                                 else {
                                    setMax("");
                                    setStage("RECEIVEBUZZ-1")
                                    setDrawerState({ ...drawerState, bottom: true });
                                    setverifyError('')
                                    setActiontype("REQUEST");
                                 }
                              }
                           }}
                           type="button"
                           value="REQUEST"
                           style={{
                              padding: "10px 17px",
                              outline: "none",
                              width: "100px",
                              border: "none",
                              background: "#0C1825",
                              color: "white",
                              borderRadius: "6px",
                              margin: "10px 19px",
                           }}
                        />
                        <input
                           type="button"
                           value="SEND"
                           style={{
                              padding: "10px 17px",
                              outline: "none",
                              width: "100px",
                              //   background: "crimson",
                              border: "0.5px solid #0C1825",
                              color: "#0C1825",
                              borderRadius: "6px",
                              margin: "10px 19px",
                              fontWeight: "bold",
                           }}
                           onClick={() => {
                              if (amount < 100) {
                                 setMax("Minimum amount is NGN 100");
                              } else {
                                 if (amount > 20000) {
                                    setMax("Maximum Buzz me amount is ₦20,000");
                                 }
                                 else if (amount > state.userData.wallet) {
                                    setMax("Insufficient wallet balance");
                                 }
                                 else {
                                    setMax("");
                                    setDrawerState({ ...drawerState, bottom: true });
                                    setActiontype("SEND");
                                    setverifyError('')
                                    setStage("SENDBUZZ-1")
                                 }
                              }
                           }}
                        />
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
                        height: " ",
                        //  background: "black",
                        padding: "10px",
                        textAlign: "center",
                     }}
                  >
                     <div
                        style={{
                           width: "",
                           //   marginLeft: "32.5%",
                           //   textAlign: "left",
                           background: " ",
                        }}
                     >
                        {stage === 'SENDBUZZ-1' && (
                           <>
                              {" "}
                              <span>Beneficiary Buzz ID</span> <br />
                              <input
                                 onChange={(e) => {
                                    setbeneficiary(e.target.value);
                                    setverifyError("");
                                 }}
                                 type="number"
                                 maxlength="10"
                                 autoFocus
                                 value={beneficiary}
                                 placeholder="* * * * * * * * 7 6"
                                 style={{
                                    padding: "10px 0px",
                                    border: "none",
                                    width: "50%",
                                    textAlign: " ",
                                    background: "",
                                    outline: "none",
                                    marginLeft: "25%",
                                 }}
                              />{" "}

                              <input
                                 onClick={() => {
                                    verifyBeneficiary();
                                 }}
                                 type="button"
                                 value="NEXT"
                                 style={{
                                    padding: "10px 16px",
                                    outline: "none",
                                    width: "100px",
                                    background: "#0C1825",
                                    border: "0.5px solid #0a3d62",
                                    color: "white",
                                    borderRadius: "6px",
                                    //   margin: "10px 19px",
                                    fontWeight: "bold",
                                    marginTop: "10px",
                                 }}
                              />
                           </>
                        )}

                        <div style={{ color: "crimson" }}>{verifyError}</div>

                        {stage === 'SENDBUZZ-2' &&
                           <div
                              style={{
                                 fontSize: " ",
                                 fontWeight: " ",
                                 textAlign: "left",
                                 width: " ",
                                 marginLeft: "",
                                 // background: "#efedc4",
                                 padding: " 10px",
                              }}
                           >
                              <p style={{ fontWeight: "bold", fontSize: "13px" }}>Confirm details</p>
                              <div
                                 style={{
                                    boxShadow: " 1px 1px 3px #888888",
                                    padding: "5px 10px",
                                    marginBottom: "30px"
                                 }}
                              >
                                 <spall style={{ fontSize: "11px" }}>
                                    You want to Buzz
                                 </spall>
                                 <div style={{ marginTop: "10px" }}>
                                    <b> {`${beneficiaryData.name}`}</b>
                                    <div style={{ marginBottom: "6px", marginTop: "-2px", fontSize: "11px", color: "grey" }}> <small>{`${beneficiaryData.buzzID}`}</small> </div>
                                 </div>
                                 <div style={{ fontWeight: "bold" }}>
                                    <Naira>{amount}</Naira>
                                 </div>
                                 {/* <br /> */}
                                 <textarea
                                    onChange={(e) => {
                                       if (desc.length < 100) {
                                          setMaxDesc(false);
                                          setDesc(e.target.value);
                                       } else {
                                          // setMaxDesc(true)
                                          if (
                                             e.nativeEvent.inputType ==
                                             "deleteContentBackward"
                                          ) {
                                             setDesc(e.target.value);
                                             setMaxDesc(false);
                                          } else {
                                             setMaxDesc(true);
                                          }
                                       }
                                    }}
                                    value={desc}
                                    style={rec_inputs3}
                                    placeholder="Description (optional)"
                                 ></textarea>
                                 {maxDesc === true && (
                                    <small style={{ color: "crimson" }}>
                                       maximum text limit
                                    </small>
                                 )}
                              </div>
                              <div style={{ textAlign: "center" }}>
                                 <input
                                    onClick={() => {
                                       sendToDefault()
                                    }}
                                    type="button"
                                    value="Cancel"
                                    style={{
                                       padding: "10px",
                                       outline: "none",
                                       width: "100px",
                                       background: "crimson",
                                       border: "0.5px solid crimson",
                                       color: "white",
                                       borderRadius: "6px",
                                       //   margin: "10px 19px",
                                       fontWeight: "bold",
                                       margin: "10px",
                                    }}
                                 />
                                 <input
                                    onClick={() => {
                                       setStage("SENDBUZZ-3")
                                    }}
                                    type="button"
                                    value="Continue"
                                    style={{
                                       padding: "10px",
                                       outline: "none",
                                       width: "100px",
                                       background: "#0C1825",
                                       border: "0.5px solid #0a3d62",
                                       color: "white",
                                       borderRadius: "6px",
                                       //   margin: "10px 19px",
                                       fontWeight: "bold",
                                       margin: "10px",
                                    }}
                                 />
                              </div>
                           </div>
                        }
                     </div>
                     <br />
                  </div>

                  {/* @============================================== */}
                  {/* @============================================== */}
                  {/* @============================================== */}
                  {/* @============================================== */}
                  {/* @============================================== */}
                  {/* @============================================== */}
                  {/* @============================================== */}
                  {/* @==================== BUZZ REQUEST FORMS ========================== */}
                  {/* @============================================== */}
                  {/* @============================================== */}
                  {/* @============================================== */}
                  {/* @============================================== */}
                  {/* @============================================== */}

                  {stage == "RECEIVEBUZZ-2" && (
                     <div
                        style={{
                           // fontSize: "20px",
                           fontWeight: "bold",
                           textAlign: " ",
                           width: " ",
                           // marginTop: "-90px",
                           background: "#efedc4",
                           padding: " 10px",
                        }}
                     >
                        <div
                           style={{
                              width: "60%",
                              marginLeft: "17%",
                              textALign: "left",
                              background: "blue",
                           }}
                        >
                           <Naira>{amount}</Naira>
                           <br />
                           <p style={{ fontSize: "14px", fontWeight: "lighter" }}>
                              {reason}
                           </p>
                           {/* <PeopleAltOutlined /> */}
                           <small style={{ fontWeight: "lighter", color: "gray" }}>
                              send to{" "}
                           </small>
                           <div style={{ fontSize: "12px" }}>
                              {actionType === false &&
                                 <>
                                    {typeof sendTo === "object" ? sendTo.map((e) => {
                                       return <> {e.label},</>;
                                    }) : "PUBLIC"}
                                 </>}
                           </div>
                        </div>
                     </div>
                  )}

                  {stage == "RECEIVEBUZZ-1" && (
                     <>
                        <div style={{ backgroundColor: " ", padding: "0px 20px" }}>
                           <textarea
                              cols="40"
                              rows="20"
                              onChange={(e) => {
                                 setReason(e.target.value);
                              }}
                              value={reason}
                              style={rec_inputs}
                              placeholder="Enter your request reason *"
                           ></textarea>{" "}
                           <br />
                           <FormControl
                              style={{
                                 margin: "5px 10px",
                                 marginBottom: "10px",
                                 background: "  ",
                                 borderBottom: "none",
                              }}
                              id="postArea1"
                              variant="standard"
                           >
                           </FormControl>
                           <br />
                           <span style={{ marginLeft: "20px", fontSize: "13px", marginTop: "-10px" }}>
                              Who are you requesting from? (Buzz ID)
                           </span> <br />
                           <FormControl
                              style={{
                                 margin: "0px 1px",
                                 marginBottom: "10px",
                                 width: "100%"
                              }}
                              id="postArea1"
                              variant="standard"
                           >
                              <AsyncSelect
                                 id="sendto"
                                 style={{
                                    padding: "20px"
                                 }}
                                 closeMenuOnSelect={false}
                                 components={animatedComponents}
                                 // defaultValue={[options[0], options[1]]}
                                 isMulti
                                 loadOptions={loadOptions}
                                 onChange={(e) => {
                                    handleInputChange(e);
                                 }}
                              />
                           </FormControl>
                           <div style={modal_footer2_btn_holder}>
                              <button
                                 onClick={(e) => {
                                    //   placeRequest(reason);
                                    console.log(sendTo);
                                    console.log(privacy);
                                    proceedAuthForRequest();
                                 }}
                                 style={{
                                    padding: "13px 16px",
                                    outline: "none",
                                    width: "100%",
                                    background: "#0C1825",
                                    border: "0.5px solid #0a3d62",
                                    color: "white",
                                    borderRadius: "6px",
                                    //   margin: "10px 19px",
                                    fontWeight: "bold",
                                    marginTop: "10px",
                                 }}
                              >
                                 Proceed to authenticate
                              </button>{" "}
                              <br />
                              <br />
                           </div>
                        </div>
                     </>
                  )}

                  {/* @============================================== */}
                  {/* @============================================== */}
                  {/* @============================================== */}
                  {/* @============================================== */}
                  {/* @============================================== */}
                  {/* @============================================== */}
                  {/* @============================================== */}
                  {/* @============================================== */}
                  {/* @============================================== */}
                  {/* @============================================== */}
                  {/* @============================================== */}
                  {/* @============================================== */}
                  {/* @============================================== */}
                  {/* @============================================== */}
                  {/* @============================================== */}
                  {/* @============================================== */}

                  {stage === 'SENDBUZZ-3' && (
                     <div
                        style={{
                           height: " 460px",
                           background: " ",
                           // padding: "10px",
                           textAlign: "center",
                        }}
                     >
                        <div>
                           <b>Authorize transaction </b>
                           <div><small>provide your pin</small></div>
                        </div>
                        <div
                           style={{
                              padding: "15px",
                              // background: "black",
                              color: "white",
                              //  marginBottom:"5px"
                              marginTop: "10px"
                           }}
                        >
                           {pinVal()}

                           <div
                              style={{
                                 color: "crimson",
                                 height: "30px",
                                 background: " ",
                                 padding: "5px",
                              }}
                           >

                           </div>
                        </div>
                        {authKeyboaard()}
                        <span style={{ color: "crimson" }}>{pinError}</span>
                     </div>
                  )}

                  {stage == 'REQUEST-SUCCESS' && <>
                     <center style={{ marginTop: "5%", marginBottom: "5%", background: "", width: "90%", marginLeft: "5%", padding: "20px 0px", borderRadius: "6px", height: "300px" }}>
                        {/* <CheckCircle style={{ fontSize: "80px",color:"white" }} /> */}
                        <img src={Logo} style={{ width: "100px", }} />

                        <div style={{ marginTop: "60px", width: "70%", textAlign: "center", background: " " }}>
                           <div style={{ color: "black", fontSize: "18px" }}>
                              <b style={{ color: "#0C1825" }}> Your Buzz me request of  ₦{parseInt(amount)} </b>
                              was sent successfully.
                           </div>

                           <button
                              style={{
                                 marginTop: "60px",
                                 border: "none",
                                 padding: "10px 20px",
                                 borderRadius: "5px",
                                 color: "white",
                                 background: "#0C1825"
                              }}
                              onClick={() => {
                                 setDrawerState({ ...drawerState, bottom: false });
                                 setStage(null)
                              }}>
                              <b>OK</b>
                           </button>
                        </div>
                     </center>
                  </>}

                  {stage == 'SENDBUZZ-SUCCESS' && <>
                     <center style={{ marginTop: "5%", marginBottom: "5%", background: "", width: "90%", marginLeft: "5%", padding: "20px 0px", borderRadius: "6px", height: "300px" }}>
                        {/* <CheckCircle style={{ fontSize: "80px",color:"white" }} /> */}
                        <img src={Logo} style={{ width: "100px", }} />

                        <div style={{ marginTop: "60px", width: "70%", textAlign: "center" }}>
                           <div style={{ color: "black", fontSize: "18px" }}>
                              <b style={{ color: "#0C1825" }}> ₦{parseInt(amount)} </b>
                              sent successfully to   <br />

                              <b style={{ color: "#0C1825" }}> {beneficiaryData.name}</b>
                           </div>

                           <button
                              style={{
                                 marginTop: "60px",
                                 border: "none",
                                 padding: "10px 20px",
                                 borderRadius: "5px",
                                 color: "white",
                                 background: "#0C1825"
                              }}
                              onClick={() => {
                                 setDrawerState({ ...drawerState, bottom: false });
                                 setStage(null)
                              }}>
                              <b>OK</b>
                           </button>
                        </div>
                     </center>
                  </>}

                  {stage == 'SENDBUZZ-ERROR' && <>
                     <center style={{ marginTop: "5%", marginBottom: "5%", background: "", width: "90%", marginLeft: "5%", padding: "5px 0px", borderRadius: "6px", height: "300px" }}>
                        {/* <CheckCircle style={{ fontSize: "80px",color:"white" }} /> */}
                        <img src={Logo} style={{ width: "100px", }} />

                        <div style={{ marginTop: "30px", width: "70%", textAlign: "center", background: "", padding: "15px", borderRadius: "5px" }}>
                           <div style={{ color: "black", fontSize: "18px" }}>
                              <b style={{ color: "crimson" }}> Network error</b> <br />
                              <small style={{ fontSize: "12px", color: "red" }}>Make sure you are connected to the internet</small>
                           </div>

                           <button
                              style={{
                                 marginTop: "30px",
                                 border: "none",
                                 padding: "10px 20px",
                                 borderRadius: "5px",
                                 color: "white",
                                 background: "crimson"
                              }}
                              onClick={() => {
                                 setDrawerState({ ...drawerState, bottom: false });
                                 setStage(null)
                              }}>
                              <b>OK</b>
                           </button>
                        </div>
                     </center>
                  </>}

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

   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
