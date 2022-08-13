import React, { useState, useContext } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import PlacesAutocomplete from "./placesAutocomplete";
import { globalContext } from "../global-context";
import { shortenLength } from "../handlers/cpHandler";

function HeaderLiner(props) {
  let {back} = props
  const navigate = useNavigate();
  const [region, setRegion] = useState("");
  const [formDisplay, setFormDisplay] = useState("none");
  const globalState = useContext(globalContext);

  function handleFormDisplay() {
    if (formDisplay === "none") {
      setFormDisplay("block");
    } else {
      setFormDisplay("none");
    }
  }
  return (
    <div className="header-liner" style={{ height: "30px", background: "" }}>  
      <span className="region">
        {globalState.state.globalRegion !== "" ? (
          <>
            <LocationOnIcon className="icon" />
            <span className="text" onClick={() => handleFormDisplay()}>
              {shortenLength(globalState.state.globalRegion, 10, "...")}
            </span>
            <ChevronRightRoundedIcon
              className="angle-icon"
              onClick={() => handleFormDisplay()}
            />
          </>
        ) : (
          ""
        )}

        <div className="form-container" style={{ display: formDisplay }}>
          <div style={{ padding: "3px 10px" }}>
            <LocationOnIcon className="icon" />
            <span>{globalState.state.globalRegion}</span>
          </div>
          <PlacesAutocomplete
            setSearchFieldValue={setRegion}
            containerClass={"centered-div"}
            inputClass={"field"}
            inputPlaceholder={"Enter delivery address"}
          />

          <div className="centered-div">
            <button
              className="search-btn"
              onClick={() => {
                if (region !== "") {
                  globalState.setState((state) => {
                    return {
                      ...state,
                      globalRegion: region,
                    };
                  });
                  localStorage.setItem("afm_region", region);
                  // navigate(`/search_by_region/${region}`);
                  window.location.href = `/search_by_region`;
                } else {
                  alert("A value must be entered");
                }
              }}
            >
              Search
            </button>
          </div>
        </div>
      </span>
      <nav>
        <ul> 
           <li onClick={() => navigate("/")}>Home</li>
           <li onClick={() => navigate("/about")}>About Us</li>
          <li onClick={() => navigate("/faq")}>FAQ</li>
          <li onClick={() => navigate("/contact")}>Contact / Support</li>
        </ul>
      </nav>
    </div>
  );
}

export default HeaderLiner;
