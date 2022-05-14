import React, { useState } from "react";
import { connect } from "react-redux";
import { userSessionService, } from '../../services/auth'
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
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
import { loader } from "../../components/loader"
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

   let User = userSessionService()



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
         {state.authenticated === false && history.push("/")}
         {User=== null && history.push("/")}
         {console.log(User)}
         {compState.loading == true && loader()}
         {clearCounterController()}
         {session(history)}
         <form style={formSTyle} noValidate autoComplete="off" >
            <div style={{ marginBottom: "30px", height: "30px", background: " " }}>
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
               fontStyle: 'normal',
               fontWeight: ' 700',
               fontSize: ' 17px',
               lineHeight: '30px',
               /* identical to box height */

               letterSpacing: '-0.02em',

               color: '#0C1825',
            }}>
               Account Details
            </b> <br />
            <small>
               Update your account details
            </small>
            <br />
            <FormControl style={{ width: "100%", marginTop: "30px" }}>
               <InputLabel htmlFor="component-outlined">Full Name</InputLabel>
               <OutlinedInput
                  style={inputStyle}
                  id="component-outlined"
                  value={User !== null && User.user.user_metadata.name}
                  disabled
                  label="Email Adress"
               />
            </FormControl>

            <FormControl style={{ width: "100%", marginTop: "20px" }}>
               <InputLabel htmlFor="component-outlined">Email Adress</InputLabel>
               <OutlinedInput
                  style={inputStyle}
                  id="component-outlined"
                  onChange={(e) => {
                     setEmail(e.target.value);
                  }}
                  value={User !== null && `${User.user.email}`}
                  disabled
                  label="Email Adress"
               />
            </FormControl>

            <FormControl style={{ width: "100%", marginTop: "20px" }}>
               <InputLabel htmlFor="component-outlined">Phone Number</InputLabel>
               <OutlinedInput
                  style={inputStyle}
                  id="component-outlined"
                  value={User !== null && `+234${User.user.user_metadata.buzzID}`}
                  disabled
                  label="Email Adress"
               />
            </FormControl>

            <FormControl style={{ width: "100%", marginTop: "20px" }}>
               <InputLabel htmlFor="component-outlined">Home Adress</InputLabel>
               <OutlinedInput
                  style={inputStyle}
                  id="component-outlined"
                  onChange={(e) => {
                     setEmail(e.target.value);
                  }}
                  value={email}
                  required
                  label="Home Adress"
               />
            </FormControl>

            <FormControl fullWidth style={{ width: "100%", marginTop: "20px" }}>
               <InputLabel id="demo-simple-select-label">Your gender</InputLabel>
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Your gender"
                  // onChange={}
               >
                  <MenuItem value={`M`}>Male</MenuItem>
                  <MenuItem value={`F`}>Female</MenuItem> 
               </Select>
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
                  login();
               }}
            >
               {" "}
               Update Profile{" "}
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
