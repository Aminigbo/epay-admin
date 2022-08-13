  import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {globalContext} from "../../global-context";
import "../../App.css";
import {Link} from "react-router-dom";

function Left({page}) {
  const globalState = useContext(globalContext);
  const navigate = useNavigate();

  return (
    <div className={`left ${globalState.state.vendorDashboardLeftClass}`}>
      <ul>
        <Link to="/" className="link">
          <li className={`${page === "home" ? "active" : ""}`}>
            <button>Dashboard</button>
          </li>
        </Link>
        <Link to="/vendors/my-orders" className="link">
          <li className={`${page === "my-orders" ? "active" : ""}`}>
            <button>My Orders</button>
          </li>
        </Link>
        <Link to="/vendors/my-products" className="link">
          <li
            className={`${page === "my-products" ? "active" : ""} ${
              page === "add-product" ? "active" : ""
            }`}
          >
            <button>My Products</button>
          </li>
        </Link>
        {/* <Link to="/vendors/verifications" className="link">
          <li className={`${page === "verifications" ? "active" : ""} `}>
            <button>Verifications</button>
          </li>
        </Link> */}
        <Link to="/vendors/withdrawals" className="link">
          <li className={`${page === "withdrawals" ? "active" : ""} `}>
            <button>Withdrawals</button>
          </li>
        </Link>

        <Link to="/vendors/my-account" className="link">
          <li className={`${page === "my-account" ? "active" : ""} `}>
            <button>My Account</button>
          </li>
        </Link>


        <li>
          <button
            className="logout"
            onClick={() => {
              localStorage.setItem("afm_vendor_access_token", null);
              navigate("/vendors/login");
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Left;
