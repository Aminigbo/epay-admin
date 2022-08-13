import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function SiteLoader({show}) {
  return (
    <div className="site-loader" style={{display: `${show ? "flex" : "none"}`}}>
      <Loader type="ThreeDots" color="#3bb77e" height={50} width={50} />
    </div>
  );
}

export default SiteLoader;
