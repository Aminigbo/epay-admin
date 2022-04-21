import React, { useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";
import { cashbackCurrency } from "../components/currency";
import Header from "../components/includes/mobile_header.js";
import QrReader from "react-qr-reader";
import Desktopleft from "../components/includes/desktopleft";
import Desktopright from "../components/includes/desktopright";
import { add_wallet, logOut, loginSuc } from "../redux";
import Create from "../components/cashbacknav";
import { cashbackloader } from "../components/loading";
import { btn_primary, btn_danger } from "../components/buttons";
import { text_input } from "../components/forms";
import { confirmPinLockScreen } from "./confirmPinLockScreen";
import { confirmCashbackCreation } from "../functions/workers_functions/cashback"; // CASHBACK CONTROLLER

import {
  handleChashbackGeneration,
  handleVerifyToken,
  settleCashbackToWallet,
  handleScanToPayVerifyVendor,
  scanToPayVendors,
} from "../functions/controllers/cashback"; // CASHBACK TOKEN CONTROLLER
import { errorComponent, successComponent } from "../components/error"; // error component for error handling
import { ImQrcode } from "react-icons/im";
import { MdClear } from "react-icons/md";
import { Drawer, Divider } from "@mui/material";
import { MdGridGoldenratio } from "react-icons/md";
import { cashbackchargecentage } from "../functions/utils/index";

import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import EditIcon from "@mui/icons-material/Edit";

function Home({ appState, login_suc, logout }) {
  let history = useHistory();
  var QRCode = require("qrcode.react");
  const [auth, setAuth] = React.useState(false);

  const state = appState;
  const [value, setValue] = useState(null); //TOKEN TO BE VERIFIED
  const [drawerState, setDrawerState] = React.useState({
    bottom: false,
  });

  // make payment by scanning drawer
  const [paymentdrawerState, setpaymentdrawerState] = React.useState({
    bottom: false,
  });

  const [drawerState2, setDrawerState2] = React.useState({
    bottom: false,
  });
  const [drawerState3, setDrawerState3] = React.useState({
    bottom: false,
  });

  const [drawerState4, setDrawerState4] = React.useState({
    bottom: false,
  });

  const [tokenamount, setTokenamount] = useState(""); // amount to be generated
  const [initiateCreate, setInitiateCreate] = useState(false); // show the confirm or cancel popup when click initiate
  const [generatedcode, setGeneratedcode] = useState(null); // return true or false if code is generated
  const [generatedToken, setGeneratedToken] = useState(null); // set the returned generated token
  const [pin, setPin] = useState("");
  const [pinError, setpinError] = useState("");

  const toggleDrawer = (anchor, open, post) => (event) => {
    // console.log("okk");
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });

    setDrawerState2({ ...drawerState2, bottom: false });
    setDrawerState3({ ...drawerState3, bottom: false });
    setDrawerState4({ ...drawerState4, bottom: false });
  };

  // toggle drawer to scan and make payment
  const toggleScanToPayDrawer = (anchor, open, post) => (event) => {
    // console.log("okk");
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      // return;
    }

    setpaymentdrawerState({ ...paymentdrawerState, [anchor]: open });

    setDrawerState({ ...drawerState, [anchor]: open });
    setDrawerState2({ ...drawerState2, bottom: false });
    setDrawerState3({ ...drawerState3, bottom: false });
    setDrawerState4({ ...drawerState4, bottom: false });
  };

  // @======== CREATE TOKEN INTERFACE
  const createCashback = () => {
    return (
      <>
        <div
          className=" "
          style={{
            marginTop: "5px",
            width: "100%",
            background: " ",
            marginLeft: "0%",
            borderRadius: "30px 30px 0px 0px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            {generatedcode !== false && (
              <>
                <b>
                  TOKEN GENERATED{" "}
                  <b style={{ color: "#0a3d62", fontSize: "20px" }}>
                    {generatedToken}
                  </b>
                </b>
                <div>
                  <small>
                    QR code contains your cashback token. <br /> It is also
                    saved in your cashback history.
                  </small>
                </div>
              </>
            )}
          </div>
          <div
            style={{
              // height: "100px",
              marginBottom: "10px",
              // marginTop: "5px",
            }}
          >
            <div className=" ">
              <div
                style={{
                  // marginTop: "10px",
                  textAlign: "center",
                }}
              >
                {generatedcode !== true && (
                  <>
                    <div
                      style={{
                        width: "50%",
                        // display: "inline-block",
                        float: " ",
                        marginLeft: "25%",
                        textAlign: "center",
                      }}
                    >
                      {text_input(
                        "Cashback amount ",
                        tokenamount,
                        "number",
                        setTokenamount
                      )}
                    </div>
                    <div
                      style={{
                        marginTop: "10px",
                        textAlign: " ",
                        fontSize: "12px",
                      }}
                    >
                      {tokenamount.length > 0 && (
                        <>
                          {" "}
                          <b>
                            {" "}
                            NGN{" "}
                            {parseInt(tokenamount) +
                              cashbackchargecentage(tokenamount)}{" "}
                          </b>{" "}
                        </>
                      )}
                    </div>
                    <br />
                    <div style={{ float: "  ", textAlign: " " }}>
                      <span
                        onClick={() => {
                          handleGeneratecashback();
                        }}
                      >
                        {btn_primary("Continue", closeDrawer)}
                      </span>
                    </div>{" "}
                    <br />{" "}
                  </>
                )}
                {/* @======== SHOW THE CASH BACK CURRENCY WITH THE GENERATED CODE */}
                {generatedcode === true && (
                  <>
                    <div style={{ textAlign: "center", margin: "10px 2px" }}>
                      <QRCode value={generatedToken} />
                      <div style={{ marginTop: "5px" }}>
                        <b style={{ fontSize: "16px", color: "#0a3d62" }}>
                          {/* {generatedToken}{" "} */}
                          SCAN
                        </b>{" "}
                        <br /> <small>or accept pin</small> <br />
                        <b style={{ color: "#0a3d62", fontSize: "20px" }}>
                          {generatedToken}
                        </b>
                      </div>
                    </div>
                  </>
                )}

                {generatedcode !== true && (
                  <>
                    {" "}
                    <div style={{ marginTop: " ", textAlign: " " }}>
                      <i style={{ fontSize: "12px", color: "black" }}>
                        {" "}
                        {/* You agree to our Cashback terms of service and policies */}
                      </i>
                    </div>{" "}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // @======== GET AMOUNT TO BE DEDUCTED
  const amountPlusCharge =
    parseInt(tokenamount) + cashbackchargecentage(tokenamount);
  let extraCharge = amountPlusCharge - tokenamount;
  let adminPercentage = (35 * extraCharge) / 100;

  let userTakes = amountPlusCharge - adminPercentage;
  let userWallet = "";
  if (state.loggedIn === true) {
    userWallet = state.loggedInUser.user.meta.wallet;
  }

  // @======== CLOSE CREATE CONFIRM POP
  const closecreatepop = () => {
    setInitiateCreate(false);
    setGeneratedcode(false);
    // setDrawerState({ ...drawerState, bottom: false });
  };

  // @======== USER ACCEPTS TO CREATE  THE CASHBACK

  const finallyGenerateCashbackCode = () => {
    let payload = {
      user: state.loggedInUser.user,
      amount: tokenamount,
      amountPlusCharge,
    };
    // console.log(pin);
    setInitiateCreate(false);
    handleChashbackGeneration(
      setInitiateCreate,
      setGeneratedcode,
      setGeneratedToken,
      payload,
      login_suc,
      state,
      compState,
      setStates,
      setPin
    );

    // setInitiateCreate(false);
    // setGeneratedcode(true);
  };

  const closeDrawer = () => {
    toggleDrawer("bottom", false);
  };
  // @======== INITATE THE  TOKEN GENERATION
  const handleGeneratecashback = () => {
    if (!tokenamount || tokenamount.length < 1 || tokenamount < 100) {
      setStates({
        ...compState,
        error: true,
        errorMsg: "Please provide a valid amount greater than NGN 100.00",
      });
      window.navigator.vibrate([200]);
      setDrawerState2({ ...drawerState2, bottom: false });
    } else if (amountPlusCharge > userWallet) {
      console.log(amountPlusCharge);
      setStates({
        ...compState,
        error: true,
        errorMsg: "",
      });
      window.navigator.vibrate([200]);
      setDrawerState2({ ...drawerState2, bottom: false });
    } else if (tokenamount > 10000) {
      setStates({
        ...compState,
        error: true,
        errorMsg:
          "Only verified vendors can generate cashback above NGN 10,000.00",
      });
      window.navigator.vibrate([200]);
      setDrawerState2({ ...drawerState2, bottom: false });
    } else {
      setDrawerState2({ ...drawerState2, bottom: false });
      setDrawerState3({ ...drawerState3, bottom: true });
      setAuth(true);
    }
  };

  // create token drawer
  const toggleDrawer2 = (anchor, open, post) => (event) => {
    // console.log("okk");
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, bottom: false });
    setDrawerState3({ ...drawerState3, bottom: false });
    setDrawerState4({ ...drawerState4, bottom: false });

    setDrawerState2({ ...drawerState2, [anchor]: open });

    setcashbackpinresolved(false);
    setGeneratedcode(false);
    setStates({
      ...compState,
      copy: false,
    });
  };

  const toggleDrawer3 = (anchor, open, post) => (event) => {
    // console.log("okk");
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState3({ ...drawerState3, [anchor]: open });

    setDrawerState({ ...drawerState, bottom: false });
    setDrawerState2({ ...drawerState2, bottom: false });

    setcashbackpinresolved(false);
    setGeneratedcode(false);
  };

  const [compState, setStates] = useState({
    data: [],
    value: "",
    done: false,
    miniLoad: false,
  });
  const [verifyPayload, setVerifypayload] = useState({
    data: null,
    success: null,
  });
  const [cashbackpinresolved, setcashbackpinresolved] = useState(false); // state to control resolving cashback
  const [resolved, setResolved] = useState(null); // return true if the cashback has been resolved to the

  React.useEffect(() => {
    window.scrollTo(0, 0);
    setStates({
      ...compState,
      loading: false,
      resolved: false,
    });
  }, []);
  const cancelCashback = () => {
    setcashbackpinresolved(false);
    setValue(null);
    setStates({
      ...compState,
      resolved: false,
    });
  };

  // state to handle if vendor is verified or not
  const [vendorVerified, setVendorVerified] = useState({
    verified: false,
    proceedToAuth: false,
    error: "",
  });

  // get amount to pay to vendor when scanned
  const [amountAfterScan, setAmountAfterScan] = useState("");
  const [amountError, setAmountError] = useState("");

  // enter amount, click continue and allow vendor to authenticate
  const allowVendorToAuth = () => {
    let userWallet = state.loggedInUser.user.meta.wallet;

    if (amountAfterScan > userWallet) {
      setAmountError("Insuficient wallet balance");
    } else {
      setVendorVerified({
        ...vendorVerified,
        proceedToAuth: true,
        setVendorVerified: "",
      });
    }
  };

  const cancelVendorSearch = () => {
    setVendorVerified({
      verified: false,
      proceedToAuth: false,
    });
    setpaymentdrawerState({ ...paymentdrawerState, bottom: false });
  };

  //scan vendor''s code to retrieve their details
  const trigerScanPaymentVerify = (vendor) => {
    let customer = state.loggedIn.user;
    handleScanToPayVerifyVendor(
      vendor,
      compState,
      setStates,
      setVendorVerified,
      vendorVerified,
      logout
    );
  };

  const [vendorPin, setVendorPin] = useState("");
  // initiate mayment when vendors authenticate scanToPayVendors
  const initiateVendorScanToPay = () => {
    let vendor = vendorVerified.data[0];

    if (vendor.meta.transactionPin !== vendorPin) {
      setAmountError("Invalid PIN");
      console.log(vendor.meta.transactionPin);
      console.log(vendorPin);
    } else {
      setVendorVerified({
        //close the vendor scan windoe
        verified: false,
        proceedToAuth: false,
      });
      setDrawerState4({ ...drawerState4, bottom: false });
      setpaymentdrawerState({ ...paymentdrawerState, bottom: false });
      let customer = state.loggedInUser;
      scanToPayVendors(
        vendor,
        customer,
        amountAfterScan,
        setResolved,
        compState,
        setStates,
        login_suc,
        setDrawerState4,
        drawerState4,
        setVendorVerified,
        setpaymentdrawerState,
        paymentdrawerState
      );
    }
  };

  const trigerVerify = (value) => {
    handleVerifyToken(
      value,
      compState,
      setStates,
      setVerifypayload,
      verifyPayload,
      setcashbackpinresolved,
      setDrawerState,
  drawerState, setDrawerState4,
  drawerState4
    );
  };

  const confirmCashback = () => {
    settleCashbackToWallet(
      verifyPayload,
      setcashbackpinresolved,
      setValue,
      state.loggedInUser,
      compState,
      setStates,
      login_suc,
      setResolved
    );
    setDrawerState({ ...drawerState, bottom: false });
  };

  const clearError = () => {
    setStates({
      ...compState,
      error: false,
      errorMsg: "",
    });
  };

  // Handle scan for making payment
  const handlePaymentScan = (data) => {
    if (data) {
      setStates({
        result: data,
        loading: true,
        resolved: true,
      });
      trigerScanPaymentVerify(data);
    }
  };

  const handleScan = (data) => {
    if (data) {
      setStates({
        result: data,
        loading: true,
        resolved: true,
      });
      trigerVerify(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  // @======== close success pop
  const closeSuccessPop = () => {
    //   history.push("/");
    setDrawerState({ ...drawerState, bottom: false });
    setResolved(false);
    setcashbackpinresolved(true);
  };

  return state.loggedIn === false ? (
    <div>
      <Redirect to="/login" />
    </div>
  ) : (
    <div id="body bg">
      {console.log(state)}

      {compState.loading === true && <> {cashbackloader()}</>}
      {compState.error === true && (
        <> {errorComponent(compState.errorMsg, clearError)} </>
      )}
      {resolved === true && (
        <>
          {" "}
          {successComponent(
            "Transaction has been resolved  successfully",
            closeSuccessPop
          )}{" "}
        </>
      )}
      <>
        
           <div
            onClick={() => {
               setDrawerState4({ ...drawerState4, bottom: true });
          }}
            style={{
              position: "fixed",
              height: "55px",
              width: "55px",
              background: "white",
              borderRadius: "55px",
              bottom: "70px",
              right: "10px",
              padding: "10px 13px",
              boxShadow: " 1px 1px 3px #0a3d62",
              textAlign: "center",
            }}
          >
            <ImQrcode style={{ fontSize: "25px", color: "#0a3d62", marginTop: "", }} />
            <div
              style={{ marginTop: "-3px", fontSize: "13px", color: "orange" }}
            >
              scan
            </div>
          </div>

        <React.Fragment key="bottom">
          <Drawer
            anchor="bottom"
            open={drawerState["bottom"]}
            onClose={toggleDrawer("bottom", false, false)}
          >
            {compState.loading === false && (
              <>
                {compState.resolved !== true && (
                  <>
                    {cashbackpinresolved !== true && (
                      <>
                        <div
                          style={{
                            color: "grey",
                            textAlign: "center",
                            padding: "15px",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                        >
                          {" "}
                          Scan to accept payment.
                        </div>{" "}
                        <QrReader
                          style={{ width: "100%", height: "" }}
                          delay={300}
                          onError={handleError}
                          onScan={handleScan}
                          facingMode="environment"
                        />
                      </>
                    )}
                  </>
                )}

                {verifyPayload && (
                  <>
                    {/* {console.log(verifyPayload.data.isActive)} */}
                    {cashbackpinresolved === true && (
                      <>
                        {verifyPayload.success === true && (
                          <>
                            <div style={{ padding: "20px 5px" }}>
                              {" "}
                              {cashbackCurrency(
                                btn_primary,
                                btn_danger,
                                cancelCashback,
                                confirmCashback,
                                null,
                                setStates,
                                compState,
                                verifyPayload.data.meta.token,
                                verifyPayload.data.meta.name,
                                verifyPayload.data.meta.amount,
                                verifyPayload.data.isActive,
                                null
                              )}{" "}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </Drawer>

          <Drawer
            anchor="bottom"
            open={drawerState2["bottom"]}
            onClose={toggleDrawer2("bottom", false, false)}
          >
            {createCashback("bottom")}

            {initiateCreate === true && (
              <>
                {" "}
                {confirmCashbackCreation(
                  tokenamount,
                  amountPlusCharge,
                  closecreatepop,
                  finallyGenerateCashbackCode,
                  btn_danger,
                  btn_primary,
                  compState,
                  setPin,
                  pin
                )}{" "}
              </>
            )}
          </Drawer>

          <Drawer
            anchor="bottom"
            open={drawerState3["bottom"]}
            onClose={toggleDrawer3("bottom", false, false)}
          >
            {/* {confirmPinLockScreen(drawerState,setDrawerState,setStates,compState,pin,setPin,pinError,setpinError,state)} */}
            {auth === true && (
              <>
                {" "}
                {confirmPinLockScreen(
                  drawerState3,
                  setDrawerState3,
                  setStates,
                  compState,
                  pin,
                  setPin,
                  pinError,
                  setpinError,
                  state,
                  setInitiateCreate,
                  drawerState2,
                  setDrawerState2,
                  setAuth
                )}{" "}
              </>
            )}
          </Drawer>

          {/* Drawer to select the type of action */}
          <Drawer
            anchor="bottom"
            open={drawerState4["bottom"]}
            onClose={toggleDrawer("bottom", false, false)}
          >
            <div style={{ padding: "20px" }}>
              <span>
                <b>Choose action</b>
              </span>
              <div
                onClick={toggleDrawer2("bottom", true)}
                style={{
                  width: "90px",
                  display: "inline-block",
                  background: "#0a3d62",
                  float: "right",
                  padding: "4px 10px",
                  color: "white",
                  borderRadius: "4px",
                }}
              >
                <MdGridGoldenratio />
                <b> Create</b>
              </div>
            </div>
            <Divider />
            <br />
            <div>
              <button
                onClick={() => {
                  setpaymentdrawerState({
                    ...paymentdrawerState,
                    bottom: true,
                  });
                }}
                style={{
                  borderRadius: "10px",
                  height: "50px",
                  width: "90%",
                  background: "lightgray",
                  marginLeft: "5%",
                  border: "none",
                }}
              >
                <ImQrcode style={{ fontSize: "30px", color: "#0a3d62" }} />{" "}
                &nbsp; &nbsp;
                <b style={{ fontSize: "20px", color: "#0a3d62" }}>
                  Scan to make payment{" "}
                </b>
              </button>
            </div>{" "}
            <br />
            <div>
              <button
                onClick={() => {
                  setDrawerState({ ...drawerState, bottom: true });
                }}
                style={{
                  borderRadius: "10px",
                  height: "50px",
                  width: "90%",
                  background: "lightgray",
                  marginLeft: "5%",
                  border: "none",
                }}
              >
                <ImQrcode style={{ fontSize: "30px", color: "#0a3d62" }} />{" "}
                &nbsp; &nbsp;
                <b style={{ fontSize: "20px", color: "#0a3d62" }}>
                  Scan to accept payment{" "}
                </b>
              </button>
            </div>
            <br />
            <br />
          </Drawer>

          <Drawer
            anchor="bottom"
            open={paymentdrawerState["bottom"]}
            onClose={toggleScanToPayDrawer("bottom", false, false)}
          >
            {compState.loading === false && (
              <>
                <>
                  {vendorVerified.proceedToAuth === false && (
                    <>
                      {vendorVerified.verified === false ? (
                        <>
                          <div
                            style={{
                              color: "grey",
                              textAlign: "center",
                              padding: "15px",
                              fontWeight: "bold",
                              fontSize: "20px",
                            }}
                          >
                            {" "}
                            Scan to make payment.
                          </div>
                          <QrReader
                            style={{ width: "100%", height: "" }}
                            delay={300}
                            onError={handleError}
                            onScan={handlePaymentScan}
                            facingMode="environment"
                          />
                        </>
                      ) : (
                        <>
                          <div>
                            <div style={{ padding: "20px", fontSize: "25px" }}>
                              <span>
                                <b>Enter amount</b> <br />
                                <span
                                  style={{ fontSize: "16px", color: "crimson" }}
                                >
                                  {amountError}
                                </span>
                              </span>
                            </div>
                            <Divider />
                            <div style={{ padding: "15px" }}>
                              <span>Pay to</span>
                              <div>
                                <b>
                                  {vendorVerified.data && (
                                    <>{vendorVerified.data[0].fullname}</>
                                  )}
                                </b>
                                {console.log(vendorVerified)}
                              </div>
                              <div>
                                <small>
                                  {vendorVerified.data && (
                                    <>
                                      {
                                        vendorVerified.data[0].meta
                                          .beneficiaryId
                                      }
                                    </>
                                  )}
                                </small>
                              </div>
                            </div>

                            <div style={{ textAlign: "center" }}>
                              <input
                                onChange={(e) => {
                                  setAmountError("");
                                  setAmountAfterScan(e.target.value);
                                }}
                                type="number"
                                style={{
                                  border: "none",
                                  borderBottom: "0.5px solid grey",
                                  borderRadius: "4px",
                                  padding: "20px",
                                  fontSize: "15px",
                                  outline: "none",
                                  textAlign: "center",
                                }}
                                placeholder="Enter amount to pay"
                              />
                              <br />
                              <br />
                              <button
                                onClick={() => {
                                  allowVendorToAuth();
                                }}
                                style={{
                                  borderRadius: "10px",
                                  height: "40px",
                                  width: "40%",
                                  background: "lightgray",
                                  // marginLeft: "5%",
                                  border: "none",
                                }}
                              >
                                <b
                                  style={{ fontSize: "20px", color: "#0a3d62" }}
                                >
                                  Continue
                                </b>
                              </button>{" "}
                              <br /> <br />
                              <span
                                onClick={() => {
                                  cancelVendorSearch();
                                }}
                              >
                                close
                              </span>
                            </div>
                          </div>
                          <br />
                        </>
                      )}
                    </>
                  )}

                  {vendorVerified.proceedToAuth === true && (
                    <>
                      <div style={{ background: "lightgrey" }}>
                        <div style={{ background: "lightgrey" }}>
                          <div style={{ padding: "20px", fontSize: "25px" }}>
                            <span>
                              <b>Authorize payment</b>
                            </span>{" "}
                            <br />
                            <span
                              style={{ fontSize: "16px", color: "crimson" }}
                            >
                              {amountError}
                            </span>
                          </div>
                          <Divider />
                          <div style={{ padding: "15px", fontSize: "20px" }}>
                            <b>NGN {amountAfterScan}</b>
                          </div>
                          <div style={{ padding: "10px 15px" }}>
                            <div>
                              <small style={{ color: "mediumseagreen" }}>
                                Pay to
                              </small>
                              <br />
                              <b>
                                {vendorVerified.data && (
                                  <>{vendorVerified.data[0].fullname}</>
                                )}
                              </b>
                              {console.log(vendorVerified)}
                            </div>
                            <div>
                              <small>
                                {vendorVerified.data && (
                                  <>
                                    {vendorVerified.data[0].meta.beneficiaryId}
                                  </>
                                )}
                              </small>
                            </div>
                          </div>{" "}
                          <Divider />
                        </div>
                        <br />
                        <div style={{ textAlign: "center" }}>
                          <b>Authorize</b>
                          <br />
                          <input
                            onChange={(e) => {
                              setVendorPin(e.target.value);
                              setAmountError("");
                            }}
                            focuse
                            type="number"
                            style={{
                              border: "none",
                              borderBottom: "0.5px solid grey",
                              borderRadius: "8px",
                              padding: "20px",
                              fontSize: "15px",
                              outline: "none",
                              textAlign: "center",
                            }}
                            placeholder="Enter vendors pin"
                          />
                          <br />
                          <br />
                          <button
                            onClick={() => {
                              initiateVendorScanToPay();
                            }}
                            style={{
                              borderRadius: "10px",
                              height: "40px",
                              width: "40%",
                              background: "#0a3d62",
                              // marginLeft: "5%",
                              border: "none",
                            }}
                          >
                            <b style={{ fontSize: "20px", color: "white" }}>
                              Authorize
                            </b>
                          </button>{" "}
                          <br /> <br />
                          <span
                            onClick={() => {
                              cancelVendorSearch();
                            }}
                          >
                            close
                          </span>{" "}
                          <br />
                          <br />
                        </div>
                      </div>
                    </>
                  )}
                </>
              </>
            )}
          </Drawer>
        </React.Fragment>

        <Desktopleft />
        <Desktopright />
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
    walletAdd: (wallet) => dispatch(add_wallet(wallet)),
    logout: (hard) => dispatch(logOut(hard)),
    login_suc: (userMetadata) => dispatch(loginSuc(userMetadata)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
