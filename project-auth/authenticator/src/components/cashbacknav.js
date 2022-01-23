import React, { useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";
import { SiAuth0, SiLetsencrypt } from "react-icons/si";
import Scan from "../components/qrscan";
import { ImQrcode } from "react-icons/im";
import QrReader from "react-qr-reader";
import md5 from "md5";
import { updateUserMeta } from "../functions/models/index";
import { Drawer, Divider } from "@mui/material";
import { generateOTP } from "../functions/utils";

function Home({ appState, login_suc }) {
  const state = appState;

  const [compState, setStates] = useState({
    resolved: false,
    verified: false,
  });

  React.useEffect(() => {}, []);
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

  const [verifyPayload, setVerifypayload] = useState("");
  const [password, setPassword] = useState("");
  const [newOTP, setOTP] = useState({
    resolved: false,
    pin: "",
  });

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
        ...compState,
        result: data,
        resolved: true,
        scanned: true,
      });
      setVerifypayload(data);
      console.log(data);
      setDrawerState({ ...drawerState, bottom: false });
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  const OTP = (payload) => {
    return md5(payload + new Date().getTime())
      .replace(/[^0-9]/g, "")
      .substr(0, 6);
  };

  const [loading, setLoading] = useState(false);
  const generateOTP = (payload) => {
    let data = {
      email: "aminigbopaul@gmail.com",
      otp: OTP(payload),
    };

    updateUserMeta(data).then((res) => {
      setLoading(false);
      setOTP({
        ...newOTP,
        pin: res.data,
        resolved: true,
      });
    });
  };

  return state.loggedIn === false ? (
    <div>
      <Redirect to="/login" />
    </div>
  ) : (
    <div id="body bg">
      <>
        <div className="mobile">
          <div>
            <div>
              <div style={{ zIndex: "80000", background: " " }}>
                <div
                  style={{
                    width: "90%",
                    background: "white",
                    padding: "20px 20px",
                    marginLeft: "5%",
                    marginTop: "100px",
                    borderRadius: "0px",
                    boxShadow: " 1px 1px 3px gray",
                    backgroundImage:
                      "linear-gradient(to right,lightgray, #385b74)",
                    position: "relative",
                    height: "210px",
                    border: "none",
                  }}
                >
                  <SiAuth0
                    style={{
                      color: "orange",
                      position: "absolute",
                      top: "1px",
                      right: "1px",
                      fontSize: "40px",
                    }}
                  />
                  <div>
                    <b style={{ fontSize: "20px", color: "#0a3d62" }}>
                      SMART AUTH.
                    </b>{" "}
                    <br /> <br />
                    <br />
                    {newOTP.resolved === false ? (
                      <>
                        {" "}
                        <small style={{ color: "", fontSize: "18px" }}>
                          Smart Authenticator for OTP generation
                        </small>{" "}
                      </>
                    ) : (
                      <div style={{ textAlign: "center", background: "black" }}>
                        <b style={{ fontSize: "30px", color: "orange" }}>
                          [&nbsp; &nbsp;{" "}
                          {loading === true ? (
                            <small style={{ fontSize: "12px",color:"white" }}>
                              Loading........
                            </small>
                          ) : (
                            <>{newOTP.pin}</>
                          )}
                          &nbsp; &nbsp; ]
                        </b>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {compState.scanned === true && (
          <div
            style={{
              background: "rgb(0,0,0,0.7)",
              position: "fixed",
              height: "100%",
              width: "100%",
              top: "0px",
              left: "0px",
              zIndex: "10000",
            }}
          >
            <div
              style={{
                width: "90%",
                background: "white",
                padding: "20px 20px",
                marginLeft: "5%",
                marginTop: "70%",
                borderRadius: "0px",
                boxShadow: " 1px 1px 3px gray",
                backgroundImage: "linear-gradient(to right,lightgray, #385b74)",
                position: "relative",
                height: "30%",
                border: "none",
                zIndex: "20000",
              }}
            >
              <SiLetsencrypt
                style={{
                  color: "orange",
                  position: "absolute",
                  top: "1px",
                  right: "1px",
                  fontSize: "40px",
                }}
              />
              <div style={{ textAlign: "center", marginTop: "50px" }}>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  placeholder="Confirm password"
                  style={{
                    border: "none",
                    padding: "6px",
                    borderRadius: "5px",
                  }}
                />{" "}
                <br /> <br />
                <input
                  onClick={() => {
                    if (password !== verifyPayload.split("-")[1]) {
                      console.log("wrong");
                    } else {
                      console.log("correct");
                      setStates({
                        ...compState,
                        scanned: false,
                        verified: true,
                        resolved: false,
                      });
                      setOTP({
                        ...newOTP,
                        resolved: true,
                      });
                      setLoading(true);
                      generateOTP(verifyPayload);
                    }
                  }}
                  type="button"
                  value="Proceed"
                  style={{
                    border: "none",
                    padding: "6px",
                    borderRadius: "5px",
                    background: "#385b74",
                    color: "white",
                  }}
                />
              </div>
            </div>
          </div>
        )}

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
                  <QrReader
                    style={{ width: "100%", height: "" }}
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    facingMode="environment"
                  />
                )}

                {verifyPayload && <></>}
              </>
            )}
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
