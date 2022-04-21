import "../../static/css/home/index.css";
import { Link } from "react-router-dom";
import React from "react";
import {
  Home,
  LocalAtm,
 AssignmentReturnedOutlined
} from "@material-ui/icons";
import { ImQrcode } from "react-icons/im";

import { connect } from "react-redux";

console.log(window.location.hash);
function Footer({ appState }, props) {
  const nav = (e) => {};

  window.addEventListener("hashchange", (e) =>
    console.log("hashchange1", window.location.hash)
  );
  return (
    <div id ='bottomNav'>

      <Link to="/nonstudentfeed" className="bottomnatChildren" onClick={(e) => { nav('/home');  window.scrollTo(0, 0);}} ><Home />  <br /> <div className="inline">Home</div> </Link>
      <Link to="/student-cashback" className="bottomnatChildren" onClick={(e) => { window.scrollTo(0, 0);}}><AssignmentReturnedOutlined /> <br /> <span className="inline">Cashback</span> </Link>
      <Link to="/buzzpay" className="bottomnatChildren" onClick={(e) => { nav('/buzzpay') ; window.scrollTo(0, 0); }}><LocalAtm />  <br /> <div className="inline"><span>Buzzme</span> </div> </Link> 
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
    // log_out: () => dispatch(logOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
