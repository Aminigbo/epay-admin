import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderLiner from "../header-liner";
import { getDetails } from "../../handlers/vendorsHandler";
import { supabase } from "../../supabaseClient";
import SiteLoader from "../site_loader";
import { generateAccessToken } from "../../handlers/vendorsHandler";
import uuid from "react-uuid";
import ReCAPTCHA from "react-google-recaptcha";
import PlacesAutocomplete from "../placesAutocomplete";
import Header from "../header";
import Footer from "../footer";
import MobileMenu from "../mobile-menu";

function VendorSignup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [shopRegion, setShopRegion] = useState();
  const [details, setDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    shop_name: "",
    shop_url: "",
    password: "",
    confirm_password: "",
  });

  const [recaptchaToken, setRecaptchaToken] = useState();

  useEffect(() => {

    getSettings()

  }, []);



  const [checked1, setChecked1] = React.useState(null);
  async function getSettings() {
    setLoading(true);
    let { data: data, error } = await supabase
      .from("settings")
      .select("data");

    if (error) {
      setLoading(false);
      alert(error.message);
    } else if (data) {
      setLoading(false);
      let response = data[0].data;
      setChecked1(response.allowVendor)
    }
  }



  async function signUp() {
    var vendor_id = uuid();
    setLoading(true);
    let { data: vendors, error } = await supabase
      .from("vendors")
      .select("*")
      .eq("email", details.email);
    if (error) {
      alert(error.message);
    } else {
      if (vendors.length === 0) {
        // vendor does not exist

        let { data, error } = await supabase.from("vendors").insert([
          {
            vendor_id,
            firstname: details.firstname,
            lastname: details.lastname,
            email: details.email,
            phone: details.phone,
            password: details.password,
            shop_name: details.shop_name,
            shop_url: details.shop_url,
            shop_region: shopRegion,
            balance: 0,
            total_earnings: 0,
            is_admin: "no",
            image: "",
            verification_status: "not verified",
          },
        ]);

        if (error) {
          alert(error.message);
          setLoading(false);
        } else if (data) {
          //signup successful
          let [token, error] = await generateAccessToken(vendor_id);
          if (error) {
            alert(error.message);
            setLoading(false);
          } else {
            localStorage.setItem(
              "afm_vendor_access_token",
              JSON.stringify({ token, vendor_id })
            );
            navigate("/vendors/");
          }
        }
      } else {
        // vendor exist
        alert("Email already in use!");
        setLoading(false);
      }
    }
  }

  function handleRecaptcha(value) {
    console.log("Captcha value:", value);
    setRecaptchaToken(value);
  }

  return (
    <div className="auth-page">
      <HeaderLiner />
      <Header />
      <div className="auth-container">
        <SiteLoader show={loading} />
        <div className="page-title">Become a Vendor</div>

        <form method="POST" onSubmit={(e) => {
          e.preventDefault()
          if (details.password != details.confirm_password) {
            alert("Password do not match");
          } else if (!recaptchaToken) {
            alert("Recaptcha invalid");
          } else {
            signUp();
            // alert("signing up");
          }
        }}>
          <div className="double-field-container">
            <div className="row1">
              <div className="label">First Name</div>
              <div className="label">Lastname</div>
            </div>
            <div className="row2">
              <input
                required
                type="text"
                value={details.firstname}
                className="field"
                onChange={(e) =>
                  setDetails((state) => ({ ...state, firstname: e.target.value }))
                }
              />
              <input
                required
                type="text"
                className="field"
                value={details.lastname}
                onChange={(e) =>
                  setDetails((state) => ({ ...state, lastname: e.target.value }))
                }
              />
            </div>
          </div>

          <label>Phone Number</label> <br></br>
          <select
            className="field"
            style={{ padding: "9px 5px", borderRadius: "3px", marginRight: "10px", border: 'none', width: "75px" }}>
            <option>
              +1
            </option>
          </select>
          <input
            style={{ width: " 70%" }}
            maxlength="11"
            required
            type="text"
            className="field"
            value={details.phone}
            onChange={(e) => {
              if (e.target.value.length < 11) {
                setDetails(state => ({ ...state, phone: e.target.value }))
              }
            }
            }
          />

          <label>Email address</label>
          <input
            required
            type="email"
            className="field"
            value={details.email}
            onChange={(e) =>
              setDetails((state) => ({ ...state, email: e.target.value }))
            }
          />

          <label>Shop Name</label>
          <input
            required
            type="text"
            className="field"
            value={details.shop_name}
            onChange={(e) =>
              setDetails((state) => ({ ...state, shop_name: e.target.value }))
            }
          />

          <label>Shop Url (Optional)</label>
          <input
            required
            type="text"
            className="field"
            value={details.shop_url}
            onChange={(e) =>
              setDetails((state) => ({ ...state, shop_url: e.target.value }))
            }
          />

          <label>Shop Region (*)</label>
          <PlacesAutocomplete
            inputClass={`field`}
            containerClass={``}
            inputPlaceholder={"Enter address"}
            setSearchFieldValue={setShopRegion}
          />

          <label>Password</label>
          <input
            required
            type="password"
            className="field"
            value={details.password}
            onChange={(e) =>
              setDetails((state) => ({ ...state, password: e.target.value }))
            }
          />

          <label>Confirm Password</label>
          <input
            required
            type="password"
            className="field"
            value={details.confirm_password}
            onChange={(e) =>
              setDetails((state) => ({
                ...state,
                confirm_password: e.target.value,
              }))
            }
          />


          <div className="terms-container">
            {/* <input type="checkbox" checked />I have agreed to{" "} */}
            {/* <Link to="/" className="link">
            Terms of serice
          </Link>{" "}
          and{" "}
          <Link to="/" className="link">
            privacy policy
          </Link> */}
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "5px",
            }}
          >
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
              onChange={handleRecaptcha}
            />
          </div>
          <div className="submit-btn-container">
            {checked1 == true ? <>
              <button
                className="submit-btn"
                disabled={loading}
                type="submit"
              >
                {!loading ? "Signup" : "Loading..."}
              </button></> : <>
              <button
                className="submit-btn"
                disabled
                style={{ opacity: "0.3", cursor: "no-drop" }}
                type="button"
              >
                Signup is unavailable
              </button></>}

          </div>

        </form>

        <div className="info-container">
          Already a Vendor?{" "}
          <Link to="/vendors/login" className="link">
            Login
          </Link>
        </div>
      </div>
      <MobileMenu />
      <Footer />
    </div>
  );
}

export default VendorSignup;
