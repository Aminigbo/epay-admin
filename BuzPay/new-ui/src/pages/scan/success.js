import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { successAlert } from "../../components/alert"

import {
   Backspace,
   KeyboardBackspace,
   HelpOutlineOutlined,
   ArrowForwardIosOutlined,
   CheckCircle
} from "@material-ui/icons";
import Naira from "react-naira";
import Logo from "../../statics/assets/logo.png"
import { FormControl, Drawer, Divider } from "@mui/material";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import { formatAMPM, daysOfTheWeek, monthsOfTheYear } from "../../Utilities/index"
import { loader } from "../../components/loader"
import { resolveKashbackController } from "../../controllers/scan/scan-to-accept"

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
   disp_noti,
   scannedData
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
   dispNoti,
   disp_scannedData
}) {

   const state = appState;
   const history = useHistory();
   const [compState, setStates] = useState("");
   const [resolved, setresolved] = useState(false)
   let User = userSessionService().user.user_metadata
   const Data = state.scannedData.data


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


   const resolveKashback = () => {
      const payload = {
         user: User,
         data: state.scannedData,
         setresolved,
         setStates, compState,
         login_suc
      }
      resolveKashbackController(payload)
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
         {clearCounterController()}
         {session(history, reauth)}
         {state.scannedData == false && history.push("/scan")}
         {/* { successAlert('clearRealtime', 'hello man', 'realtimeMsg')} */}
         <>
            {console.log(Data)}
            {compState.loading == true && loader()}

            {resolved == true &&
               <>
                  <div style={{ position: "fixed", background: "white", left: "0px", height: "100%", width: "100%", top: "0%", zIndex: "2000" }}>

                     <div style={{ marginBottom: "60px", height: "30px", background: " ", padding: "0px 15px",marginTop:"30px" }}>
                        <KeyboardBackspace onClick={() => {
                           history.push('/dashboard')
                        }} style={{ float: "left", fontSize: "30px" }} />
                        <img src={Logo} style={{ width: "80px", float: "right" }} />

                     </div>

                     <center style={{ marginTop: "10%", background: "", width: "", marginLeft: "", padding: "20px 0px", borderRadius: "6px" }}>
                        <CheckCircle style={{ fontSize: "120px", color: "mediumseagreen" }} />
                        {/* <img src={Logo} style={{ width: "30px", }} /> */}
                        <br /><br />

                        <div style={{ margin: "5px 20px", width: "70%", textAlign: "center" }}>
                           <b style={{ color: " ", fontSize: "15px" }}>Resolved from <br />
                              <b style={{ color: " ", fontSize: "19px" }}>{Data.sender.fullname}</b>
                           </b>
                           <br /><br />

                           <span style={{ fontSize: "19px" }}>₦</span><b style={{ fontSize: "35px", color: "#073F74" }}>
                              {separator(Data.data.amountPlusCharge - Data.data.adminCharge)}
                           </b> <br /><br />

                           <br /><br />

                        </div>
                     </center>

                     <div
                        onClick={() => {
                           disp_scannedData(false)
                           setresolved(false)
                           history.push(".scan")
                        }}
                        style={{
                           height: "38px", width: "90%", borderRadius: "8px", position: " ",
                           background: "#0C1825", padding: "10px 0px", marginTop: "90px", marginLeft: "5%", color: "white", textAlign: "center"
                        }}>
                        <div style={{ position: " ", marginTop: "4px", }}>
                           <b style={{ fontSize: "16px" }}>Done</b>
                        </div>

                     </div>
                  </div>
               </>}
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
                     ₦{separator(Data.data.amount)}
                  </b>  <br />
                  <b style={{ color: "green" }}>{Data.data.token}</b>
               </div>
               <div style={{ position: "absolute", top: "28%", width: "100%" }}>
                  <Divider /> <br /><br />

                  <div style={{ marginBottom: "20px", height: "30px", background: " ", padding: "0px 15px" }}>
                     <small style={{ color: "grey" }}>Payment method</small>
                     <span style={{ width: " ", float: "right" }} >ScanPay</span>
                  </div>
                  <div style={{ marginBottom: "20px", height: "30px", background: " ", padding: "0px 15px" }}>
                     <small style={{ color: "grey" }}>
                        User
                     </small>
                     <span style={{ width: "", float: "right" }} >
                        {Data.sender.fullname}
                     </span>
                  </div>
                  <div style={{ marginBottom: "20px", height: "30px", background: " ", padding: "0px 15px" }}>
                     <small style={{ color: "grey" }}>Date</small>
                     <span style={{ width: " ", float: "right" }} >{Data.date.month} {Data.date.date}.  {Data.date.year}</span>
                  </div>

                  <div style={{ marginBottom: "20px", height: "30px", background: " ", padding: "0px 15px" }}>
                     <small style={{ color: "grey" }}>Time</small>
                     <span style={{ width: " ", float: "right" }} >{Data.date.time}</span>
                  </div>

                  <div style={{ marginBottom: "20px", height: "30px", background: " ", padding: "0px 15px" }}>
                     <small style={{ color: "grey" }}>Kashback Charge</small>
                     <span style={{ width: " ", float: "right" }} >₦{Data.data.charge - Data.data.adminCharge}</span>
                  </div>

                  <div style={{ marginBottom: "20px", height: "30px", background: " ", padding: "0px 15px" }}>
                     <small style={{ color: "grey" }}>System Charge</small>
                     <span style={{ width: " ", float: "right" }} >₦{Data.data.adminCharge}</span>
                  </div>

                  <div style={{ marginBottom: "20px", height: "30px", background: " ", padding: "0px 15px" }}>
                     <small style={{ color: "grey" }}>Transaction ID</small>
                     <span style={{ width: " ", float: "right" }} >{Data.data.ref}</span>
                  </div>

                  <br />

                  <div
                     onClick={() => {
                        // setDrawerState({ ...drawerState, bottom: true });
                        resolveKashback()
                     }}
                     style={{
                        height: "38px", width: "90%", borderRadius: "8px", position: "relative",
                        background: "#0C1825", padding: "10px 0px", marginBottom: "20px", left: "5%", color: "white", textAlign: "center"
                     }}>
                     <div style={{ position: " ", marginTop: "4px", }}>
                        <b style={{ fontSize: "16px" }}>Accept Payment</b>
                     </div>
                     {/* <HelpOutlineOutlined style={{ position: "absolute", left: "25px", top: "20px" }} /> */}
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
      disp_scannedData: (data) => dispatch(scannedData(data)),


   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
