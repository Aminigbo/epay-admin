import React, {useState, useEffect, useContext} from "react";
import {useNavigate} from "react-router-dom";
import "../App.css";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {isLoggedIn as CustomerIsLoggedIn} from "../handlers/customersHandler";
import {isLoggedIn as VendorIsLoggedIn} from "../handlers/vendorsHandler";
import {isLoggedIn as DeliveryIsLoggedIn} from "../handlers/deliveryHandler";
import Badge from "@mui/material/Badge";
import {globalContext} from "../global-context";

function MobileMenu() {
  const [customerAuth, setCustomerAuth] = useState(false);
  const [vendorAuth, setVendorAuth] = useState(false);
  const globalState = useContext(globalContext);
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);
  function contactSupport() {
    MySwal.fire({
      title: <strong>Contact Support</strong>,
      html: <i>Our support info would soon be released</i>,
      icon: "info",
    });
  }

  const [accountDropdownStyle, setAccountDropdownStyle] = useState({
    display: "none",
  });
  const [accountDropdownState, setAccountDropdownState] = useState(false);

  function handleAccountDropdown() {
    if (accountDropdownState === false) {
      setAccountDropdownStyle({display: "block"});
      setAccountDropdownState(true);
    } else if (accountDropdownState === true) {
      setAccountDropdownStyle({display: "none"});
      setAccountDropdownState(false);
    }
  }

  useEffect(() => {
    checkCustomerAuth();
    checkVendorAuth();
  }, []);

  async function checkCustomerAuth() {
    if (await CustomerIsLoggedIn()) {
      setCustomerAuth(true);
    }
  }

  async function checkVendorAuth() {
    if (await VendorIsLoggedIn()) {
      setVendorAuth(true);
    }
  }
  return (
    <div className="mobile-menu">
      <div className="box">
        <Link to="/" className="link">
          <div className="icon-container">
            <HomeOutlinedIcon className="icon" />
          </div>
          <div className="text">Home</div>
        </Link>
      </div>
      <div className="box" onClick={() => contactSupport()}>
        <div className="icon-container">
          <HeadsetMicIcon className="icon" />
        </div>
        <div className="text">Support</div>
      </div>
      <div className="box">
        <Link to="/cart" className="link">
          <div className="icon-container">
            <Badge
              badgeContent={globalState.state.noOfCartItems}
              color="primary"
            >
              <ShoppingBasketOutlinedIcon className="icon" />
            </Badge>
          </div>
          <div className="text">Cart</div>
        </Link>
      </div>
      <div className="box">
        <div className="icon-container" onClick={handleAccountDropdown}>
          <PersonOutlineOutlinedIcon className="icon" />
        </div>
        <div
          className="text"
          onClick={async () => {
            if (await CustomerIsLoggedIn()) {
              navigate("/customers/orders/");
            } else if (await VendorIsLoggedIn()) {
              navigate("/vendors/");
            } else if (await DeliveryIsLoggedIn()) {
              navigate("/delivery/orders/");
            } else {
              navigate("/customers/login");
            }
          }}
        >
          Account
        </div>
        <div className="dropdown" style={accountDropdownStyle}>
          <div className="item">
            <Link
              to={`${customerAuth ? "/customers/orders" : "/customers/login"}`}
              className="link"
            >
              Customer
            </Link>
          </div>
          <div className="item">
            <Link
              to={`${vendorAuth ? "/vendors/" : "/vendors/login"}`}
              className="link"
            >
              Vendor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
