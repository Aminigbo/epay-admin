import React from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import Playstore from "../images/playstore.svg";
import Apple from "../images/apple.svg";

function Footer() {
  const navigate = useNavigate();
  return (
    <div className="footer">
      <div className="row">
        <div className="title">About us</div>
        <div className="content">
          Aframarket is an online store providing local foodstuff to customers
          nation wide.
          <br />
          <br />
          Get your foodstuff delivered to you in no time by shopping with us
        </div>
        <div className="icons-container">
          <img src={Playstore} className="playstore" alt="playstore" />
          <img src={Apple} className="apple" alt="apple" />
        </div>
      </div>
      <div className="row">
        <div className="title">Get Help</div>
            <div
          className="content"
          onClick={() => (window.location.href = "/")}
        >
          Home
        </div>
        <div
          className="content"
          onClick={() => (window.location.href = "/about")}
        >
          About Us
        </div>
        <div
          className="content"
          onClick={() => (window.location.href = "/contact")}
        >
          Contact Us
        </div>
        <div
          className="content"
          onClick={() => (window.location.href = "/faq")}
        >
          FAQ
        </div>
        {/* <div className="content">Payment options</div> */}
      </div>
      <div className="row">
        <div className="title">Accounts</div>
        <div className="content">
          <Link to="/customers/signup" className="link">
            Become a Customer
          </Link>
        </div>
        <div className="content">
          <Link to="/vendors/signup" className="link">
            Become a vendor
          </Link>
        </div>
        <div className="content">
          <Link to="/delivery/signup" className="link">
            Become a Rider
          </Link>
        </div>
        {/* <div className="content">Payment options</div> */}
      </div>
      <div className="row">
        <div className="title">Social Media</div>
        <div className="content">Facebook</div>
        <div className="content">Instagram</div>
        <div className="content">Twiiter</div>
      </div>
    </div>
  );
}

export default Footer;
