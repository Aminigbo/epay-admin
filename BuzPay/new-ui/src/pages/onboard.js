import React, { useState } from "react";
import { connect } from "react-redux";


import Logo from "../statics/assets/onboard.png"
import Logo2 from "../statics/assets/logo.png" 
import { Redirect, useHistory } from "react-router-dom";
import {loader } from "../components/loader" 
import { 
   disp_session,
} from "../redux";


const inputStyle = {
   height: "50px",
   width: "100%",
   padding: "10px"
}
const formSTyle = {
   width: "90%",
   marginLeft: "5%",
   marginTop: "75px"
}
function Login({
   appState, 
   set_session,
}) {




   const [values, setValues] = React.useState({
      amount: '',
      password: '',
      weight: '',
      weightRange: '',
      showPassword: false,
   });
 
   const [compState, setStates] = useState("") 
   let history = useHistory(); 
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
         <div style={formSTyle} noValidate autoComplete="off" >
            <div style={{ marginBottom: "60px", height: " ", textAlign: "center" }}> 
                <img src={Logo2} style={{ width: "80px",  }} /> <br />
               <img src={Logo} style={{ width: "201px", height: "160",marginTop:"30px" }} />
            </div>
            <div style={{textAlign:"center"}}>
               <b style={{
               position: 'static',
               left: '0%',
               right: ' 42.5%', 
               bottom: ' 62.03%',

               // fontFamily: 'Poppins',
               fontStyle: 'normal',
               fontWeight: ' 700',
               fontSize: ' 25px',
               lineHeight: '30px',
               textAlign:"center",
               letterSpacing: '-0.02em',

               color: '#073F74',
            }}>
              Pay seamlessly with <br /> BuzzPay
            </b>
            </div>
            
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
                 history.push("/login")
               }}
            >
               {" "}
               Log in{" "}
            </button>
            <div class=" " style={{ textAlign: "center", fontFamily: " ", marginTop: "30px" }}>
               <br />
               <span onClick={() => {
                  history.push("/signup")
               }}>dont have an account?   <b style={{ color: "#0a3d62" }}>Signup</b></span>{" "} 
            </div>
         </div>
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
