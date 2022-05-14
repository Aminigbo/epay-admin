import React, { useState } from "react";
import { connect } from "react-redux";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import {
   validateEmail,
} from "../Utilities/index"
import Logo from "../statics/assets/logo.png"
import { KeyboardBackspace } from "@material-ui/icons";
import { Redirect, useHistory } from "react-router-dom";
import { loader } from "../components/loader"
import { session, clearCounterController } from "../controllers/checksession"
import { resetpwdController } from "../controllers/auth"
import { 
   disp_session,
} from "../redux";


const inputStyle = {
   height: "55px",
   width: "100%",
   padding: "10px"
}
const formSTyle = {
   width: "90%",
   marginLeft: "5%",
   marginTop: "30px"
}
function Login({
   appState, 
   set_session,
}) {




   const [email, setEmail] = useState("");
   const [compState, setStates] = useState("")
   const state = appState;
   let history = useHistory();
   let login = () => {
      let payload = {
         email,
         compState,
         setStates
      }
      if (email.length < 1) {
         setStates({
            ...payload.compState,
            error: true,
            loading: false,
            msg: "Enter email",
         });
      } else if (validateEmail(email) == false) {
         setStates({
            ...payload.compState,
            error: true,
            loading: false,
            msg: "Invalid email",
         });
      } else {
          setStates({
            ...payload.compState,
            error: false,
            loading: false,
            msg: "",
         });
         resetpwdController(payload)
      }
   }
   React.useEffect((compState) => {
      window.scrollTo(0, 0);

      // clearCounterController()
      // session(history)
   }, []);



   return (
      <>

         {compState.loading == true && loader()}
         {/* {clearCounterController()}
         {session(history)} */}
         <form style={formSTyle} noValidate autoComplete="off" >
            <div style={{ marginBottom: "60px", height: "30px", background: " " }}>
               <KeyboardBackspace onClick={() => {
                  history.goBack()
               }} style={{ float: "left", fontSize: "30px" }} />
               <img src={Logo} style={{ width: "80px", float: "right" }} />
            </div>
            <b style={{
               position: 'static',
               left: '0%',
               right: ' 42.5%',
               top: '0%',
               bottom: ' 62.03%',

               // fontFamily: 'Poppins',
               fontStyle: 'normal',
               fontWeight: ' 700',
               fontSize: ' 17px',
               lineHeight: '30px',
               /* identical to box height */

               letterSpacing: '-0.02em',

               color: '#073F74',
            }}>
               Reset Password
            </b> <br />
            <small>
               Enter your email address to reset your password, a reset link will be sent to your mail.
            </small>
            <br />

            <br />
            <FormControl style={{ width: "100%", marginTop: "40px" }}>
               <InputLabel htmlFor="component-outlined">Email Adress</InputLabel>
               <OutlinedInput
                  style={inputStyle}
                  id="component-outlined"
                  onChange={(e) => {
                     setEmail(e.target.value);
                  }}
                  value={email}
                  required
                  label="Email Adress"
               />
            </FormControl>
            <br />
            {compState.error == true && <><div style={{ color: "crimson", textAlign: "center", marginTop: "" }}>{compState.msg}</div></>}
            <br /><br />
            <button
               type="button"
               style={{
                  background: "#0a3d62",
                  color: "white",
                  border: "none",
                  outline: "none",
                  padding: "7px 50px",
                  marginTop: "5px",
                  borderRadius: "6px",
                  width: "100%",
                  height: "42px"
               }}
               onClick={(e) => {
                  login();
               }}
            >
               {" "}
               Reset Password
            </button>
         </form>
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
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
