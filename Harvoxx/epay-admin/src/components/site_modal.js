import React, {useState} from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

function SiteModal({show, setShow, title, body}) {
  return (
    <div className="site-modal" style={{display: `${show ? "flex" : "none"}`}}>
      <div className="site-modal-main">
        <div className="site-modal-title">
          {title}
          <CloseRoundedIcon
            className="site-modal-close-btn"
            onClick={() => {
              setShow(false);
            }}
          />
        </div>
        <div className="site-modal-body">{body}</div>
      </div>
    </div>
  );
}

export default SiteModal;
