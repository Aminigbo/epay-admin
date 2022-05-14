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
import Logo from "../statics/assets/logo.png"
import { KeyboardBackspace, ArrowRightAlt } from "@material-ui/icons";
import { Redirect, useHistory } from "react-router-dom";
import { loader } from "../components/loader"
import { session, clearCounterController } from "../controllers/checksession"
import { signinController } from "../controllers/auth"
import {
   login,
   disp_session,
   allKashback,
   transactions
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
   login_suc,
   set_session,
   dispAllKashbacks,
   disp_transactions
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




   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [compState, setStates] = useState("")
   const [ok, setok] = useState(0)
   const state = appState;
   let history = useHistory();
   let login = () => {
      let payload = {
         email,
         password,
         compState,
         setStates,
         login_suc,
         dispAllKashbacks,
         disp_transactions
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

         {
            state.loggedIn === true && history.push("/dashboard")}
         {compState.loading == true && loader()}
         {/* {clearCounterController()}
         {session(history)} */}
         {console.log(state)}
         <form style={formSTyle} noValidate autoComplete="off" >
            <div style={{ marginBottom: "60px", height: "30px", background: " " }}>
               <KeyboardBackspace onClick={() => {
                  history.push('/onboard')
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
               Welcome to Buzzpay
            </b> <br />
            <small>
               Complete your details below to continue to your  account
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


            <FormControl style={{ width: "100%", marginTop: "35px" }} variant="outlined">
               <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
               <OutlinedInput
                  onChange={(e) => {
                     setPassword(e.target.value);
                  }}
                  value={password}
                  required


                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  style={inputStyle}
                  // onChange={handleChange('password')}
                  endAdornment={
                     <InputAdornment position="end">
                        <IconButton
                           aria-label="toggle password visibility"
                           onClick={handleClickShowPassword}
                           onMouseDown={handleMouseDownPassword}
                           edge="end"
                        >
                           {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                     </InputAdornment>
                  }
                  label="Password"
               />
            </FormControl>
            <br /><br />
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
               Log in{" "}
            </button>
            <div onClick={() => {
               history.push("/resetpassword")
            }} class=" " style={{ textAlign: "center", fontFamily: " ", marginTop: "30px" }}>
               <br />
               <span>Forgot password?  <b style={{ color: "#0a3d62" }}>Reset Password</b></span>{" "}
            </div>
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
      login_suc: (data) => dispatch(login(data)),
      set_session: (time) => dispatch(disp_session(time)),
      dispAllKashbacks: (payload) => dispatch(allKashback(payload)),
      disp_transactions: (payload) => dispatch(transactions(payload)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
