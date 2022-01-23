import React, { useState } from "react";
import "../static/css/auth/login.css";
import { connect } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Redirect, useHistory } from "react-router-dom";
import { loginSuc, add_wallet, disp_session, logOut } from "../redux";
import { supabase } from "../functions/configs/index";
import { ToastContainer, toast, Bounce } from "react-toastify";
import loaderImg from "../static/logos/animation.gif";
import logo from "../static/logos/aluta.png";
import { Helmet } from "react-helmet";
import { makeStyles } from "@material-ui/core/styles";
import md5 from "md5";
// @=== import success response from worker function
import { alert } from "../functions/workers_functions/alert";
import { cashbackloader } from "../components/loading";
import { BsFillHandThumbsUpFill } from "react-icons/bs";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      marginTop: theme.spacing(2),
    },
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function Login({ appState, login_suc, walletAdd, set_session, log_out }) {
  // initialize supabase
  const new_supabase = supabase();
  let history = useHistory();

  console.log(-0.0 < -305);

  React.useEffect((compState) => {
    window.scrollTo(0, 0);
    // setStates({ ...compState, loader: true });
    setTimeout(() => setStates({ ...compState, loader: false }), 500);
    //  log_out()
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const state = appState;
  const [compState, setStates] = useState("");
  const [stateAlert, setStateAlert] = useState("");

  // reroute function
  let reroute = () => {
    setStates({ ...compState, loader: true });
  };

  const classes = useStyles();

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

  return (
    <div className="bg">
      <div id="formHolder">
        <div
          style={{ fontSize: "20px", marginTop: "10px", color: "white" }}
          id=" "
        >
          Login successfully
        </div>

        <form className="form" noValidate autoComplete="off">
          <br />
          <br />
          <BsFillHandThumbsUpFill style={{fontSize:"70px",color:"white"}} />
          <br />
              <br />
              <br />
               <br />
          <button
            type="button"
            style={{
              background: "mediumseagreen",
              color: "white",
              border: "none",
              outline: "none",
              padding: "7px 50px",
              // margin: "10px",
              // borderRadius: "6px",
              width: "100%",
              fontSize: "25px",
            }}
            onClick={(e) => {
              history.push("/");
            }}
          >
            {" "}
            Logout{" "}
          </button>
        </form>
      </div>
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
    login_suc: (userMetadata) => dispatch(loginSuc(userMetadata)),
    walletAdd: (wallet) => dispatch(add_wallet(wallet)),
    set_session: (time) => dispatch(disp_session(time)),
    log_out: () => dispatch(logOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
