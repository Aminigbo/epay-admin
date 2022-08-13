import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import HeaderLiner from "../header-liner";
import {getDetails} from "../../handlers/vendorsHandler";
import {supabase} from "../../supabaseClient";
import SiteLoader from "../site_loader";

import {isLoggedIn} from "../../handlers/vendorsHandler";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

function VendorMyAccount() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [vendorId, setVendorId] = useState();
  const [password, setPassword] = useState({
    old: "",
    new: "",
  });
  const [details, setDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    shop_name: "",
    shop_url: "",
  });
  var vendor_id;

  useEffect(() => {
    verifyLogin();
  }, []);

  async function verifyLogin() {
    if (await isLoggedIn()) {
      setLoading(false);
      vendor_id = JSON.parse(
        localStorage.getItem("afm_vendor_access_token")
      ).vendor_id;
      setVendorId(vendor_id);
      getDetails();
    } else {
      navigate("/vendors/login");
    }
  }

  async function getDetails() {
    setLoading(true);
    let {data: vendors, error} = await supabase
      .from("vendors")
      .select("*")
      .eq("vendor_id", vendor_id);

    if (error) {
      alert(error.message);
    } else if (vendors) {
      setDetails(vendors[0]);
      setLoading(false);
    }
  }
  async function updateDetails() {
    setLoading(true);
    let {data, error} = await supabase
      .from("vendors")
      .update({
        firstname: details.firstname,
        lastname: details.lastname,
        email: details.email,
        phone: details.phone,
        shop_name: details.shop_name,
        shop_url: details.shop_url,
      })
      .eq("vendor_id", vendorId);

    if (error) {
      alert(error.message);
      setLoading(false);
    } else if (data) {
      setLoading(false);
      let updated = await MySwal.fire({
        title: <strong>Details updated!</strong>,
        html: <i>You have successfully updated your details.</i>,
        icon: "success",
        // showCancelButton: true,
        confirmButtonText: "Ok",
      });
    }
  }

  async function updatePassword() {
    setLoading(true);
    const {data, error} = await supabase
      .from("vendors")
      .update({
        password: password.new,
      })
      .eq("vendor_id", vendorId);

    if (error) {
      alert(error.message);
      setLoading(false);
    } else if (data) {
      setLoading(false);
      setDetails(state => {
        return {...state, password: password.new};
      });
      setPassword({new: "", old: ""});
      let updated = await MySwal.fire({
        title: <strong>Password updated!</strong>,
        html: <i>You have successfully updated your password.</i>,
        icon: "success",
        // showCancelButton: true,
        confirmButtonText: "Ok",
      });
    }
  }
  return (
    <div className="auth-page">
      <HeaderLiner />
      <div className="auth-container" style={{marginBottom: "30px"}}>
        <SiteLoader show={loading} />
        <div className="page-title">My account</div>

        <div className="double-field-container">
          <div className="row1">
            <div className="label">First Name</div>
            <div className="label">Lastname</div>
          </div>
          <div className="row2">
            <input
              type="text"
              value={details.firstname}
              className="field"
              onChange={e =>
                setDetails(state => ({...state, firstname: e.target.value}))
              }
            />
            <input
              type="text"
              className="field"
              value={details.lastname}
              onChange={e =>
                setDetails(state => ({...state, lastname: e.target.value}))
              }
            />
          </div>
        </div>

        <label>Phone Number</label>
        <input
          type="text"
          className="field"
          value={details.phone}
          onChange={e =>
            setDetails(state => ({...state, phone: e.target.value}))
          }
        />

        <label>Email address</label>
        <input
          type="text"
          className="field"
          value={details.email}
          onChange={e =>
            setDetails(state => ({...state, email: e.target.value}))
          }
        />

        <label>Shop Name</label>
        <input
          type="text"
          className="field"
          value={details.shop_name}
          onChange={e =>
            setDetails(state => ({...state, shop_name: e.target.value}))
          }
        />

        <label>Shop Url (Optional)</label>
        <input
          type="text"
          className="field"
          value={details.shop_url}
          onChange={e =>
            setDetails(state => ({...state, shop_url: e.target.value}))
          }
        />

        <div className="submit-btn-container">
          <button
            className="submit-btn"
            disabled={loading}
            onClick={() => {
              if (details.firstname === "") {
                alert("Firstname cannot be empty");
              } else if (details.lastname === "") {
                alert("Lastname cannot be empty");
              } else if (details.phone === "") {
                alert("Phone cannot be empty");
              } else if (details.email === "") {
                alert("Email cannot be empty");
              } else if (details.shop_name === "") {
                alert("Shop name cannot be empty");
              } else {
                updateDetails();
              }
            }}
          >
            {!loading ? "Update" : "Updating..."}
          </button>
        </div>
      </div>

      <div className="auth-container">
        <SiteLoader show={loading} />
        <div className="page-title">Change password</div>

        <label>Old password</label>
        <input
          type="text"
          className="field"
          value={password.old}
          onChange={e =>
            setPassword(state => ({...state, old: e.target.value}))
          }
        />

        <label>Confirm Password</label>
        <input
          type="text"
          className="field"
          value={password.new}
          onChange={e =>
            setPassword(state => ({...state, new: e.target.value}))
          }
        />

        <div className="submit-btn-container">
          <button
            className="submit-btn"
            disabled={loading}
            onClick={() => {
              if (password.old === "") {
                alert("Old password cannot be empty");
              } else if (password.new === "") {
                alert("New password cannot be empty");
              } else if (password.old !== details.password) {
                MySwal.fire({
                  title: <strong>Wrong password!</strong>,
                  html: <i>The old password you entered is incorrect.</i>,
                  icon: "warning",
                  confirmButtonText: "Ok",
                });
              } else {
                updatePassword();
              }
            }}
          >
            {!loading ? "Update password" : "Updating..."}
          </button>
        </div>
      </div>
    </div>
  );
}

export default VendorMyAccount;
