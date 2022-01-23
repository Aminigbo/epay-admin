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
  formatAMPM,
  daysOfTheWeek,
  monthsOfTheYear,
} from "../../functions/utils/index";
import Scan from "../../components/qrscan";

import { Drawer, Divider } from "@mui/material";

// strong tin.mp3
import mp3 from "../../static/audio/Doorbell.mp3"; 
import {
  updateUserMeta,
  fetchUserProfile,
  saveTopupHistory,
} from "../../functions/models/index";
 

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

  const [pins, setPins] = useState({
    first: "",
    second: "",
  });
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

 

  

  // @=====  claim the alert
  const claimBuz = () => {
    // addwallet(compState.myNewWallet)
    setStateAlert(null);
    history.push(`/notification`);
  };

  React.useEffect(() => { 
  }, []);

 
 

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

 
        
      <Scan />

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
