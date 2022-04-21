// import  "../../static/css/home/index.css"
import "../../static/css/top-nav.css";
import { LinearProgress } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { coinsPercentage } from "../../functions/utils/index";
import {
  logOut,
  loginSuc,
  add_wallet,
  disp_noti,
  disp_session,
  disp_request,
} from "../../redux";
import { useHistory, Redirect } from "react-router-dom";
import {
  DynamicFeed,
  Person,
  AddBoxOutlined,
  EmojiTransportationOutlined,
  CardGiftcardOutlined,
  ForumOutlined,
  HomeOutlined,
  StorefrontOutlined,
  AssignmentReturnedOutlined,
  EventNote,
  AccountBalanceWallet,
} from "@material-ui/icons";
import {
  formatAMPM,
  daysOfTheWeek,
  monthsOfTheYear,
} from "../../functions/utils/index";
import Scan from "../../components/qrscan";

import { Drawer, Divider } from "@mui/material";

// strong tin.mp3
import mp3 from "../../static/audio/Doorbell.mp3";
import { checkSession } from "../controlers/session";
import { cashbackloader } from "../../components/loading";
import { PaystackButton, PaystackConsumer } from "react-paystack";
import {
  updateUserMeta,
  fetchUserProfile,
  saveTopupHistory,
} from "../../functions/models/index";

//  function that checkes if the user is still using the default transaction pin
import { trigger, resetPin } from "../../functions/controllers/resetPin";

// @=== import success response from worker function
import { alert, BuzAlert } from "../../functions/workers_functions/alert";

// importing realtime controller
// import { buzSubscription } from "../../functions/controllers/realtime";

import { supabase } from "../../functions/configs/index";
const smile = {
  color: "white",
  fontSize: "20px",
};

const active = {
  background: "#0a3d62",
  color: "white",
};

function Desktopright({
  appState,
  login_suc,
  dispNoti,
  set_session,
  logout,
  dispRequest,
}) {
  let history = useHistory();
  const state = appState;

  const userId = state.loggedInUser.user.id;
  const beneficiaryId = state.loggedInUser.user.meta.beneficiaryId;
  const new_supabase = supabase();
  // const publicKey = "pk_your_public_key_here"

  
  const [stateAlert, setStateAlert] = useState("");
  const [compState, setStates] = useState({
    title: "",
    topupErr: false,
  });
  const [gotbuzzed, setGotbuzzed] = useState({
    status: false,
    data: null,
  });
  const [amount, setAmount] = useState("");

  

  // @========  REALTIME SUBSCRIPTION
  const sub = () => {
    console.log(userId);
    new_supabase
      .from(`buz-me`)
      .on("INSERT", (payload) => {
        const response = payload.new;
        console.log(response);
        // let check = response.filter((e) => e.to == userId);
        if (response.to == userId) {
          let myNewWallet =
            parseInt(state.wallet) + parseInt(response.meta.data.amount);

          // addwallet(myNewWallet)
          setStates({
            ...compState,
            payload: response,
            myNewWallet,
          });
          window.navigator.vibrate([2000, 1000, 2000]);
          var audio = new Audio(mp3);
          audio.play();
          setStateAlert("buzAlert");
          console.log(compState.myNewWallet);
        }
      })
      .subscribe();

    // @======== subscribe to cashback resolve
    new_supabase
      .from(`cashback`)
      .on("UPDATE", (payload) => {
        const response = payload.new;
        if (response.user == userId) {
          dispNoti(true);
          window.navigator.vibrate([2000, 100, 2000]);
          var audio = new Audio(mp3);
          audio.play();
        }
      })
      .subscribe();

    new_supabase
      .from(`giveaway-lucky-winners`)
      .on("INSERT", (payload) => {
        const response = payload.new;
        if (response.beneficiaryId == beneficiaryId) {
          let myNewWallet =
            parseInt(state.wallet) +
            parseInt(response.meta.giveawayData.userGets);
          console.log(response);

          // addwallet(myNewWallet)
          let load = {
            meta: {
              data: {
                amount: response.meta.giveawayData.userGets,
                desc:
                  "You are one of the beneficiaries of " +
                  response.giver.name +
                  "'s give away. Cheers ",
              },
              sender: { fullname: response.giver.name },
            },
          };
          window.navigator.vibrate([6000, 100, 6000]);
          var audio = new Audio(mp3);
          audio.play();
          setStates({
            ...compState,
            payload: load,
            myNewWallet,
          });
          setStateAlert("buzAlert");
        }
      })
      .subscribe();

    // @======== SUBSCRIBE TO NOTIFICATION TABLE
    new_supabase
      .from(`notifications`)
      .on("INSERT", (payload) => {
        if (payload.new.to == userId) {
          dispNoti(true);
          // var audio = new Audio(mp3);
          // audio.play();
        }
      })
      .subscribe();

    // @======== SUBSCRIBE TO BUZZ REQUEST TABLE
    new_supabase
      .from(`buzz-request`)
      .on("INSERT", (payload) => {
        const response = payload.new;
        console.log(response);
        let check = response.to.filter((e) => e.value == beneficiaryId);
        if (check.length > 0) {
          dispNoti(true);
          var audio = new Audio(mp3);
          audio.play();
          window.navigator.vibrate([2000, 100, 2000]);
        }
      })
      .subscribe();
  };

  // @=====  claim the alert
  const claimBuz = () => {
    // addwallet(compState.myNewWallet)
    setStateAlert(null);
    history.push(`/notification`);
  };

  React.useEffect(() => {
    // setStates({
    //   ...compState,
    //   loading:true
    // })
    sub();
    fetchUserProfile(userId)
      .then((res) => {
        if (res.body == null || res.body.length < 1) {
          if (res.body == null && res.error.message == "JWT expired") {
          } else {
            //   logout("HARD")
            // history.push("/login")
            // window.location.reload();
          }
        } else {
          if (res.body[0].meta.isActive !== true) {
            history.push(`/otp/${res.body[0].phone}`);
          } else {
            setStates({
              ...compState,
              loading: false,
            });
          }
        }
        console.log(res);
      })
      .catch((err) => {
        logout();
      });
    // if(state.loggedIn == true ){
    //   setInterval(() => checkSession(logout, set_session, state), 5000);
    // }
    checkSession(logout, set_session, state, new_supabase);
  }, []);

  let successPayload = {
    title: compState.title.length < 1 ? "SUCCESS" : compState.title,
    msg: compState.alertMsg,
    error: false,
  };

  let errorPayload = {
    title: "error",
    msg: compState.alertMsg,
    error: true,
  };

  let pathname = window.location.pathname;
  let split = pathname.split("/")[1];
  let allow = "";
  if (
    split == "setschool" ||
    split == "updateprofile" ||
    split == "updateprofile" ||
    split == "buzzhistory" ||
    split == "history" ||
    split == "topuphistory"
  ) {
    allow = false;
  } else {
    allow = false;
  }

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

  // paystack payload
  const config = {
    reference: new Date().getTime().toString(),
    email: state.loggedInUser.user.email,
    amount: amount + "00",
    publicKey: "pk_live_bd2306790af6962d941c0f45888d5335328f1b15",
  };

  // you can call this function anything
  const handleSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    setStates({
      ...compState,
      loader: true,
    });
    console.log(reference);
    let newWallet =
      parseInt(amount) + parseInt(state.loggedInUser.user.meta.wallet);

    let dataToUpdate = {
      email: state.loggedInUser.user.email,
      newUser: {
        ...state.loggedInUser.user.meta,
        wallet: newWallet,
        buzzcoin: coinsPercentage(amount, state.loggedInUser).totalcoin,
      },
    };
    let newLoginData = {
      user: {
        ...state.loggedInUser.user,
        meta: dataToUpdate.newUser,
      },
      meta: state.loggedInUser.meta,
    };

    // @= top up payload
    let topupPayload = {
      user: state.loggedInUser.user.id,
      amount,
      meta: {
        ...reference,
        date: {
          day: daysOfTheWeek(new Date()),
          month: monthsOfTheYear(),
          year: new Date().getFullYear(),
          date: new Date().getDate(),
          time: formatAMPM(new Date()),
        },
      },
    };

    updateUserMeta(dataToUpdate)
      .then((res) => {
        if (res.success == true) {
          saveTopupHistory(topupPayload);
          login_suc(newLoginData);
          setStateAlert(true);
          setStates({
            ...compState,
            loader: false,
            alertMsg: `Top up was successful. You have been rewarded with ${
              coinsPercentage().gained
            } Buzz coin `,
          });
        } else {
          setStateAlert(false);
          setStates({
            ...compState,
            loader: false,
            alertMsg: "Sorry, a network error occured",
          });
        }
      })
      .catch((errer) => {
        alert("A network error occured");
        setStates({
          ...compState,
          loader: false,
        });
      });
  };

  // you can call this function anything
  const handleClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const componentProps = {
    ...config,
    text: "Paystack Button Implementation",
    onSuccess: (reference) => handleSuccess(reference),
    onClose: handleClose,
  };

  return state.loggedIn === false ? (
    <div>
      {state.loggedInUser == null ? (
        <Redirect to="login" />
      ) : (
        <Redirect to="/lockout" />
      )}
    </div>
  ) : (
    <> 
      {/* {compState.loading === true && <> {cashbackloader()}</>}
      {allow === false && (
        <div>
          {resetPin(state, resetTPin, smile, setPins, pins)}
          {trigger(state, history, smile)}
        </div>
      )} */}

      

      <div id=" " className="top-nav-holder">
        {/* {console.log(split)} */}
        {compState.loading === true && <>{cashbackloader()} </>}
        {stateAlert === null && <span>{history.push("/")}</span>}
        {stateAlert === true && alert(successPayload, setStateAlert)}
        {stateAlert === false && alert(errorPayload, setStateAlert)}
        {stateAlert == "buzAlert" && BuzAlert(compState.payload, claimBuz)}
        <div
          onClick={() => {
            history.push("/giveaway");
            if (window.pageYOffset === 0) {
              console.log("refesh");
            } else {
              // window.scrollTo(0, 0)
            }
          }}
          className="top-nav-pills-holder"
        >
          <span
            style={{
              color:
                state.loggedInUser.user.meta.schoolmode === true
                  ? "grey"
                  : "#0a3d62",
            }}
            className="top-nav-pills"
          >
            {" "}
            <CardGiftcardOutlined />{" "}
          </span>
          <p
            style={{
              color:
                state.loggedInUser.user.meta.schoolmode === true
                  ? "grey"
                  : "#0a3d62",
            }}
            className="top-nav-pills-title"
          >
            {" "}
            Giveaway
          </p>
        </div>

        <div
          onClick={() => {
            // history.push("/transfer");
            history.push("/feedsX");
          }}
          className="top-nav-pills-holder"
        >
          <span
            style={{
              color:
                state.loggedInUser.user.meta.schoolmode === true
                  ? "grey"
                  : "#0a3d62",
            }}
            className="top-nav-pills"
          >
            {" "}
            <DynamicFeed />{" "}
          </span>
          <p
            style={{
              color:
                state.loggedInUser.user.meta.schoolmode === true
                  ? "grey"
                  : "#0a3d62",
            }}
            className="top-nav-pills-title"
          >
           Campus feeds
          </p>
        </div>

        <div
          onClick={() => {
            history.push("/events");
          }}
          style={{
            color:
              state.loggedInUser.user.meta.schoolmode === true
                ? "grey"
                : "#0a3d62",
          }}
          className="top-nav-pills-holder"
        >
          <span
            style={{
              color:
                state.loggedInUser.user.meta.schoolmode === true
                  ? "grey"
                  : "#0a3d62",
            }}
            className="top-nav-pills"
          >
            <EventNote />
          </span>
          <p
            style={{
              borderBottom:
                split == "cashback" ||
                (split == "cb" && "orange") ||
                (split === "student-cashback" && "1px solid orange"),
              color:
                split == "cashback" ||
                (split == "cb" && "orange") ||
                (split === "student-cashback" && "orange"),
            }}
            className="top-nav-pills-title"
          >
            Events
          </p>
        </div>

        {state.loggedInUser.user.meta.schoolmode !== false ? (
          <div
            onClick={() => {
              history.push("/create");
            }}
            className="top-nav-pills-holder"
          >
            <span
              className="top-nav-pills"
              style={{
                color:
                  state.loggedInUser.user.meta.schoolmode === true
                    ? "#0a3d62"
                    : "#0a3d62",
              }}
            >
              {" "}
              <AddBoxOutlined />{" "}
            </span>
            <p
              style={{
                borderBottom: split == "create" && "1px solid lightgray",
                color: split == "create" && "#0a3d62",
              }}
              className="top-nav-pills-title"
            >
              Post
            </p>
          </div>
        ) : (
          <div
            onClick={toggleDrawer("bottom", true)}
            className="top-nav-pills-holder"
          >
            <span
              style={{
                color:
                  state.loggedInUser.user.meta.schoolmode === true
                    ? "#0a3d62"
                    : "#0a3d62",
              }}
              className="top-nav-pills"
              // nonstudentfeed
            >
              {" "}
              {/* <StorefrontOutlined />{" "} */}
              <AccountBalanceWallet />
            </span>
            <p
              style={{
                color:
                  state.loggedInUser.user.meta.schoolmode === true
                    ? "#0a3d62"
                    : "#0a3d62",
              }}
              className="top-nav-pills-title"
            >
              Add cash
            </p>
          </div>
        )}

        {state.loggedInUser.user.meta.schoolmode === true && (
          <div
            onClick={() => {
              history.push("/tour");
            }}
            className="top-nav-pills-holder"
          >
            <span
              style={{
                color:
                  state.loggedInUser.user.meta.schoolmode === true
                    ? "#0a3d62"
                    : "#0a3d62",
              }}
              className="top-nav-pills"
            >
              {" "}
              <EmojiTransportationOutlined />{" "}
            </span>
            <p
              style={{
                borderBottom: split == "tour" && "1px solid lightgray",
                color: split == "tour" && "#0a3d62",
              }}
              className="top-nav-pills-title"
            >
              Tour
            </p>
          </div>
        )}
      </div>

      <React.Fragment key="bottom">
        <Drawer
          anchor="bottom"
          open={drawerState["bottom"]}
          onClose={toggleDrawer("bottom", false, false)}
        >
          <div
            style={{
              height: "200px",
              background: " ",
              padding: "15px",
              textAlign: "center",
            }}
          >
            {/* <div>Enter amount to top up</div>
             */}
            <br />
            <div style={{ padding: "10px 0px" }}>
              <input
                onChange={(e) => {
                  setAmount(e.target.value);
                  setStates({
                    ...compState,
                    topupErr: false,
                  });
                }}
                placeholder="Enter top up amount"
                type="number"
                style={{
                  padding: "5px",
                  outline: "none",
                  width: "180px",
                  border: "none",
                  borderBottom:
                    compState.topupErr == false
                      ? "0.5px solid lightgray"
                      : "3px solid crimson",
                  textAlign: "center",
                }}
              />{" "}
              <br />
              <br />
              {/* <input
                type="button"
                value="Continue"
                style={{
                  padding: "5px",
                  outline: "none",
                  width: "180px",
                  border: "none",
                  background: "#0a3d62",
                  color: "white",
                  borderRadius: "6px",
                }}
                onClick={toggleDrawer("bottom", false)}
              /> */}
              <PaystackConsumer {...componentProps}>
                {({ initializePayment }) => (
                  <button
                    style={{
                      padding: "5px",
                      outline: "none",
                      width: "180px",
                      border: "none",
                      background: "#0a3d62",
                      color: "white",
                      borderRadius: "6px",
                    }}
                    onClick={() => {
                      if (amount > 49) {
                        initializePayment(handleSuccess, handleClose);
                        setDrawerState({ ...drawerState, bottom: false });
                      } else {
                        setStates({
                          ...compState,
                          topupErr: true,
                        });
                        window.navigator.vibrate([200]);
                      }
                    }}
                  >
                    Top up
                  </button>
                )}
              </PaystackConsumer>
            </div>
          </div>
        </Drawer>
      </React.Fragment>

      {/* <Scan /> */}
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
    set_session: (time) => dispatch(disp_session(time)),
    logout: (type) => dispatch(logOut(type)),
    login_suc: (userMetadata) => dispatch(loginSuc(userMetadata)),
    addwallet: (walletBal) => dispatch(add_wallet(walletBal)),
    dispNoti: (payload) => dispatch(disp_noti(payload)),
    dispRequest: (bolean) => dispatch(disp_request(bolean)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Desktopright);
