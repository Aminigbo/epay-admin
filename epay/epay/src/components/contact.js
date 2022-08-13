import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import HeaderLiner from "./header-liner";
import Header from "./header";
import Footer from "./footer";
import HeroImage1 from "../images/hero1.jpeg";
import HeroImage2 from "../images/hero2.jpg";
import HeroImage3 from "../images/hero3.jpg";
import HeroImage4 from "../images/hero4.jpg";
import Logo from "../images/Logo.svg";
import store1 from "../images/store1.png";

// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";
function Contact() {
  const navigate = useNavigate();

  return (
    <div className="contact">
      <HeaderLiner />
      <Header />
      <div className="top-section">
        <div className="title">Contact Us</div>
        <div className="content">
          Aframmarket is a technology company that connects people with the best
          of their neighborhoods across the US. We enable local businesses to
          meet consumers’ needs of ease and convenience, and, in turn, generate
          new ways for people to earn, work, and live. By building the last-mile
          logistics infrastructure for local commerce, we’re fulfilling our
          mission to grow and empower local economies.
        </div>
      </div>

      <div className="form-section">
        <div className="left">
          <div className="image-container">
            <img src={HeroImage2} className="image" alt="" />
          </div>
        </div>
        <div className="right">
          <form>
            <div className="double-field-container">
              <input type="text" className="field1" placeholder="Firstname" />
              <input type="text" className="field2" placeholder="Lastname" />
            </div>
            <div className="double-field-container">
              <input type="text" className="field1" placeholder="Email" />
              <input type="text" className="field2" placeholder="Phone" />
            </div>
            <div className="single-field-container">
              <input type="text" className="field" placeholder="Subject" />
            </div>
            <div className="single-field-container">
              <textarea placeholder="Type your message here.."></textarea>
            </div>
            <div className="submit-btn-container">
              <button className="submit-btn">Submit</button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
