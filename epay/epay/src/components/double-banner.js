import React from "react";
import "../App.css";

function DoubleBanner() {
  return (
    <div className="double-banner-container">
      <div className="row1">
        <img src={""} alt="" />
        <div className="content">
          <div className="title">OTHER PRODUCTS</div>
          <div className="sub-title">
            See other products you just might be <br /> interested in!
          </div>
          <div className="action-btn-container">
            <button className="action-btn">Shop Now</button>
          </div>
        </div>
      </div>
      <div className="row2">
        <img src={""} alt="" />
        <div className="content">
          <div className="title">OTHER PRODUCTS</div>
          <div className="sub-title">
            See other products you just might be <br /> interested in!
          </div>
          <div className="action-btn-container">
            <button className="action-btn">Shop Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoubleBanner;
