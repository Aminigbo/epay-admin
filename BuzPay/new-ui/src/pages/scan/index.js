import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { successAlert } from "../../components/alert"
import { verifyTokenValidity } from "../../controllers/scan/scan-to-accept"
import {
   Backspace,
   KeyboardBackspace,
   HelpOutlineOutlined,
   ErrorOutlineOutlined

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
import QrReader from "react-qr-reader";
import {
   login,
   disp_session,
   re_auth,
   disp_realtime,
   disp_noti,
   scannedData
} from "../../redux";
import { transactionListener } from "../../controllers/realtime"


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
   const [compState, setStates] = useState({
      tokenData: {},
      tokenActive: false,
      error: false
   });
   const [hello, sethello] = useState(false)
   let User = userSessionService()

   const handleError = (err) => {
      console.error(err);
   };

   const handleScan = (data) => {
      if (data) {
         if (data.length != 6) {

         } else {
            let payload = {
               token: data,
               compState, setStates, setDrawerState, drawerState,
               history,
               disp_scannedData
            }
            setStates({
               ...compState,
               loading: true,
            })
            verifyTokenValidity(payload)
         }
      }
   };


   React.useEffect(() => {
      if (User == null) {
         // logOut()
         history.push("/login")
      } else if (state.userData == null) {
          history.push("/")
      } else {
         // reauth

         transactionListener(realtime, state.userData.buzzID, dispNoti)
      }


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
      if (state.realtime[0].response.meta.data) {

         return (
            <>
               <b>{state.realtime[0].response.type} Alert</b> <br />
               {state.realtime[0].response.type == "SCANPAY" && <><p>₦{separator(parseInt(state.realtime[0].response.meta.data.amountPlusCharge) - parseInt(state.realtime[0].response.meta.data.adminCharge))}</p></>}
               {state.realtime[0].response.type == "BUZZ ALERT" && <><p>₦{separator(state.realtime[0].response.meta.data.amount)}</p></>}
               <p>  from {state.realtime[0].response.meta.sender.fullname}</p>
            </>
         )
      }
   }




   const [drawerState, setDrawerState] = React.useState({
      bottom: false,
   });

   const toggleDrawer = (anchor, open, post) => (event) => {
      // console.log("okk");
      history.push("/dashbaord")
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
         {console.log(compState)}
         <>
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
                  <div style={{ position: "absolute", top: "65px", fontSize: "" }} >
                     <b style={{ fontSize: "19px", color: "#0C1825" }}>Scan Qr</b>
                     <div>
                        <small> Scan Qr code to either accept or make payment </small>
                     </div>
                  </div>
               </div>


               <div
                  style={{
                     textAlign: "center",
                     marginTop: "110px"
                  }}
               >
                  <br />
                  <div style={{ background: "", padding: "10px" }}>
                     <QrReader
                        style={{ width: "100%", height: "" }}
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        facingMode="user"
                     />
                  </div>
               </div>
               <HelpOutlineOutlined
                  onCLick={() => {
                     setDrawerState({ ...drawerState, buttom: true })
                  }}
                  style={{ position: "fixed", right: "20px", bottom: "10%", color: "#0C1825" }} />
            </div>

            <React.Fragment key="bottom">
               <Drawer
                  anchor="bottom"
                  open={drawerState["bottom"]}
                  onClose={toggleDrawer("bottom", false, false)}
               >

                  {compState.error === true &&
                     <>
                        <center style={{ marginTop: "10%", background: "", width: "", marginLeft: "", padding: "20px 0px", borderRadius: "6px" }}>
                           <ErrorOutlineOutlined style={{ fontSize: "120px", color: "crimson" }} />
                           {/* <img src={Logo} style={{ width: "30px", }} /> */}
                           <br /><br />

                           <div style={{ margin: "5px 20px", width: "70%", textAlign: "center" }}>
                              <b style={{ color: "crimson", fontSize: "15px" }}>{compState.errorMsg}<br />
                              </b>

                           </div>
                        </center>

                        <div
                           onClick={() => {
                              history.push("/dashboard")
                           }}
                           style={{
                              height: "38px", width: "90%", borderRadius: "8px", position: " ",
                              background: "#0C1825", padding: "10px 0px", marginTop: "90px", marginLeft: "5%", color: "white", textAlign: "center"
                           }}>
                           <div style={{ position: " ", marginTop: "4px", }}>
                              <b style={{ fontSize: "16px" }}>Ok</b>
                           </div>

                        </div>
                     </>}



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
      disp_scannedData: (data) => dispatch(scannedData(data)),
      reauth: () => dispatch(re_auth()),

   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
