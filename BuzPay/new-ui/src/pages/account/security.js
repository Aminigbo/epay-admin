import React, { useState } from "react";
import { connect } from "react-redux";
import {
   HomeOutlined,
   SettingsOutlined,
   BarChartOutlined,
   ArrowForwardIosOutlined,
   FiberPin,
   Face,
   LibraryBooksOutlined,
   EmailOutlined,
   LockOutlined
} from "@material-ui/icons";
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
         {compState.loading == true && loader()}
         {/* {clearCounterController()}
         {session(history)} */}
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
              Security
            </b> <br />
            <small>
              Manage your account security
            </small>
            <br />


            <div style={{ padding: " ", background: "  ", textAlign: "left", width: "", marginTop: "60px", color: "white" }}>

               <div style={{
                  height: "34px", width: "100%", borderRadius: "8px", position: "relative",
                  background: "#0C1825", padding: "20px 0px", marginBottom: "20px", textAlign: " "
               }}>
                  <div style={{ position: "absolute", left: "78px", }}>
                     <b style={{ fontSize: "16px" }}>Transaction Pin</b> 
                  </div>
                  <FiberPin style={{ position: "absolute", left: "25px", }} />
                  <ArrowForwardIosOutlined style={{ position: "absolute", right: "15px", }} />

               </div>

               <div style={{
                  height: "34px", width: "100%", borderRadius: "8px", position: "relative",
                  background: "#0C1825", padding: "20px 0px", marginBottom: "20px", textAlign: " "
               }}>
                  <div style={{ position: "absolute", left: "78px", }}>
                     <b style={{ fontSize: "16px" }}>Face ID</b> 
                  </div>
                  <Face style={{ position: "absolute", left: "25px", }} />
                  <ArrowForwardIosOutlined style={{ position: "absolute", right: "15px", }} />

               </div> 
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
      login_suc: (userMetadata) => dispatch(login(userMetadata)),
      set_session: (time) => dispatch(disp_session(time)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
