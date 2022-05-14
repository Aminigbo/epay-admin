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

   var QRCode = require("qrcode.react");





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
            >
               <div style={{ height: " 100px", background: " ", padding: "15px" }}>
                  <KeyboardBackspace onClick={() => {
                     history.goBack()
                  }} style={{ float: "left", fontSize: "30px" }} />
                  <img src={Logo} style={{ width: "80px", float: "right" }} />
                  <div style={{ position: "absolute", top: "65px", fontSize: "" }} >
                     <b style={{ fontSize: "19px", color: "#0C1825" }}>Kashback details</b>
                     <div>
                        <small>Kashback of ₦{separator(Data.data.data.amountPlusCharge)} </small>
                     </div>
                  </div>
               </div>


               <div
                  style={{
                     padding: "15px",
                     textAlign: "center"
                  }}
               >
                  <b style={{ fontSIze: "30px", fontWeight: 900 }}>
                     {Data.token}
                  </b> <br /> <br />
                  <QRCode value={Data.token.toString()} />
               </div>
               <div style={{ position: " ", marginTop: "15px", width: "100%" }}>
                  <Divider /> <br />

                  <div style={{ marginBottom: "17px", height: "30px", background: " ", padding: "0px 15px" }}>
                     <small style={{ color: "grey" }}>Amount</small>
                     <span style={{ width: " ", float: "right" }} >₦{separator(Data.data.data.amount)}</span>
                  </div>

                  <div style={{ marginBottom: "17px", height: "30px", background: " ", padding: "0px 15px" }}>
                     <small style={{ color: "grey" }}>Vendor's Charge</small>
                     <span style={{ width: " ", float: "right" }} >₦{separator(Data.data.data.charge - Data.data.data.adminCharge)}</span>
                  </div>

                  <div style={{ marginBottom: "17px", height: "30px", background: " ", padding: "0px 15px" }}>
                     <small style={{ color: "grey" }}>Service Charge</small>
                     <span style={{ width: " ", float: "right" }} >₦{separator(Data.data.data.adminCharge)}</span>
                  </div>

                  {Data.active == false && <>
                     <div style={{ marginBottom: "17px", height: "30px", background: " ", padding: "0px 15px" }}>
                        <small style={{ color: "grey" }}>
                          To
                        </small>
                        <span style={{ width: "", float: "right" }} >
                           {Data.data.receiver.Fullname}
                        </span>
                     </div>
                  </>}


                  <div style={{ marginBottom: "17px", height: "30px", background: " ", padding: "0px 15px" }}>
                     <small style={{ color: "grey" }}>Date</small>
                     <span style={{ width: " ", float: "right" }} >{Data.data.date.month} {Data.data.date.date}.  {Data.data.date.year}  &nbsp; {Data.data.date.time}</span>
                  </div>



                  <div style={{ marginBottom: "17px", height: "30px", background: " ", padding: "0px 15px" }}>
                     <small style={{ color: "grey" }}>Transaction ID</small>
                     <span style={{ width: " ", float: "right" }} >{Data.data.data.ref}</span>
                  </div> 

                  <div
                     onClick={() => {
                        setDrawerState({ ...drawerState, bottom: true });
                     }}
                     style={{ color: "white", textAlign: "center",background:"#0C1825",width:"60%",marginLeft:"20%",padding:"10px",borderRadius:"8px" }}>
                     <b style={{ fontSize: "15px", fontWeight: 900 }}>Share</b>

                  </div>

               </div>
            </div>

            <React.Fragment key="bottom">
               <Drawer
                  anchor="bottom"
                  open={drawerState["bottom"]}
                  onClose={toggleDrawer("bottom", false, false)}
               >

                  <div style={{ color: "grey", marginTop: "15px", textAlign: "center" }}>
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
