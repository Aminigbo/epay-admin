import "../../static/css/home/index.css";
import React, { useState } from "react";
import { Redirect } from "react-router-dom"; 
import { connect } from "react-redux";
import { logOut, loginSuc, disp_noti, disp_request } from "../../redux";
import { useHistory, Link } from "react-router-dom";
import { syncDB } from "../../functions/models/index";
import Naira from "react-naira";

import { 
  RemoveRedEye,
  VisibilityOff,
  Backspace, 
  Lock,
  LockOpenOutlined,
  KeyboardBackspace,
  Dehaze
} from "@material-ui/icons";


import {
  Person,
  LocalAtm,
  Money,
  EmojiTransportationOutlined,
  EventNote,
  NotificationsActiveOutlined,
  SchoolOutlined,
  Visibility, 
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
  backgroundColor: "#385b74",
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

  const list = () => (
    <Box sx={{ width: 270, height: "400px" }} role="presentation">
      <List>
        <div
          style={{
            float: "right",
            marginRight: "30px",
            color: "#0a3d62",
            textAlign: "center",
          }}
        >
          {/* <DraftsOutlined /> */}
          <span style={{ fontSize: "20px" }}>
            {" "}
            <FcRating />
          </span>
          <br />
          <small style={{ marginLeft: "5px" }}>
            {state.loggedInUser.user.meta.buzzcoin}
          </small>
        </div>
      </List>

      <List
        style={{ padding: "5px" }}
        onClick={() => {
          setDrawerState({ ...drawerState, ["left"]: false });
          history.push(
            `profile/${state.loggedInUser.user.fullname}/${state.loggedInUser.user.id}`
          );
        }}
      >
        {/* <img alt="Aluta Meter" style={{ width: "60px",height:"60px",borderRadius:"60px" }} src={avar} /> */}
        <div
          style={{
            width: " ",
            padding: "3px",
            background: " ",
            display: "inline-block",
          }}
        >
          <Avatar
            style={{ float: " " }}
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
          >
            {state.loggedInUser.user.fullname[0]}
          </Avatar>
        </div>
        &nbsp;&nbsp;
        <span>Hello, {state.loggedInUser.user.fullname.split(" ")[0]}</span>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#0a3d62", fontSize: "14px" }}>
            <b>Buzz ID:</b> &nbsp; {state.loggedInUser.user.meta.beneficiaryId}
          </div>

          <div style={{ color: "#0a3d62", fontSize: "14px" }}>
            <b>REFE. ID:</b> &nbsp; {state.loggedInUser.user.meta.refId}
          </div>
        </div>
      </List>
      <Divider />
      <List
        onClick={() => {
          setDrawerState({ ...drawerState, ["left"]: false });
          history.push("/buzzpay");
        }}
        style={{ padding: "15px" }}
      >
        <LocalAtm /> &nbsp;
        <span>Buz me</span>
        {/* <img alt="Aluta Meter" style={{ width: "60px",height:"60px",borderRadius:"60px" }} src={avar} /> */}
      </List>
      <Divider />

      <List
        onClick={() => {
          setDrawerState({ ...drawerState, ["left"]: false });
          history.push("/tour");
        }}
        style={{ padding: "15px", opacity: "" }}
      >
        <EmojiTransportationOutlined /> &nbsp;
        <span>Campus tour</span>{" "}
        {/* <span style={{ float: "right", fontSize: "11px", color: "blue" }}>
          coming soon
        </span> */}
        {/* <img alt="Aluta Meter" style={{ width: "60px",height:"60px",borderRadius:"60px" }} src={avar} /> */}
      </List>

      <Divider />
      <List
        onClick={() => {
          setDrawerState({ ...drawerState, ["left"]: false });
          history.push("/giveaway");
        }}
        style={{ padding: "15px", opacity: "" }}
      >
        <Money /> &nbsp;
        <span>Give away</span>{" "}
        {/* <span style={{ float: "right", fontSize: "11px", color: "blue" }}>
          coming soon
        </span> */}
        {/* <img alt="Aluta Meter" style={{ width: "60px",height:"60px",borderRadius:"60px" }} src={avar} /> */}
      </List>
      <Divider />
      <List
        onClick={() => {
          setDrawerState({ ...drawerState, ["left"]: false });
          history.push("/events");
        }}
        style={{ padding: "15px", opacity: "" }}
      >
        <EventNote /> &nbsp;
        <span>Events</span>{" "}
        {/* <span style={{ float: "right", fontSize: "11px", color: "blue" }}>
          coming soon
        </span> */}
        {/* <img alt="Aluta Meter" style={{ width: "60px",height:"60px",borderRadius:"60px" }} src={avar} /> */}
      </List>
      <Divider />
      {/* <List
        onClick={() => {
          setDrawerState({ ...drawerState, ["left"]: false });
          history.push("/listmart");
        }}
        style={{ padding: "15px" }}
      >
        <StorefrontOutlined /> &nbsp;
        <span>Aluta market</span> 
      </List>
      <Divider /> */}

      <List
        onClick={() => {
          setDrawerState({ ...drawerState, ["left"]: false });
          // history.push("/transfer");
        }}
        style={{ padding: "15px", background: "", opacity: "0.3" }}
      >
        <AccountBalanceOutlined /> &nbsp;
        <span>Withdraw to bank</span>
        {/* <img alt="Aluta Meter" style={{ width: "60px",height:"60px",borderRadius:"60px" }} src={avar} /> */}
      </List>
      <Divider />

      {/* <List
        onClick={() => {
          setDrawerState({ ...drawerState, ["left"]: false }); 
        }}
        style={{ padding: "15px" }}
      >
        <AddShoppingCart /> &nbsp;
        <span>Create market front</span> 
      </List>

      <Divider /> */}

      <>
        {" "}
        <List
          onClick={() => {
            setDrawerState({ ...drawerState, ["left"]: false });
            // history.push("/setschool");
          }}
          style={{ padding: "15px", opacity: "0.3" }}
        >
          <SchoolOutlined /> &nbsp;
          <span>School mode</span>
          <div style={{ display: "inline-block", float: "right" }}>
            <Switch
              style={{ float: "right" }}
              checked={state.loggedInUser.user.meta.schoolmode}
              // onChange={schoolmode}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
        </List>
        <Divider />
      </>

      {/* <List
        onClick={() => {
          setDrawerState({ ...drawerState, ["left"]: false });
          history.push("/updateprofile");
        }}
        style={{ padding: "15px" }}
      >
        <SettingsOutlined /> &nbsp;
        <span>Settings</span> 
      </List>

      <Divider /> */}

      <List
        onClick={() => {
          log_out();
        }}
        style={{ padding: "15px" }}
      >
        <ExitToAppOutlined style={{ color: "orange" }} />
        &nbsp;&nbsp; Sign out
      </List>

      <Divider />

      <div style={rec_inputs3}>
        <textarea
          onChange={(e) => {
            setWhatsappMsg(e.target.value);
          }}
          value={whatsappMsg}
          style={rec_inputs2}
          placeholder="We are on whatsapp..."
        ></textarea>
        <button
          onClick={() => {
            window.location.href = `https://wa.me/+2349011684637?text=${whatsappMsg}`;
          }}
          style={wtsappBTN}
        >
          <BsWhatsapp />
        </button>
      </div>

      {state.loggedInUser.user.meta.isVendor === false &&
        state.loggedInUser.user.meta.schoolmode === false && (
          <>
            <List
              onClick={() => {
                setDrawerState({ ...drawerState, ["left"]: false });
                // history.push("/transfer");
              }}
              style={{ padding: "15px", background: "#385b74" }}
            >
              <MdOutlineVerified style={{ color: "mediumseagreen" }} /> &nbsp;
              <span style={{ color: "mediumseagreen" }}>Become a vendor</span>
              <div>
                <small style={{ fontSize: "14px", color: "white" }}>
                  You will become a verified vendor when you click me
                </small>
              </div>
            </List>
            <Divider />
          </>
        )}

      {state.loggedInUser.user.meta.isVendor === false && (
        <>
          {/* <List style={select}>
            <div
              style={{ fontSize: "11px", textAlign: "left", padding: "5px 10px" }}
            >
              Only verified vendors can withdraw to their banks.
            </div>
          </List> */}
          {/* <button
            onClick={()=>{
              history.push("/updateprofile")
            }}
            style={{
              width:"95%",
              marginLeft: "10px",
              border: "none",
              borderRadius: "5px",
              padding: "3px 5px",
              background: "#0a3d62",
              color: "white",
            }}
          >
            Become a vendor
          </button> */}
        </>
      )}
    </Box>
  );


   //========================================================================================================= promt user to put pin befroe viewing wallet balance
  const [pin, setPin] = useState("");
 const [pwd, setPwd] = useState(""); // set password requird to view balance
  const [clickToViewPwd, setClickToViewPwd] = useState(false);
  const [resolvedVerifyPin, setResolvedPinVerification] = useState(false);

  const [movebuzzResolved, setmovebuzzResolved] = useState(false);
  let error = "";
  const [pinError, setpinError] = useState("");

  const verify = () => {
    if (pin.length == 4) {
      if (pin == state.loggedInUser.user.meta.transactionPin) {
        setStates({
          ...compState,
          wallethidden: false,
          confirmpwderror: false,
          confirmpwderrormsg: "",
        });
        setPin("");
        setDrawerState({ ...drawerState, bottom: false }); 
      } else {
        error = "Wrong pin";
        setpinError("Wrong pin");
        setPin("");
        window.navigator.vibrate([200]);
      }
    }
  };
  const append = (e) => {
    let newPin = pin + e;
    if (pin.length !== 4) {
      setPin(newPin);
    }
    if (pin.length > 2) {
      verify();
    }
    setpinError();
  };

  const clear = (e) => {
    let pinLength = pin.length;
    let clearOne = pinLength - 1;
    setPin(pin.substring(0, clearOne));
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

  const pinVal = () => {
    if (pin.length == 1) {
      return (
        <>
          {" "}
          <b style={{ opacity: "1", color: "#0a3d62" }}>
            <LockOpenOutlined />
          </b>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "0.4", color: "orange" }}>
            <Lock />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "0.4", color: "orange" }}>
            <Lock />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "1", color: "#0a3d62" }}>
            <LockOpenOutlined />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "0.4", color: "orange" }}>
            <Lock />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "1", color: "#0a3d62" }}>
            <LockOpenOutlined />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "1", color: "#0a3d62" }}>
            <LockOpenOutlined />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "1", color: "#0a3d62" }}>
            <LockOpenOutlined />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "1", color: "#0a3d62" }}>
            <LockOpenOutlined />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "0.4", color: "orange" }}>
            <Lock />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "0.4", color: "orange" }}>
            <Lock />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ opacity: "0.4", color: "orange" }}>
            <Lock />
          </span>
        </>
      );
    }
  };

  const buttons = () => {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "out", 0, "clear"];
    return numbers.map((e) => {
      return (
        <>
          <button
            className="customInput"
            style={{
              width: "60px",
              padding: "10px 10px",
              fontWeight: "bold",
              border: "none",
              //   background: "white",
              //   color: "black",
              margin: "15px 20px",
              fontSize: "20px",
              textAlign: "center",
              borderRadius: "5px",
            }}
            value={e}
            onClick={() => {
              if (e == "clear") {
                clear(e);
              } else if (e == "out") {
                setDrawerState({ ...drawerState, bottom: false });
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


  // @========  FUNCTION TO VERIFY pin AND SHOW balance
  const showPwd = () => {
    if (state.loggedInUser.user.meta.transactionPin != pwd) {
      setStates({
        ...compState,
        wallethidden: true,
        confirmpwderror: true,
        confirmpwderrormsg: "Wrong pin",
      });
      setPwd("");
    } else {
      console.log("true");
      setClickToViewPwd(false);
      setStates({
        ...compState,
        wallethidden: false,
        confirmpwderror: false,
        confirmpwderrormsg: "",
      });
      setPwd(""); 
    }
  };

  //====================================================================================================== promt user to put pin befroe viewing wallet balance


  return (
    <div style={{ height: "17rem",background:"#385b74" }}>
      {compState.loader === true && <> {cashbackloader()} </>}
      <div style={{background:" "}}>
        <ListItem
          style={{
            marginTop: "0px",
            background: "#385b74",
            position: "sticky",
            top: "0px",
            zIndex: "1000",
            padding: "15px 0px",
            color: "white",
          }}
        >
          <ListItemAvatar 
          >
            <div
              style={{ marginLeft: "15px", fontSize: "20px", color: "#0a3d62" }}
            >
              <Dehaze
                style={{
                  color:
                    state.loggedInUser.user.meta.schoolmode === true
                      ? "#385b74"
                      : "white",
                  position: "  ",
                  right: "10px",
                }}
                className="menu"
                onClick={toggleDrawer("left", true)}
              />
            </div>
          </ListItemAvatar>{" "}
          &nbsp;&nbsp;
          <NotificationsActiveOutlined
            onClick={() => {
              dispNoti(false);
              history.push("/notification");
            }}
            className="menu"
            style={{
              color:
                state.notification === true
                  ? "orange"
                  : state.loggedInUser.user.meta.schoolmode === true
                  ? "#385b74"
                  : "white",
              position: " absolute",
              right: "75px",
            }}
          />{" "}
          <Person
            onClick={() => {
              dispNoti(false);
              history.push("/updateprofile");
            }}
            className="menu"
            style={{
              color: "white",
              position: " absolute",
              right: "10px",
            }}
          />{" "}
        </ListItem>

        <div
          style={{
            height: "",
            background: " ",
            fontSize: "30px",
            textAlign: "center",
            padding: "30px 0px",
            color: "white",
          }}
          >
            
             {compState.wallethidden === false ? (
                        <>
                          <b> <Naira style={{color:"white"}}>{state.loggedInUser.user.meta.wallet}</Naira></b> <VisibilityOff  onClick={() => {
                              setStates({
                                ...compState,
                                wallethidden: true,
                              });
                            }} style={{ color: "orange" }} /> 
                        </>
                      ) : (
                        <>
                          {clickToViewPwd === false && (
                            <>
                              <b>NGN *** </b> <Visibility  onClick={toggleDrawer("bottom", true)} style={{ color: "orange" }} /> 
                            </>
                          )}
                        </>
            )}
            
         
          </div> 

        <div
          style={{
            height: "",
            background: " ",
            fontSize: "30px",
            textAlign: "center",
            padding: "  0px",
              color: "white",
            marginTop:"10px"
          }}
        >
         
            <div style={{width:"40%",background:" ",display:"inline-block"}}
            >
              <div style={{fontSize:"18px"}}>
                <small style={{fontSize:"13px",color:"grey"}}>Ref ID</small>  
                <div><b style={{fontSize:"15px",color:"lightgrey"}}>AM-34F-JWK</b></div>
              </div>
            </div>

            <div style={{width:"40%",background:" ",display:"inline-block"}}
            >
              <div style={{fontSize:"18px"}}>
                <small style={{fontSize:"13px",color:"grey"}}>Ref ID</small> 
                <div><b  style={{fontSize:"15px",color:"lightgrey"}}>9011684637</b></div>
              </div>
            </div>


        </div>
      </div>

      <React.Fragment key="left">
        <Drawer
          anchor="left"
          open={drawerState["left"]}
          onClose={toggleDrawer("left", false, false)}
        >
          {list("left")}
          </Drawer>
          

           {/* Drawer to prompt users to put pin before seeing wallet balance */}
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
                  padding: "15px",
                  // background: "black",
                  color: "white",
                  //  marginBottom:"5px"
                }}
              >
                {pinVal()}
                {/* {pin} */}
                {verify()}
                <br />
                <div
                  style={{
                    color: "crimson",
                    height: "30px",
                    background: " ",
                    padding: "15px",
                  }}
                >
                  {pinError}
                </div>
              </div>
              {buttons()}
            </div>
          </Drawer>
      </React.Fragment>
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
