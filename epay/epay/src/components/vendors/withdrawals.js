import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import "./vendors.css";
import HeaderLiner from "../header-liner";
import Left from "./left";
import MenuBtn from "./menu-btn";
import { globalContext } from "../../global-context";
import poweroil from "../../images/poweroil.jpeg";
import CreateIconOutlined from "@mui/icons-material/CreateOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { getVendorProducts } from "../../handlers/vendorsHandler";
import { supabase } from "../../supabaseClient";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import SiteLoader from "../site_loader";
import { isLoggedIn } from "../../handlers/vendorsHandler";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "@mui/material/Button";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ContactlessOutlinedIcon from "@mui/icons-material/ContactlessOutlined";
const MySwal = withReactContent(Swal);

function Item({ withdrawals, setWithdrawals, item }) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  return (
    <tr>
      <td>{item.transaction_id}</td>
      <td>${item.amount}</td>
      <td>{item.payment_method}</td>
      <td>{item.payment_details}</td>
      <td>{item.status}</td>
      <td>{item.created_at}</td>
    </tr>
  );
}
function VendorWithdrawals({ session }) {
  const globalState = useContext(globalContext);
  const [withdrawals, setWithdrawals] = useState();
  const [loading, setLoading] = useState(true);
  const [newWithdrawalDisplay, setNewWithdrawalDisplay] = useState("none");
  const [details, setDetails] = useState();
  const [
    withdrawalPaymentDetailsPlaceholder,
    setWithdrawalPaymentDetailsPlaceholder,
  ] = useState("Enter Paypal address");
  const [withdrawalDetails, setWithdrawalDetails] = useState({
    amount: 0,
    payment_method: "Paypal",
    payment_details: "",
  });
  const navigate = useNavigate();
  var numberOfWithdrawals = 0;

  useEffect(() => {
    verifyLogin();
  }, []);

  var vendor_id;
  async function verifyLogin() {
    if (await isLoggedIn()) {
      vendor_id = JSON.parse(
        localStorage.getItem("afm_vendor_access_token")
      ).vendor_id;

      getDetails();
      getWithdrawals();
    } else {
      navigate("/vendors/login");
    }
  }

  async function getDetails() {
    setLoading(true);
    let { data: vendors, error } = await supabase
      .from("vendors")
      .select("*")
      .eq("vendor_id", vendor_id);
    if (error) {
      alert(error.message);
    } else {
      setDetails(vendors[0]);

      setLoading(false);
    }
  }

  async function getWithdrawals() {
    setLoading(true);
    let { data, error } = await supabase
      .from("withdrawals")
      .select("*")
      .eq("account_id", vendor_id);
    if (error) {
      alert(error.message);
    } else if (data) {
      setWithdrawals(data);
      setLoading(false);
    }
  }

  function handleWithdrawalPaymentDetailsPlaceholder(payment_method) {
    if (payment_method === "Paypal") {
      setWithdrawalPaymentDetailsPlaceholder("Enter Paypal Email");
    } else if (payment_method === "Bank Transfer") {
      setWithdrawalPaymentDetailsPlaceholder("Enter Bank Details");
    }
  }

  async function handleWithdrawal() {
    var transaction_id = Math.floor(Math.random() * 100000000);
    setLoading(true);
    vendor_id = JSON.parse(
      localStorage.getItem("afm_vendor_access_token")
    ).vendor_id;
    const { data, error } = await supabase.from("withdrawals").insert([
      {
        transaction_id,
        account_type: "vendor",
        account_id: vendor_id,
        amount: withdrawalDetails.amount,
        payment_method: withdrawalDetails.payment_method,
        payment_details: withdrawalDetails.payment_details,
        status: "pending",
      },
    ]);

    if (error) {
      alert(error.message);
      setLoading(false);
    } else if (data) {
      var new_balance = details.balance - withdrawalDetails.amount;
      const { data, error } = await supabase
        .from("vendors")
        .update({ balance: new_balance })
        .eq("vendor_id", vendor_id);

      if (error) {
        alert(error.message);
      } else if (data) {
        setLoading(false);
        setNewWithdrawalDisplay("none");
        let withdrawn = await MySwal.fire({
          title: <strong>Withdrawal successful</strong>,
          html: (
            <i>
              Your withdrawal request has been successfully submitted. we'll get
              back to you soon.
            </i>
          ),
          icon: "success",
          // showCancelButton: true,
          confirmButtonText: "Ok",
        });

        if (withdrawn.isConfirmed) {
          window.location.href = "/vendors/withdrawals";
        }
      }
    }
  }
  return (
    <div className="vendor-dashboard">
      <SiteLoader show={loading} />
      <HeaderLiner />
      <div className="dashboard">
        <Left page="withdrawals" />
        <div className={`right ${globalState.state.vendorDashboardRightClass}`}>
          <MenuBtn />
          <div className="vendor-withdrawals">
             <div style={{ width: "90%", margin: "auto", marginTop: "10px", marginBotton: "10px" }}>
               <a href="#" style={{textDecoration:"none"}}  onClick={() => navigate(-1)}> {"<<"} back</a>
            </div>
            <div
              className="new-withdrawal-background"
              style={{ display: newWithdrawalDisplay }}
            >
              <div className="box">
                <HighlightOffIcon
                  className="close-btn"
                  onClick={() => setNewWithdrawalDisplay("none")}
                />
                <div className="alert">
                  <ContactlessOutlinedIcon className="cancel-icon" />
                  Available balance: <b>${details ? details.balance : "..."}</b>
                  . Witthdrawal requests are processed within 48hours
                </div>
                <div className="form">
                  <label>Amount</label>
                  <input
                    type="number"
                    className="field"
                    placeholder="Enter Amount"
                    value={withdrawalDetails.amount}
                    onChange={(e) =>
                      setWithdrawalDetails((state) => ({
                        ...state,
                        amount: e.target.value,
                      }))
                    }
                  />

                  <label>Payment Method</label>
                  <select
                    className="select"
                    value={withdrawalDetails.payment_method}
                    onChange={(e) => {
                      handleWithdrawalPaymentDetailsPlaceholder(e.target.value);
                      setWithdrawalDetails((state) => ({
                        ...state,
                        payment_method: e.target.value,
                      }));
                    }}
                  >
                    <option>Paypal</option>
                    <option>Bank Transfer</option>
                  </select>

                  <label>Payment details</label>
                  <input
                    type="text"
                    className="field"
                    placeholder={withdrawalPaymentDetailsPlaceholder}
                    onChange={(e) =>
                      setWithdrawalDetails((state) => ({
                        ...state,
                        payment_details: e.target.value,
                      }))
                    }
                  />

                  <div className="submit-btn-container">
                    <button
                      className="submit-btn"
                      onClick={() => {
                        if (withdrawalDetails.amount <= 0) {
                          alert("Amount must be greater than zero");
                        } else if (isNaN(withdrawalDetails.amount)) {
                          alert("Amount must be a number");
                        } else if (
                          withdrawalDetails.amount > parseInt(details.balance)
                        ) {
                          alert(
                            `Amount cannot be greater than $${details.balance}`
                          );
                        } else if (withdrawalDetails.payment_details === "") {
                          alert("Payment details cannot be empty!");
                        } else {
                          handleWithdrawal();
                        }
                      }}
                    >
                      Withdraw
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="header-container">
              <div className="row1">
                {/* <span>All</span>
                      <span>Category</span> */}
              </div>
              <div className="row2">
                {/* <div className="search-container">
                  <button>
                    <SearchIcon style={{ width: "20px", height: "auto" }} />
                  </button>
                  <input
                    type="text"
                    placeholder="Search by name, category & product code"
                    onChange={(e) => {
                    //   handleSearch(e);
                    }}
                  />
                </div>
                <button className="add-new-btn">
                  <Link to="/vendors/add-product" className="link">
                    + New withdrawal
                  </Link>
                </button> */}
              </div>
            </div>
            <br />
            <div className="afm-table" style={{ width: "90%", margin: "auto" }}>
              <h3>Withdrawals</h3>
              <Button
                variant="contained"
                size="small"
                style={{
                  background: "rgba(60, 179, 114, 0.76)",
                  display: "inline",
                  margin: "10px 0px",
                }}
                onClick={() => setNewWithdrawalDisplay("flex")}
              >
                + New Withdrawal
              </Button>
              <table>
                <thead>
                  <th>Id</th>
                  <th>Amount</th>
                  <th>Payment method</th>
                  <th>Payment details</th>
                  <th>Status</th>
                  <th>Date</th>
                </thead>
                <tbody>
                  {withdrawals && !loading
                    ? withdrawals.map((item, index) => {
                        numberOfWithdrawals = numberOfWithdrawals + 1;
                        return (
                          <Item
                            key={index}
                            item={item}
                            withdrawals={withdrawals}
                            setWithdrawals={setWithdrawals}
                          />
                        );
                      })
                    : ""}
                </tbody>
              </table>
              {numberOfWithdrawals === 0 && !loading ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    color: "grey",
                    fontSize: "16px",
                    padding: "20px 0px",
                  }}
                >
                  No Withdrawals yet!
                </div>
              ) : (
                ""
              )}
              {loading ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    color: "grey",
                    fontSize: "16px",
                  }}
                >
                  <Loader
                    type="ThreeDots"
                    color="#3bb77e"
                    height={50}
                    width={50}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorWithdrawals;
