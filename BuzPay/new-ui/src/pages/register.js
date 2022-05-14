import React, { useState } from "react";
import { connect } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { Link, useHistory, Redirect } from "react-router-dom";
import { signupController } from "../controllers/auth"
import { login } from "../redux";
import { loader } from "../components/loader"
import {
   optionAlert,
   successAlert,
   errorAlert,
} from "../components/alert"


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
import { KeyboardBackspace } from "@material-ui/icons";


const inputStyle = {
   height: "55px",
   width: "100%",
   padding: "10px"
}
const formSTyle = {
   width: "90%",
   marginLeft: "5%",
   marginTop: "25px"
}


function Register({ appState, login_suc }) {
   let history = useHistory();
   const state = appState;




   const [values, setValues] = React.useState({
      amount: '',
      password: '',
      weight: '',
      weightRange: '',
      showPassword: false,
   });

   const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
   };

   const handleClickShowPassword = () => {
      setValues({
         ...values,
         showPassword: !values.showPassword,
      });
   };

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };





   // form states
   const [name, setName] = useState("");
   const [phone, setPhone] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [compState, setStates] = useState("");
   const [ref, setRef] = useState("")
   const [registered, setregistered] = useState(false)

   React.useEffect((compState) => {
      window.scrollTo(0, 0);
      // setStates({ ...compState, loader: true });
      setTimeout(() => setStates({ ...compState, loader: false }), 500);
   }, []);

   let signUp = () => {
      let payload = {
         name,
         phone,
         email,
         password,
         ref,
         setStates,
         compState,
         login_suc,
         setregistered
      }

      signupController(payload)
   }

   let action = () => {
      history.push('/OTP')
   }
   let message = "Account created successfully"



   const currencies = [
      {
         value: 'USD',
         label: '+234 ',
      }
   ];


   const [currency, setCurrency] = React.useState('EUR');



   return (
      <div>
         {registered == true && successAlert(action, message)} 
         {/* { successAlert(action, message)} */}
         {/* {loader()} */}
         {compState.loading == true && loader()}
         <div style={{ padding: "10px", textAlign: " " }}>
            <form style={formSTyle} noValidate autoComplete="off" >
               <div style={{ marginBottom: "25px", height: "30px", background: " " }}>
                  <KeyboardBackspace onClick={() => {
                     history.goBack()
                  }} style={{ float: "left", fontSize: "30px" }} />
                  <img src={Logo} style={{ width: "80px", float: "right" }} />
               </div>
               <b style={{
                  fontStyle: 'normal',
                  fontWeight: ' 700',
                  fontSize: ' 17px',
                  lineHeight: '30px',
                  letterSpacing: '-0.02em',
                  color: '#073F74',
               }}>
                  Create your Buzzpay account
               </b>
               <FormControl style={{ width: "100%", marginTop: "35px" }}>
                  <InputLabel htmlFor="component-outlined">Full name</InputLabel>
                  <OutlinedInput
                     style={inputStyle}
                     id="component-outlined"
                     onChange={(e) => {
                        setName(e.target.value);
                     }}
                     value={name}
                     required
                     label="Full name"
                  />
               </FormControl>

               <FormControl style={{ width: "100%", marginTop: "15px" }}>
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

               <div style={{ width: "30%", background: "", height: "45px", display: "inline-block", marginTop: "15px", marginRight: "5%" }}>
                  <TextField
                     style={{}}
                     id="outlined-select-currency"
                     select
                     value={currency}
                     SelectProps={{
                        native: true,
                     }}
                     variant="outlined"
                  >
                     {currencies.map((option) => (
                        <option key={option.value} value={option.value}>
                           {option.label}
                        </option>
                     ))}
                  </TextField>
               </div>

               <FormControl style={{ width: "65%", marginTop: "15px" }}>
                  <InputLabel htmlFor="component-outlined">Phone Number</InputLabel>
                  <OutlinedInput
                     style={inputStyle}
                     id="component-outlined"
                     onChange={(e) => {
                        setPhone(e.target.value);
                     }}
                     value={phone}
                     required
                     label="Phone Number"
                  />
               </FormControl>


               <FormControl style={{ width: "100%", marginTop: "15px" }} variant="outlined">
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

               <FormControl style={{ width: "100%", marginTop: "15px" }}>
                  <InputLabel htmlFor="component-outlined">Referrer  (Optional)</InputLabel>
                  <OutlinedInput
                     style={inputStyle}
                     id="component-outlined"
                     onChange={(e) => {
                        setRef(e.target.value);
                     }}
                     value={ref}
                     required
                     label="Referrer  (Optional)"
                  />
               </FormControl>


               <br />
               {compState.error == true && <><div style={{ color: "crimson", textAlign: "center", marginTop: "" }}>{compState.msg}</div></>}
               <br />
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
                     signUp()
                  }}
               >
                  {" "}
                  Continue{" "}
               </button>
               <div style={{ textAlign: "center", fontFamily: " ", marginTop: "10px", fontSize: "14px" }}>
                  <br />
                  <span>By continuing, you accept our
                     <b style={{ color: "#0a3d62" }}> Terms of Service and Privacy Policy</b></span>{" "}
               </div>
            </form>
         </div>
      </div>
   );
}

const mapStateToProps = (state) => {
   return {
      appState: state.user,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      login_suc: () => dispatch(login()),

   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
