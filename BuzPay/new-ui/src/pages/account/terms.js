import React, { useState } from "react";
import { connect } from "react-redux";
import {
   HomeOutlined,
   SettingsOutlined,
   BarChartOutlined,
   ArrowForwardIosOutlined,
   Person,
   HelpOutlineOutlined,
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
               Terms & Condictions
            </b> <br />
            <small>
               Carefully read our Terms of use and Privacy Policy
            </small>
            <br />


            <div style={{ padding: " ", background: "  ", textAlign: "left", width: "", marginTop: "60px", color: "grey" }}>

               If you have one option, showcase it! If you have multiple options (chat, call, FAQ), list them out and represent each of their benefits. <br /> <br />

               Chat is great for a specific, complicated issue that needs an instant response. On the other hand, FAQ is great for standard questions that are easy to explain. <br /> <br />

               Also consider the order of the methods. A FAQ as the first option is great because it lets a user find their own answer without waiting on you to respond. But a
               direct chat can be seen as more convenient as it's less direct troubleshooting for the user. <br /> <br />

                If you have one option, showcase it! If you have multiple options (chat, call, FAQ), list them out and represent each of their benefits. <br /> <br />

               Chat is great for a specific, complicated issue that needs an instant response. On the other hand, FAQ is great for standard questions that are easy to explain. <br /> <br />

               Also consider the order of the methods. A FAQ as the first option is great because it lets a user find their own answer without waiting on you to respond. But a
               direct chat can be seen as more convenient as it's less direct troubleshooting for the user. <br /> <br />
               
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
