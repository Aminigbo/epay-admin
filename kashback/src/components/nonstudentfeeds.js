import React, { useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";
import Toppills from "../components/includes/topdesktoppills";
import { headers } from "./header";
import Footer from "../components/includes/mobile_footer";
import Naira from "react-naira";

import { ImQrcode } from "react-icons/im";
import { ArrowRightAlt } from "@material-ui/icons";
import { confirmCashbackCreation } from "../functions/workers_functions/cashback"; // CASHBACK CONTROLLER
import { Drawer, Divider } from "@mui/material";
import Accountsummery from "../components/ccountsummary";
import Cashbacknav from "../components/cashbacknav";
import Cashbackdrawal from "../components/cashbackdrawer";
import Desktopleft from "../components/includes/desktopleft";
import Desktopright from "../components/includes/desktopright";
import { add_wallet, logOut, loginSuc } from "../redux";
import { moveBuzzmeFunds } from "../functions/controllers/movebuzzmefunds";
import { btn_primary, btn_danger } from "../components/buttons";
import { text_input } from "../components/forms";
// import Toppills from "../components/includes/topdesktoppills";
import { cashbackCurrency } from "../components/currency";
import { cashbackchargecentage } from "../functions/utils/index";
import { cashbackloader } from "../components/loading";
import { errorComponent, successComponent } from "../components/error"; // error component for error handling
import {
  handleChashbackGeneration,
  handleVerifyToken,
  settleCashbackToWallet,
} from "../functions/controllers/cashback"; // CASHBACK TOKEN CONTROLLER
import { pinConfirmPop } from "../components/confirmPin";
import Scan from "./qrscan";

// @======== ALLL BUZZME CONTROLLER
import { getAllBuzz } from "../functions/controllers/allbuzzme";
import Balance from "./walletbalances";
import Lockscreen from "./lock";
function Home({ appState, login_suc }) {
  let history = useHistory();
  const state = appState;
  let userId = "";
  if (state.loggedIn === true) {
    userId = state.loggedInUser.user.id;
  }
  var QRCode = require("qrcode.react");
  const [compState, setStates] = useState({
    data: [],
    value: "",
    done: false,
    miniLoad: false,
    wallethidden: true,
    confirmpwderror: null,
    confirmpwderrormsg: "",
    error: null,
  });
  const [value, setValue] = useState(null); //TOKEN TO BE VERIFIED
  const [verifyPayload, setVerifypayload] = useState({
    data: null,
    success: null,
  });

  const [buzzState, setBuzzState] = useState({
    leading: false,
    data: [],
  });

  const [tokenamount, setTokenamount] = useState(""); // amount to be generated
  const [cashbackpinresolved, setcashbackpinresolved] = useState(false); // state to control resolving cashback
  const [initiateCreate, setInitiateCreate] = useState(false); // show the confirm or cancel popup when click initiate
  const [generatedcode, setGeneratedcode] = useState(null); // return true or false if code is generated
  const [generatedToken, setGeneratedToken] = useState(null); // set the returned generated token
  const [pin, setPin] = useState("");
  const [resolved, setResolved] = useState(null); // return true if the cashback has been resolved to the
  const [pwd, setPwd] = useState(""); // set password requird to view balance
  const [clickToViewPwd, setClickToViewPwd] = useState(false);
  const [resolvedVerifyPin, setResolvedPinVerification] = useState(false);

  const [movebuzzResolved, setmovebuzzResolved] = useState(false);


  function moveBuzzmeBalance() {
    if (state.loggedInUser.user.meta.buzzmewallet < 1) {
      setStates({
        ...compState,
        error: true,
        errorMsg: "You have insufficient Buzz Me balance",
      });
    } else {
      setStates({
        ...compState,
        loader: true,
      });
      // moveBuzzBalance();
    }
  }
  const moveBuzzBalance = () => {
    moveBuzzmeFunds(
      state.loggedInUser,
      compState,
      setStates,
      login_suc,
      setmovebuzzResolved
    ).then((res) => {
      // if (res === true) {
      //   setStates({
      //     ...compState,
      //     error: false,
      //     loader:false
      //   });
      // }
    });
  };

  const closePwd = () => {
    setClickToViewPwd(false);
    setResolvedPinVerification(false);
    setStates({
      ...compState,
      confirmpwderrormsg: "",
    });
  };

  let userWallet = "";
  if (state.loggedIn === true) {
    userWallet = state.loggedInUser.user.meta.wallet;
  }

  // ===   function to move Buzz me balance to wallet
  function moveBuzzmeBalance() {
    if (state.loggedInUser.user.meta.buzzmewallet < 1) {
      setStates({
        ...compState,
        error: true,
        errorMsg: "You have insufficient Buzz Me balance",
      });
    } else {
      setClickToViewPwd(true);
      setResolvedPinVerification(true);
    }
  }

  // @======== GET AMOUNT TO BE DEDUCTED
  const amountPlusCharge =
    parseInt(tokenamount) + cashbackchargecentage(tokenamount);
  let extraCharge = amountPlusCharge - tokenamount;
  let adminPercentage = (35 * extraCharge) / 100;

  let userTakes = amountPlusCharge - adminPercentage;

  const trigerVerify = () => {
    handleVerifyToken(
      value,
      compState,
      setStates,
      setVerifypayload,
      verifyPayload,
      setcashbackpinresolved
    );
    // setcashbackpinresolved(true);
  };

  const cancelCashback = () => {
    setcashbackpinresolved(false);
    setValue(null);
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
  };

  // @======== close success pop
  const closeSuccessPop = () => {
    setResolved(false);
    setmovebuzzResolved(false);
    setResolvedPinVerification(false);
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
    setcashbackpinresolved(false);
    setGeneratedcode(false);
    setStates({
      ...compState,
      copy: false,
    });
  };

  React.useEffect(() => {
    getAllBuzz(userId, buzzState, setBuzzState);
    // window.scrollTo(0, 0);
    setStates({
      ...compState,
      loading: false,
      wallethidden: true,
    });
  }, []);

  const clearError = () => {
    setStates({
      ...compState,
      error: false,
      errorMsg: "",
    });
  };

  // @======== INITATE THE  TOKEN GENERATION
  const handleGeneratecashback = () => {
    if (!tokenamount || tokenamount.length < 1 || tokenamount < 100) {
      setStates({
        ...compState,
        error: true,
        errorMsg: "Please provide a valid amount greater than 100 BUZ",
      });
    } else if (amountPlusCharge > userWallet) {
      console.log(amountPlusCharge);
      setStates({
        ...compState,
        error: true,
        errorMsg: "You have insufficient wallet balance",
      });
    } else if (pin !== state.loggedInUser.user.meta.transactionPin) {
      setStates({
        ...compState,
        error: true,
        errorMsg: "You Provided a wrong transaction pin",
      });
    } else {
      setInitiateCreate(true);
    }
  };

  // @======== CLOSE CREATE CONFIRM POP
  const closecreatepop = () => {
    setInitiateCreate(false);
    setGeneratedcode(false);
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

  // @======== CREATE TOKEN INTERFACE
  const createCashback = () => {
    return (
      <>
        <div
          className=" "
          style={{
            marginTop: "25px",
            width: "90%",
            background: " ",
            marginLeft: "5%",
          }}
        >
          <div style={{ textAlign: "center" }}>
            {generatedcode !== true ? (
              <b>Generate a cashback token </b>
            ) : (
              <>
                <b>TOKEN GENERATED</b>
                <div>
                  <small>
                    Copy the Cashback token generated for you. It is also saved
                    in your cashback history.
                  </small>
                </div>
              </>
            )}
          </div>
          <div
            style={{
              // height: "100px",
              marginBottom: "30px",
              marginTop: "20px",
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
                        display: "inline-block",
                        float: "left",
                      }}
                    >
                      {text_input(
                        "Amount to generate ",
                        tokenamount,
                        "number",
                        setTokenamount
                      )}
                    </div>
                    <div
                      style={{
                        width: "25%",
                        display: "inline-block",
                        textAlign: "center",
                      }}
                    >
                      {text_input("Your pin", pin, "number", setPin)}
                    </div>
                    <div style={{ marginTop: "10px", textAlign: "left" }}>
                      {tokenamount.length > 0 && (
                        <>
                          {" "}
                          <b>
                            ={" "}
                            {parseInt(tokenamount) +
                              cashbackchargecentage(tokenamount)}{" "}
                            BUZ
                          </b>{" "}
                        </>
                      )}
                    </div>
                    <br />
                    <div style={{ float: "left ", textAlign: "left" }}>
                      <span
                        onClick={() => {
                          handleGeneratecashback();
                        }}
                      >
                        {btn_primary("Generate")}
                      </span>
                    </div>{" "}
                    <br />{" "}
                  </>
                )}
                {/* @======== SHOW THE CASH BACK CURRENCY WITH THE GENERATED CODE */}
                {generatedcode === true && (
                  <>
                    {" "}
                    <div style={{ marginBottom: "20%", marginTop: "30px" }}>
                      {cashbackCurrency(
                        btn_primary,
                        "",
                        "",
                        "",
                        "copy",
                        setStates,
                        compState,
                        generatedToken,
                        state.loggedInUser.user.fullname,
                        userTakes,
                        true,
                        toggleDrawer
                      )}
                    </div>{" "}
                  </>
                )}

                {generatedcode !== true && (
                  <>
                    {" "}
                    <div style={{ marginTop: "20px", textAlign: "left" }}>
                      <i style={{ fontSize: "12px", color: "orange" }}>
                        {" "}
                        Using this service, you agree to our Cashback terms of
                        service and policies
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

  const toScan = () => {
    history.push("/scan");
  };

  return state.authenticated === false ? (
    <div>
      <Redirect to="/" />
    </div>
  ) : (
    <div id="body bg" style={{ background: "white" }}> 
      {state.loggedInUser.user.meta.schoolmode === true &&
        history.push("/feed")}

      {/* IF TOKEN VERIFICATION TURNS ERROR */}
      {verifyPayload.success === false && <> </>}

      {/* if the user successfully resolved the cashback */}
      {resolved === true && (
        <>
          {" "}
          {successComponent(
            "The cashback has been resolved to your wallet successfully",
            closeSuccessPop
          )}{" "}
        </>
      )}

      {/* @======== WHEN USER SUCCESSFULLY MOVE BUZZ ME BALANCE TO WALLET */}
      {movebuzzResolved === true && (
        <>
          {" "}
          {successComponent(
            "Balance successfully moved to wallet",
            closeSuccessPop
          )}{" "}
        </>
      )}

      {compState.loading === true && <> {cashbackloader()}</>}
      {compState.error === true && (
        <> {errorComponent(compState.errorMsg, clearError)} </>
      )}
      <>
        {initiateCreate === true && (
          <>
            {" "}
            {confirmCashbackCreation(
              tokenamount,
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
        <div className="mobile" style={{ background: "white" }}>
          {/* <header /> */}
          {headers()}
          <div
            style={{
              position: "absolute",
              width: "90%",
              left: "5%",
              height: "5px",
              background: "orange",
              marginTop: "-4px",
            }}
          ></div>
          <div
            style={{
              height: "",
              background: " white",
              fontSize: "30px",
              textAlign: "center",
              padding: "  0px",
              color: "white",
              // marginTop: "10px",
            }}
          >
            <Toppills />
          </div>
          <br />
          <div
            style={{
              height: "",
              background: "  ",
              // fontSize: "30px",
              textAlign: "center",
              padding: "6px  0px",
              color: "white",
              // marginTop: "17px",
            }}
          >
            <div
              style={{
                width: "40%",
                background: "  ",
                display: "inline-block",
                float: "left",
              }}
            >
              <div style={{ fontSize: "18px" }}>
                <div
                  style={{ fontSize: "13px", color: "grey", marginTop: "-5px" }}
                >
                  Buzz me balance
                </div>
                <div style={{ padding: "10px", marginTop: "-6px" }}>
                  <b style={{ fontSize: "20px", color: "lightgrey" }}>
                    <Naira>{state.loggedInUser.user.meta.buzzmewallet}</Naira>
                  </b>
                </div>
              </div>
            </div>

            <div
              onClick={() => {
                moveBuzzmeBalance();
              }}
              style={{
                width: "40%",
                background: "  ",
                display: "inline-block",
                float: " ",
                backgroundColor: "",
                fontSize: "16px",
                color: "#385b74",
                padding: "11px 6px",
                borderRadius: "4px",
                fontWeight:"bold"
              }}
            >
              <small>Move to wallet</small> <ArrowRightAlt />
            </div>
          </div>

          <Accountsummery />
        </div>

          <React.Fragment key="bottom">
            

           
          <Drawer
            anchor="bottom"
            open={drawerState["bottom"]}
            onClose={toggleDrawer("bottom", false, false)}
          >
            {createCashback("bottom")}
          </Drawer>
        </React.Fragment>

        <Desktopleft />
        <Desktopright />
          <Scan />
          <Footer />
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
    logout: () => dispatch(logOut()),
    login_suc: (userMetadata) => dispatch(loginSuc(userMetadata)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
