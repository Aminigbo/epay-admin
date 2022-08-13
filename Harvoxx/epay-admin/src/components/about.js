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
import About1 from "../images/about1.jpg";
import About2 from "../images/about2.jpg";
import About3 from "../images/about3.jpg";
import About4 from "../images/about4.JPG";
import About5 from "../images/about5.jpg";
import About8 from "../images/about8.jpg";
import Logo from "../images/Logo.svg";
import store1 from "../images/store1.png";

// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";
function About() {
  const navigate = useNavigate();

  return (
    <div className="about">
      <HeaderLiner />
      <Header />
      <div className="who-we-are">
        <div className="title">Who we are</div>
        <div className="content">
          Aframmarket is a technology company that connects people with the best
          of their neighborhoods across the US. We enable local businesses to
          meet consumers’ needs of ease and convenience, and, in turn, generate
          new ways for people to earn, work, and live. By building the last-mile
          logistics infrastructure for local commerce, we’re fulfilling our
          mission to grow and empower local economies.
        </div>
      </div>

      <div className="who-we-serve">
        <div className="section-title">Who we serve</div>

        <div className="content-row reverse">
          <div className="row">
            <div className="title">Customers</div>
            <div className="content">
              With thousands of restaurants, convenience stores, pet stores,
              grocery stores, and more at your fingertips, DoorDash delivers the
              best of your neighborhood on-demand.
            </div>
            <div className="link-container">
              <Link to="welcome/" className="link">
                Start an order
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="image-container">
              <img src={About4} className="image" alt="" />
            </div>
          </div>
        </div>

        <div className="content-row">
          <div className="row">
            <div className="image-container">
              <img src={About5} className="image" alt="" />
            </div>
          </div>
          <div className="row">
            <div className="title">Merchants</div>
            <div className="content">
              Reach new customers, market your store, and grow your business by
              offering delivery, pickup, and direct online ordering with
              Aframmarket.
            </div>
            <div className="link-container">
              <Link to="vendors/signup" className="link">
                Signup now
              </Link>
            </div>
          </div>
        </div>

        <div className="content-row reverse">
          <div className="row">
            <div className="title">Riders</div>
            <div className="content">
              Delivering with Aframmarket means earning money when and how you
              want. Deliver long term or for a goal, and do it all on your own
              terms.
            </div>
            <div className="link-container">
              <Link to="delivery/signup" className="link">
                Deliver now
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="image-container">
              <img src={About8} className="image" alt="" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;
