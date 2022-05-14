import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { successAlert } from "../../components/alert"

import {
   Backspace,
   KeyboardBackspace,
   HelpOutlineOutlined,
   ArrowForwardIosOutlined,
} from "@material-ui/icons";
import Naira from "react-naira";
import Logo from "../../statics/assets/logo.png"
import { FormControl, Drawer, Divider } from "@mui/material";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import { formatAMPM, daysOfTheWeek, monthsOfTheYear } from "../../Utilities/index"
import { loader } from "../../components/loader"
// import buzz me request controllers
import { verifyBeneficiaryController, initiateBuzzmeController } from "../../controllers/buzzme/send"
import { initializeBuzzRequesrController } from "../../controllers/buzzme/request"
import { userSessionService, } from '../../services/auth'
import { fetchUsers } from '../../services/users'
import { session, clearCounterController } from "../../controllers/checksession"
import {
   login,
   disp_session,
   re_auth,
   disp_realtime,
   disp_noti
} from "../../redux";
import { transactionListener } from "../../controllers/realtime"


const rec_inputs = {
   // width: "97%",
   padding: "8px",
   height: "70px",
   border: "0.5px solid lightgrey",
   color: "grey",
   outline: "none",
   fontSize: "13px",
   resize: "none",
   borderRadius: "5px",
   margin: "25px"
};

function Home({
   appState,
   login_suc,
   realtime,
   reauth,
   dispNoti
}) {

   const state = appState;
   const history = useHistory();
   const [compState, setStates] = useState("");
   const [hello, sethello] = useState(false)
   let User = userSessionService().user.user_metadata
   const Data = state.viewTransaction


   React.useEffect(() => {
      transactionListener(realtime, state.userData.buzzID, dispNoti)


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
            {console.log(Data)}
            {compState.loading == true && loader()}
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

               </div>


               <div
                  style={{
                     padding: "15px",
                     // background: "lightgray",
                     color: "",
                     position: "absolute",
                     top: "8%",
                     width: "100%",
                     textAlign: "center",
                     left: "0px"
                  }}
               >
                  <div>
                     <small style={{ color: "grey" }}>Amount</small>
                  </div>
                  <b style={{ opacity: "1", color: "#0a3d62", fontSize: "35px" }}>
                     ₦{separator(Data.meta.data.amount)}
                  </b>  <br />
                  <small style={{ color: "green" }}>Transaction successful</small>
               </div>
               <div style={{ position: "absolute", top: "28%", width: "100%" }}>
                  <Divider /> <br /><br /><br />

                  <div style={{ marginBottom: "20px", height: "30px", background: " ", padding: "0px 15px" }}>
                     <small style={{ color: "grey" }}>Payment method</small>
                     <span style={{ width: " ", float: "right" }} >Cashback</span>
                  </div>
                  <div style={{ marginBottom: "20px", height: "30px", background: " ", padding: "0px 15px" }}>
                     <small style={{ color: "grey" }}>
                        {Data.from == User.buzzID ? <>
                           To
                        </> : <>
                           From
                        </>}
                     </small>
                     <span style={{ width: "", float: "right" }} >
                        {Data.from == User.buzzID ? <>
                           {Data.meta.receiver.Fullname}
                        </> : <>
                           {Data.meta.sender.fullname}
                        </>}
                     </span>
                  </div>
                  <div style={{ marginBottom: "20px", height: "30px", background: " ", padding: "0px 15px" }}>
                     <small style={{ color: "grey" }}>Date</small>
                     <span style={{ width: " ", float: "right" }} >{Data.meta.date.month} {Data.meta.date.date}.  {Data.meta.date.year}</span>
                  </div>

                  <div style={{ marginBottom: "20px", height: "30px", background: " ", padding: "0px 15px" }}>
                     <small style={{ color: "grey" }}>Time</small>
                     <span style={{ width: " ", float: "right" }} >{Data.meta.date.time}</span>
                  </div>

                  <div style={{ marginBottom: "20px", height: "30px", background: " ", padding: "0px 15px" }}>
                     <small style={{ color: "grey" }}>Charge</small>
                     <span style={{ width: " ", float: "right" }} >₦{Data.type == "SCANPAY" ? Data.meta.data.charge - Data.meta.data.adminCharge : "0.00"}</span>
                  </div>

                  <div style={{ marginBottom: "20px", height: "30px", background: " ", padding: "0px 15px" }}>
                     <small style={{ color: "grey" }}>Transaction ID</small>
                     <span style={{ width: " ", float: "right" }} >89177453649</span>
                  </div>

                  <br />

                  <div
                     onClick={() => {
                        setDrawerState({ ...drawerState, bottom: true });
                     }}
                     style={{
                        height: "38px", width: "90%", borderRadius: "8px", position: "relative",
                        background: "#0C1825", padding: "10px 0px", marginBottom: "20px", left: "5%", color: "white"
                     }}>
                     <div style={{ position: "absolute", left: "78px", }}>
                        <b style={{ fontSize: "16px" }}>Report transaction</b>
                        <div style={{ marginTop: "5px", color: "rgba(255, 255, 255, 0.5)", fontSize: "12px" }}><span>
                           Report issues with this transaction</span></div>
                     </div>
                     <HelpOutlineOutlined style={{ position: "absolute", left: "25px", top: "20px" }} />
                     <ArrowForwardIosOutlined style={{ position: "absolute", right: "15px", top: "20px" }} />

                  </div>

               </div>
            </div>

            <React.Fragment key="bottom">
               <Drawer
                  anchor="bottom"
                  open={drawerState["bottom"]}
                  onClose={toggleDrawer("bottom", false, false)}
               >

                  <div style={{color:"grey",marginTop:"15px",textAlign:"center"}}>
                     <b >
                        Write to us, we will treat as urgent.
                     </b>
                  </div>
                  <textarea
                     cols="40"
                     rows="20"
                     onChange={(e) => {
                        // setReason(e.target.value);
                     }}
                     // value={reason}
                     style={rec_inputs}
                     placeholder="Enter your request reason *"
                  ></textarea>

                  <div style={{ textAlign: "center" }}>
                     <input
                        onClick={() => {
                           // sendToDefault()
                        }}
                        type="button"
                        value="SEND"
                        style={{
                           padding: "10px",
                           outline: "none",
                           width: "150px",
                           background: "#0C1825",
                           border: "0.5px solid crimson",
                           color: "white",
                           borderRadius: "6px",
                           //   margin: "10px 19px",
                           fontWeight: "bold",
                           margin: "10px",
                        }}
                     />
                     <br /><br /><br />
                  </div>

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
