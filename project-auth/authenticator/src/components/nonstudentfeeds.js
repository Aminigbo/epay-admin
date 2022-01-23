import React, { useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import "../static/css/home/index.css";

import Header from "../components/includes/mobile_header.js"; 
import Cashbacknav from "../components/cashbacknav";   
 
function Home({ appState, login_suc }) { 
  const state = appState;     
  const [compState, setStates] = useState('');
 

  
  React.useEffect(() => {
    
  }, []);

 

 

  return state.loggedIn === false ? (
    <div>
      <Redirect to="/lockout" />
    </div>
  ) : (
    <div id="body bg">   
      <>  
        <div className="mobile">
          <div className="header_footer">
            {/* <Footer /> */}
            <Header />
          </div>

          <div>
            <div>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  background: " #f4f6f7",
                  position: "sticky",
                  top: "0px",
                  zIndex: "1100",
                  padding: "0px",
                }}
              >  
              </div>{" "}
              <Cashbacknav /> 
            </div>
          </div>
        </div>
  
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
