import React, { useState } from "react";
import { connect } from "react-redux";

import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Logo from "../../statics/assets/logo.png"
import { KeyboardBackspace } from "@material-ui/icons"; 
import { Redirect, useHistory } from "react-router-dom";
import {loader } from "../../components/loader"
import { session, clearCounterController } from "../../controllers/checksession"
import { signinController } from "../../controllers/auth"
import {
   login,
   disp_session,
} from "../../redux";


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
   login_suc,
   set_session,
}) {




   const [values, setValues] = React.useState({
      amount: '',
      password: '',
      weight: '',
      weightRange: '',
      showPassword: false,
   });

   

   const handleClickShowPassword = () => {
      setValues({
         ...values,
         showPassword: !values.showPassword,
      });
   };

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };




   const [currentpin, setcurrentpin] = useState("");
   const [newpin1, setnewpin1] = useState("");
   const [newpin2, setnewpin2] = useState("")
   const [compState, setStates] = useState(0)
   const state = appState;
   let history = useHistory();
   let update = () => {
      let payload = { 
         compState,
         setStates,
         login_suc
      }
      signinController(payload)
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
            <div style={{ marginBottom: "30px", height: "30px", background: " " }}>
               <KeyboardBackspace onClick={() => {
                  history.goBack()
               }} style={{float:"left",fontSize:"30px"}} />
               <img src={Logo} style={{ width: "80px", float: "right" }} />
            </div>
            <b style={{
               position: 'static',
               left: '0%',
               right: ' 42.5%',
               top: '0%',
               bottom: ' 62.03%', 
               fontStyle: 'normal',
               fontWeight: ' 700',
               fontSize: ' 17px',
               lineHeight: '30px',
               /* identical to box height */

               letterSpacing: '-0.02em',

               color: '#0C1825',
            }}>
               Transaction pin
            </b> <br />
            <small>
             Manage your transaction pin
            </small>
            <br /> 
            <FormControl style={{ width: "100%",marginTop:"60px" }}>
               <InputLabel htmlFor="component-outlined">Current Pin</InputLabel>
               <OutlinedInput
                  style={inputStyle}
                  id="component-outlined"
                   onChange={(e) => {
                     setcurrentpin(e.target.value);
                  }}
                  value={currentpin}
                  // disabled
                  label="Current Pin"
               />
            </FormControl> 

             <FormControl style={{ width: "100%",marginTop:"20px" }}>
               <InputLabel htmlFor="component-outlined">New Pin</InputLabel>
               <OutlinedInput
                  style={inputStyle}
                  id="component-outlined"
                  onChange={(e) => {
                     setnewpin1(e.target.value);
                  }}
                  value={newpin1}
                  // disabled
                  label="New Pin"
               />
            </FormControl> 

             <FormControl style={{ width: "100%",marginTop:"20px" }}>
               <InputLabel htmlFor="component-outlined">Confirm New Pin</InputLabel>
               <OutlinedInput
                  style={inputStyle}
                   onChange={(e) => {
                     setnewpin2(e.target.value);
                  }}
                  id="component-outlined"
                  value={newpin2}
                   
                  label="Confirm New Pin"
               />
            </FormControl>  


            <br /><br />
            {compState.error == true && <><div style={{ color: "crimson", textAlign: "center", marginTop: "" }}>{compState.msg}</div></>}
            <br /><br />
            <button
               type="button"
               style={{
                  background: "#0C1825",
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
                  update();
               }}
            >
               {" "}
               Update{" "}
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
      login_suc: (userMetadata) => dispatch(login(userMetadata)),
      set_session: (time) => dispatch(disp_session(time)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
