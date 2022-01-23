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
import Toppills from "../components/includes/topdesktoppills";
import { cashbackloader } from "../components/loading";
import { btn_primary, btn_danger } from "../components/buttons";
import {
  handleChashbackGeneration,
  handleVerifyToken,
  settleCashbackToWallet,
} from "../functions/controllers/cashback"; // CASHBACK TOKEN CONTROLLER
import { errorComponent, successComponent } from "../components/error"; // error component for error handling
import { ImQrcode } from "react-icons/im";
import { Drawer, Divider } from "@mui/material";

function Home({ appState, login_suc }) {
  let history = useHistory();
  const state = appState;
  const [value, setValue] = useState(null); //TOKEN TO BE VERIFIED
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
   
 
  

  const handleScan = (data) => {
    if (data) {
      setStates({
        result: data,
        loading: true,
        resolved: true,
      });
      console.log(data)
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

   

  return state.loggedIn === false ? (
    <div>
      <Redirect to="/login" />
    </div>
  ) : (
    <div id="body bg"> 
      <> 

        <div
          onClick={() => {
            // history.push("/scan");
            setDrawerState({ ...drawerState, bottom: true });
          }}
          style={{
            position: "fixed",
            height: "55px",
            width: "55px",
            background: "white",
            borderRadius: "55px",
            bottom: "130px",
            right: "30px",
            padding: "10px 13px",
            boxShadow: " 1px 1px 3px #0a3d62",
            textAlign: "center",
          }}
        >
          <ImQrcode style={{ fontSize: "25px", color: "#0a3d62" }} />
          <div style={{ marginTop: "-4px", fontSize: "13px", color: "orange" }}>
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
                        {" "}
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
                    
                  </>
                )}
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
    logout: () => dispatch(logOut()),
    login_suc: (userMetadata) => dispatch(loginSuc(userMetadata)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
