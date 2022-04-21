import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";
import { FcLeftDown,FcRightUp ,FcBarChart} from "react-icons/fc";
import { Divider } from "@mui/material";
import { add_wallet, logOut, loginSuc } from "../redux";
import Naira from "react-naira";
// @======== ALLL BUZZME CONTROLLER
import { getAllBuzz } from "../functions/controllers/allbuzzme";
import { getAllCashback } from "../functions/controllers/allcashback";
function Home({ appState }) {
  const state = appState;
  let userId = "";
  if (state.loggedIn === true) {
    userId = state.loggedInUser.user.id;
  }

  const [compState, setStates] = useState({
    data: [],
    value: "",
    done: false,
    miniLoad: false,
    wallethidden: true,
    confirmpwderror: null,
    confirmpwderrormsg: "",
    error: null,
  });

  const [buzzState, setBuzzState] = useState({
    leading: false,
    data: [],
  });

  const [cashbackstate, setCashbackstate] = useState({
    leading: false,
    data: [],
  });

  React.useEffect(() => {
    getAllBuzz(userId, buzzState, setBuzzState);
    getAllCashback(userId, cashbackstate, setCashbackstate);
    window.scrollTo(0, 0);
    setStates({
      ...compState,
      loading: false,
      wallethidden: true,
    });
  }, []);

  return state.loggedIn === false ? (
    <div>
      <Redirect to="/login" />
    </div>
  ) : (
    <div id="body bg">
      <div
          style={{ 
            marginBottom:"70px"
        }}
        >
         
          <div style={{ marginTop: "30px",}}>
             <Divider   />
            <div style={{ color: "gray", padding: "10px 25px" }} >
            <FcBarChart style={{fontSize:"35px"}}/> <b>Inflow -  Outflow summary</b></div> 
        </div>

        <div  style={{ 
          padding: "15px 25px", 
        }}>
          <b> Buzz  <FcLeftDown /></b>{" "}
            <div style={{width:"50%",backgroundColor:" ",float:"right",textAlign:"left"}}>
              <b >
            {buzzState.loading === true ? (
              <small style={{ fontSize: "11px" }}>Fetching.....</small>
            ) : (
              <>
                {" "}
                <b style={{fontSize:"15px"}}><Naira>{buzzState.data.to}</Naira> </b>
              </>
            )}
          </b>
          </div>
        </div>
       <Divider   />

        <div  style={{ 
          padding: "15px 25px", 
        }}>
            <b>Buzz  <FcRightUp /></b>{" "}
            <div style={{ width: "50%", backgroundColor: " ", float: "right", textAlign: "left" }}>
              <b>
            {buzzState.loading === true ? (
              <small style={{ fontSize: "11px" }}>Fetching.....</small>
            ) : (
              <>
                {" "}
                <b style={{fontSize:"15px"}}><Naira>{buzzState.data.from}</Naira> </b>{" "}
              </>
            )}
          </b>

            </div>
          
        </div>
        <Divider />

        <div  style={{ 
          padding: "15px 25px", 
        }}>
          <b>Cashback  <FcLeftDown /></b>{" "}

            <div style={{ width: "50%", backgroundColor: " ", float: "right", textAlign: "left" }}>
               <b >
            {buzzState.loading === true ? (
              <small style={{ fontSize: "11px" }}>Fetching.....</small>
            ) : (
                  <>
                    {/* {console.log(cashbackstate)} */}
                    <b style={{ fontSize: "15px" }}><Naira>{cashbackstate.data.to}</Naira> </b>{" "}
                    {console.log(cashbackstate)}
              </>
            )}
          </b>
           </div>
         
        </div>
       <Divider />

        <div  style={{ 
          padding: "15px 25px", 
        }}>
            <b>Cashback  <FcRightUp /></b> {" "}
            <div style={{ width: "50%", backgroundColor: " ", float: "right", textAlign: "left" }}>
               <b >
            {buzzState.loading === true ? (
              <small style={{ fontSize: "11px" }}>Fetching.....</small>
            ) : (
              <>
                {" "}
                <b style={{fontSize:"15px",color:"red"}}><Naira>{cashbackstate.data.from}</Naira> </b> {" "}
              </>
            )}
            {/* cashbackstate */}
          </b>
             </div>
         
        </div> 
      </div>
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
    walletAdd: (wallet) => dispatch(add_wallet(wallet)),
    logout: () => dispatch(logOut()),
    login_suc: (userMetadata) => dispatch(loginSuc(userMetadata)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
