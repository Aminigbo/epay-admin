import React, {useState, useEfect, useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import HeaderLiner from "../header-liner";
import {supabase} from "../../supabaseClient";
import {globalContext} from "../../global-context";
import SiteLoader from "../site_loader";
import {generateAccessToken} from "../../handlers/vendorsHandler";
import Header from "../header";
import Footer from "../footer";
import MobileMenu from "../mobile-menu";

function VendorLogin() {
  const globalState = useContext(globalContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({email: "", password: ""});
  async function login() {
    setLoading(true);
    // let {user, session, error} = await supabase.auth.signIn({
    //   email: details.email,
    //   password: details.password,
    // });

    let {data: vendors, error} = await supabase
      .from("admin")
      .select("*")
      .match({email: details.email, password: details.password});

    if (error) {
      alert(error.message);
      setLoading(false);
    } else if (vendors.length > 0) {
      let [token, error] = await generateAccessToken(vendors[0].vendor_id);
      if (error) {
        alert("An error ocurred!");
      } else {
        localStorage.setItem(
          "afm_vendor_access_token",
          JSON.stringify({token, vendor_id: vendors[0].vendor_id})
        );
        globalState.setState(state => {
          return {...state, vendorDetails: vendors[0]};
        });
        alert("Login successful");
        navigate("/vendors/");
      }
    } else {
      alert("Invalid credencials");
      setLoading(false);
    }
  }
  return (
    <div action="/vendors/" className="auth-page">
      {/* <HeaderLiner /> */}
      {/* <Header/> */}
      <div className="auth-container">
        <SiteLoader show={loading} />
        <div className="page-title">Login as Vendor</div>

        <label>Email</label>
        <input
          type="text"
          className="field"
          value={details.email}
          onChange={e =>
            setDetails(state => ({...state, email: e.target.value}))
          }
        />

        <label>Password</label>
        <input
          type="password"
          className="field"
          value={details.password}
          onChange={e =>
            setDetails(state => ({...state, password: e.target.value}))
          }
        />

        <div className="terms-container">
          {/* <input type="checkbox" checked />
               Remember me */}
        </div>

        <div className="submit-btn-container">
          <button
            className="submit-btn"
            onClick={() => {
              if (details.email === "") {
                alert("email cannot be empty!");
              } else if (details.password === "") {
                alert("password cannot be empty!");
              } else {
                login();
              }
            }}
          >
            {!loading ? "Login" : "Please wait..."}
          </button>
        </div>

        {/* <div className="info-container">
          Not yet a Vendor?{" "}
          <Link to="/vendors/signup" className="link">
            Signup
          </Link>
        </div> */}
      </div>
      <MobileMenu/>
      {/* <Footer/> */}
    </div>
  );
}

export default VendorLogin;
