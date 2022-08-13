import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import Footer from "./footer";
import HeroImage1 from "../images/hero1.jpeg";
import HeroImage2 from "../images/hero2.jpg";
import HeroImage3 from "../images/hero3.jpg";
import HeroImage4 from "../images/hero4.jpg";
import Logo from "../images/Logo.svg";
import BikeImage from "../images/bike1.svg";
import CustomerImage from "../images/customer1.svg";
import VendorImage from "../images/vendor1.svg";
import store1 from "../images/store1.png";
import vegitables1 from "../images/vegitables1.png";
import vegitables2 from "../images/vegitables2.png";
import delivery1 from "../images/delivery1.png";
import delivery2 from "../images/delivery2.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
// import PlacesAutocomplete from "./places_autocomplete";
import PlacesAutocomplete from "./placesAutocomplete";
import { globalContext } from "../global-context";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";
function Welcome() {
  const [signupDisplay, setSignupDisplay] = useState("none");
  const [loginDisplay, setLoginDisplay] = useState("login");
  const [searchFieldValue, setSearchFieldValue] = useState();
  const [region, setRegion] = useState();
  const navigate = useNavigate();
  const globalState = useContext(globalContext);

  const searchField = useRef();
  useEffect(() => {}, []);

  function showSignup() {
    setLoginDisplay("none");
    setSignupDisplay("block");
  }

  function showLogin() {
    setSignupDisplay("none");
    setLoginDisplay("block");
  }

  function close() {
    setSignupDisplay("none");
    setLoginDisplay("none");
  }
  return (
    <div className="welcome">
      <div className="hero">
        <img src={HeroImage3} alt="" className="image-overlay" />
        <div className="header">
          <img src={Logo} alt="Logo" className="logo" />
          <div className="btns-container">
            <button
              className="signin-btn"
              onClick={() => {
                navigate("/customers/login");
              }}
            >
              Sign In
            </button>
            <button
              className="signup-btn"
              onClick={() => {
                navigate("/customers/signup");
              }}
            >
              Sign Up
            </button>
          </div>
          <div
            className="select-account-type-container"
            style={{ display: signupDisplay }}
          >
            <Link to="/customers/signup" className="link">
              Signup as Customer
            </Link>
            <Link to="/vendors/signup" className="link">
              Signup as Vendor
            </Link>
            <Link to="/delivery/signup" className="link">
              Signup as Rider
            </Link>
            <div className="close">
              <span style={{ cursor: "pointer" }} onClick={() => close()}>
                <u>Close</u>
              </span>
            </div>
          </div>

          <div
            className="select-account-type-container"
            style={{ display: loginDisplay }}
          >
            <Link to="/customers/login" className="link">
              Login as Customer
            </Link>
            <Link to="/vendors/login" className="link">
              Login as Vendor
            </Link>
            <Link to="/delivery/login" className="link">
              Login as Rider
            </Link>
            <div className="close">
              <span style={{ cursor: "pointer" }} onClick={() => close()}>
                <u>Close</u>
              </span>
            </div>
          </div>
        </div>

        <div className="title">
          African Food stuffs and more <br />
          Delivered to your doors
        </div>
        <div className="search-field-container">
          <div className="search-field">
            <div className="row1">
              <button className="icon">
                <LocationOnIcon />
              </button>
            </div>

            {/* <PlacesAutocomplete setSearchFieldValue={setSearchFieldValue} setRegion={setRegion} /> */}
            <PlacesAutocomplete
              containerClass={`row2`}
              inputClass={`field`}
              inputPlaceholder={"Enter delivery address"}
              setSearchFieldValue={setSearchFieldValue}
            />

            <div className="row3">
              <button
                className="icon"
                onClick={() => {
                  // console.log("Your location: " + searchFieldValue);
                  globalState.setState((state) => {
                    return {
                      ...state,
                      globalRegion: searchFieldValue,
                    };
                  });
                  localStorage.setItem("afm_region", searchFieldValue);
                  window.location.href = `/search_by_region`;
                  // navigate(`/search_by_region/${searchFieldValue}`);
                  // navigate(`/search_by_region/${region}`);
                }}
              >
                <ArrowForwardRoundedIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="info-container">
        <div className="box">
          <div className="image-container">
            <img src={vegitables1} alt="" className="image" />
          </div>
          <div className="title">Become a Customer</div>
          <div className="content">
            Keep track of all your orders from one place. checkup delivery
            status easily
          </div>
          <Link to="/customers/signup" className="link">
            Create account <ArrowForwardRoundedIcon className="icon" />
          </Link>
        </div>

        <div className="box">
          <div className="image-container">
            <img src={store1} alt="" className="image" />
          </div>
          <div className="title">Become a Vendor</div>
          <div className="content">
            Become a Vendor and sell your products on AfraMarket. Make money
            from anywhere
          </div>
          <Link to="/vendors/signup" className="link">
            Start selling <ArrowForwardRoundedIcon className="icon" />
          </Link>
        </div>

        <div className="box">
          <div className="image-container">
            <img src={delivery2} alt="" className="image" />
          </div>
          <div className="title">Become a Rider</div>
          <div className="content">
            As a delivery rider, you'll make reliable money - working anytime,
            anywhere.
          </div>
          <Link to="/delivery/signup" className="link">
            Start earning <ArrowForwardRoundedIcon className="icon" />
          </Link>
        </div>
      </div>

      <div className="how-it-works">
        <div className="title">How It Works</div>
        <div className="box-container">
          <div className="box">
            <div className="icon-container">
              <button className="icon">1</button>
            </div>
            <div className="title">Set delivery location</div>
            <div className="description">
              Setup your preferred delivery location so we know where we're
              delivering to.
            </div>
          </div>

          <div className="box">
            <div className="icon-container">
              <button className="icon">2</button>
            </div>
            <div className="title">Choose the product</div>
            <div className="description">
              Setup your preferred delivery location so we know where we're
              delivering to.
            </div>
          </div>

          <div className="box">
            <div className="icon-container">
              <button className="icon">3</button>
            </div>
            <div className="title">Receive it at your doorstep</div>
            <div className="description">
              Setup your preferred delivery location so we know where we're
              delivering to.
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Welcome;
