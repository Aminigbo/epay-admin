import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Link } from "react-router-dom";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../images/Logo.svg";
import { globalContext } from "../global-context";
import { isLoggedIn as CustomerIsLoggedIn } from "../handlers/customersHandler";
import { isLoggedIn as VendorIsLoggedIn } from "../handlers/vendorsHandler";
import { isLoggedIn as DeliveryIsLoggedIn } from "../handlers/deliveryHandler";
import Badge from "@mui/material/Badge";

function Header() {
  const globalState = useContext(globalContext);
  const [customerAuth, setCustomerAuth] = useState(false);
  const [vendorAuth, setVendorAuth] = useState(false);
  const [cartBadgeInvisibility, setCartBadgeInvisibility] = useState(false);
  const [searchField, setSearchField] = useState("");
  const navigate = useNavigate();

  const [accountDropdownStyle, setAccountDropdownStyle] = useState({
    display: "none",
  });
  const [accountDropdownState, setAccountDropdownState] = useState(false);

  function handleAccountDropdown() {
    if (accountDropdownState === false) {
      setAccountDropdownStyle({ display: "block" });
      setAccountDropdownState(true);
    } else if (accountDropdownState === true) {
      setAccountDropdownStyle({ display: "none" });
      setAccountDropdownState(false);
    }
  }

  useEffect(() => {
    checkCustomerAuth();
    checkVendorAuth();
    if (globalState.state.noOfCartItems === 0) {
      setCartBadgeInvisibility(true);
    }
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

  let pathname = window.location.pathname
  let split = pathname.split("/")[1]

  return (
    <div className="header">
      <div className="row1">
        <Link to="/" className="link">
          {/* <span className="logo-text"><span style={{color:"#FAC442"}}>Afra</span><br/><span style={{color:"#3bb77e"}}>Market</span></span> */}
          <img src={Logo} alt="logo" className="logo-image" />
        </Link>
      </div>
      <div className="row2">
        <form className="form-container">
          <input
            type="text"
            className="field"
            placeholder="What are you looking for?"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          />
          <button
            className="search-btn"
            onClick={() => {
              if (searchField === "") {
                alert("Please type something!");
              } else {
              }
              navigate(`/search/${searchField}`);
            }}
          >
            Search
          </button>
        </form>
      </div>
      <div className="row3">
        <nav>
          <ul>
            {/* <li>
              {vendorAuth ? (
                <Link to="/vendors/" className="link">
                  <div className="icon-container">
                    <PersonOutlineOutlinedIcon className="icon" />
                  </div>
                  <div className="text-container">My account</div>
                </Link>
              ) : (
                <Link to="/vendors/signup" className="link">
                  <div className="icon-container">
                    <PersonOutlineOutlinedIcon className="icon" />
                  </div>
                  <div className="text-container">Signup as Vendor</div>
                </Link>
              )}
            </li> */}
            <li>
              {customerAuth ? (
                <Link to="/customers/orders" className="link">
                  <div className="icon-container">
                    <PersonOutlineOutlinedIcon className="icon" />
                  </div>
                  <div className="text-container">My account</div>
                </Link>
              ) : (

                <>

                  {split == "vendors" ? <>
                    <Link to="/customers/login" className="link">
                      <div className="icon-container">
                        <PersonOutlineOutlinedIcon className="icon" />
                      </div>
                      <div className="text-container">Login as Customer</div>
                    </Link>
                  </> : <>
                    <Link to="/vendors/login" className="link">
                      <div className="icon-container">
                        <PersonOutlineOutlinedIcon className="icon" />
                      </div>
                      <div className="text-container">Login as Vendor</div>
                    </Link>
                  </>}
                  {console.log(split)}
                </>

              )}
            </li>
            <li>
              {vendorAuth ? (
                <Link to="/vendors/" className="link">
                  <div className="icon-container">
                    <PersonOutlineOutlinedIcon className="icon" />
                  </div>
                  <div className="text-container">My account</div>
                </Link>
              ) : (
                ""
              )}
            </li>
            <li>
              <Link to="/cart" className="link">
                <div className="icon-container">
                  <Badge
                    badgeContent={globalState.state.noOfCartItems}
                    color="primary"
                  >
                    <ShoppingBasketOutlinedIcon className="icon" />
                  </Badge>
                </div>
                <div className="text-container">Cart</div>
              </Link>
            </li>
            {/* <li>
              <span onClick={handleAccountDropdown}>
                <PersonOutlineOutlinedIcon className="icon" /> Signup as
                Customer
              </span>
              <div className="dropdown" style={accountDropdownStyle}>
                <div className="item">
                  <Link to="/customers/login" className="link">
                    Customer
                  </Link>
                </div>
                <div className="item">
                  <Link to="/vendors/login" className="link">
                    Vendor
                  </Link>
                </div>
              </div>
            </li> */}
            {/* <li>
              <Link to="/cart" className="link">
                {" "}
                <ShoppingBasketOutlinedIcon className="icon" /> My Basket (
                {globalState.state.noOfCartItems})
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
