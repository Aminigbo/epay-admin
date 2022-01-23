import "../../static/css/home/index.css";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Dehaze, Search } from "@material-ui/icons";
import { connect } from "react-redux";
import { logOut, loginSuc, disp_noti, disp_request } from "../../redux";
import { useHistory, Link } from "react-router-dom";
import { syncDB } from "../../functions/models/index";
import {
  LocalAtm,
  Money,
  EmojiTransportationOutlined,
  EventNote,
  NotificationsActiveOutlined,
  SchoolOutlined,
  FiberManualRecord,
  SignalCellularConnectedNoInternet1BarOutlined,
  WhatsappOutlined,
  ExitToAppOutlined,
  EuroSymbolOutlined,
  AccountBalanceOutlined,
} from "@material-ui/icons";
import { FcRating } from "react-icons/fc";
import { FcBusinessman, FcList } from "react-icons/fc";
import { BsWhatsapp } from "react-icons/bs";
import avar from "../../static/logos/logo2.png";
import { cashbackloader } from "../../components/loading";
import {
  List,
  ListItem,
  Divider,
  ListItemAvatar,
  Box,
  Drawer,
  Avatar,
  Switch,
} from "@mui/material";
import { MdOutlineVerified } from "react-icons/md";
import { updateUserMeta } from "../../functions/models/index";
import { notificationAlert } from "../../functions/utils/index";

const select = {
  // backgroundColor: "#0a3d62",
  color: "#0a3d62",
  textAlign: "center",
};

const selected = {
  color: "mediumseagreen",
};

const rec_inputs3 = {
  marginBottom: "5%",
  width: "95%",
  // padding: "10px",
  border: "5px",
  height: "53px",
  border: "0.3px solid lightgrey",
  // backgroundColor: "#f4f6f7",
  color: "#4e7a97",
  outline: "none",
  fontSize: "13px",
  resize: "none",
  marginTop: "10px",
  borderRadius: "4px",
  marginLeft: "2.5%",
  // paddingRight:"50px"
};

const rec_inputs2 = {
  // margin: "5%",
  width: "67%",
  padding: "10px",
  border: "5px",
  height: "50px",
  // border: "0.3px solid red",
  // backgroundColor: "#f4f6f7",
  color: "#4e7a97",
  outline: "none",
  fontSize: "13px",
  resize: "none",
  // marginTop: "10px",
  borderRadius: "4px",
  // marginLeft: "2.5%",
  // paddingRight:"50px"
};
const wtsappBTN = {
  // margin: "5%",
  width: "30%",
  padding: "0px 5px",
  border: "5px",
  height: "50px",
  // border: "0.3px solid red",
  backgroundColor: "#25d366",
  color: "#4e7a97",
  outline: "none",
  fontSize: "13px",
  borderRadius: "0px 4px 5px 0px",
  float: "right",
  fontWeight: "bold",
  color: "white",
  fontSize: "30px",
};

function Header({ appState, log_out, login_suc, dispNoti, dispRequest }) {
  const state = appState;
  let history = useHistory();

  const [checked, setChecked] = React.useState(false);
  const schoolmode = (event) => {
    switchschool(event);
  };
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const switchschool = (mood) => {
    const moodSwitch = mood.target.checked;
    let user = state.loggedInUser.user;
    let newUser = {
      ...user,
      meta: { ...state.loggedInUser.user.meta, schoolmode: moodSwitch },
    };
    let payload = {
      email: user.email,
      newUser: newUser.meta,
    };

    const data = {
      user: newUser,
      meta: state.loggedInUser.meta,
    };

    console.log(payload);

    setStates({
      ...compState,
      loader: true,
    });
    updateUserMeta(payload).then((res) => {
      if (res.success == true) {
        login_suc(data);
        setChecked(moodSwitch);
        // setDrawerState({ ...drawerState, ["left"]: false });
        setStates({
          ...compState,
          done: true,
          loader: false,
        });
      } else {
        console.log(res);
        setStates({
          ...compState,
          done: true,
          loading: false,
        });
      }
    });
  };

  const [drawerState, setDrawerState] = React.useState({
    bottom: false,
  });
  const [whatsappMsg, setWhatsappMsg] = useState("");
  const [compState, setStates] = useState("");

  const toggleDrawer = (anchor, open, post) => (event) => {
    console.log("okk");
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };

  

  return state.loggedIn === false ? (
    <div>
      <Redirect to="/login" />
    </div>
  ) : (
    <div>
      {compState.loader === true && <> {cashbackloader()} </>}
      {/* {console.log(checked)} */}
      <div> 
        <ListItem
          style={{
            marginTop: "10px",
            background: " ",
            position: "sticky",
            top: "0px",
            zIndex: "1000",
            padding: "15px 0px",
            color: "white",
          }}
        >
          <ListItemAvatar
            onClick={() => {
              history.push("/");
            }}
          > 
            <div
              style={{ marginLeft: "15px", fontSize: "20px", color: "#0a3d62" }}
              >
                {state.loggedInUser.user.meta.schoolmode === false && <>  <small style={{fontSize:"18px"}}>Welcome back,</small> <br /> </> }
             
              <b>
                  {/* {state.loggedInUser.user.fullname.split(" ")[0]} */}
                  SMART AUTH 0.1
                {/* B
                <EuroSymbolOutlined
                  style={{ transform: "rotateZ(-90deg)", fontSize: "35px" }}
                />
                zz */}
              </b>
            </div>
          </ListItemAvatar>{" "}
          &nbsp;&nbsp;
          {/* <b><ListItemText
            style={{color:"white"}}
                  primary={state.loggedInUser.user.meta.school}
                  secondary="+99 new activities"
          /></b> */}
          <NotificationsActiveOutlined
            onClick={() => {
              dispNoti(false);
              history.push("/notification");
            }}
            className="menu"
            style={{
              color: state.notification === true ? "red" : "#0a3d62",
              position: " absolute",
              right: "65px",
            }}
          />{" "}
          {state.loggedInUser.user.meta.schoolmode === true && (
            <FcBusinessman
              onClick={() => {
                dispNoti(false);
                history.push("/updateprofile");
              }}
              className="menu"
              style={{
                color: "#0a3d62",
                fontSize: "30px",
                marginRight: "45px",
              }}
            />
          )}  
        </ListItem>

        {state.loggedInUser.user.meta.schoolmode === true && (
          <>
            <div
              style={{
                color: "#0a3d62",
                fontSize: "15px",
                marginTop: "-40px",
                padding: "0px 13px",
              }}
            >
              <br />
              {state.loggedInUser.user.meta.school != null && (
                <> @{state.loggedInUser.user.meta.school} </>
              )}{" "}
            </div>{" "}
          </>
        )}
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
    log_out: () => dispatch(logOut()),
    login_suc: (userMetadata) => dispatch(loginSuc(userMetadata)),
    dispNoti: (payload) => dispatch(disp_noti(payload)),
    dispRequest: (bolean) => dispatch(disp_request(bolean)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
