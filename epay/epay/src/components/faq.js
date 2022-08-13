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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";

function FaqBox({ id, title, content, faqClass, setFaqContent }) {
  const [display, setDisplay] = useState(faqClass);

  function handleDisplay() {
    if (display === "show") {
      setDisplay("hide");
    } else {
      setDisplay("show");
    }
  }
  return (
    <>
      <div className="box">
        <div className="title" onClick={() => handleDisplay()}>
          {title} <ArrowDropDownIcon className="icon" />
        </div>
        <div className={`content ${display}`}>{content}</div>
      </div>
    </>
  );
}
function Faq() {
  const navigate = useNavigate();

  const contents = [
    {
      id: 1,
      title: "What is Aframmarket",
      content: " best of their neighborhoods across the US.",
      class: "hide",
    },
    {
      id: 2,
      title: "How do i purchase",
      content: " best of their neighborhoods across the US.",
      class: "hide",
    },
    {
      id: 3,
      title: "How do i become a vendor",
      content: " best of their neighborhoods across the US.",
      class: "hide",
    },
    {
      id: 4,
      title: "How do i become a vendor",
      content: " best of their neighborhoods across the US.",
      class: "hide",
    },
    {
      id: 5,
      title: "How do i become a vendor",
      content: " best of their neighborhoods across the US.",
      class: "hide",
    },
  ];

  const [faqContent, setFaqContent] = useState(contents);

  return (
    <div className="faq">
      <HeaderLiner />
      <Header />
      <div className="top-section">
        <div className="title">FAQ</div>
        <div className="content">
          Aframmarket is a technology company that connects people with the best
          of their neighborhoods across the US. We enable local businesses to
          meet consumers’ needs of ease and convenience, and, in turn, generate
          new ways for people to earn, work, and live. By building the last-mile
          logistics infrastructure for local commerce, we’re fulfilling our
          mission to grow and empower local economies.
        </div>
      </div>

      <div className="faq-container">
        {faqContent.map((faq) => {
          return (
            <FaqBox
              id={faq.id}
              title={faq.title}
              content={faq.content}
              faqClass={faq.class}
              setFaqContent={setFaqContent}
            />
          );
          //   return <h1>Hey</h1>;
        })}
      </div>

      <Footer />
    </div>
  );
}

export default Faq;
