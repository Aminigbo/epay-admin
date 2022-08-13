import React, {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import "../../App.css";
import "./vendors.css";
import HeaderLiner from "../header-liner";
import Left from "./left";
import MenuBtn from "./menu-btn";
import {globalContext} from "../../global-context";
import poweroil from "../../images/poweroil.jpeg";
import CreateIconOutlined from "@mui/icons-material/CreateOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import {supabase} from "../../supabaseClient";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

function Order({order}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openAction, setOpenAction] = useState(false);
  return (
    <div class="box">
      <div>{order.order_id}</div>
      <div>
        <button className="pending-btn outlined">{order.status}</button>
      </div>
      <div>{order.date}</div>
      <div>
        <Link
          to={`/vendors/ordered_products/${order.order_id}`}
          className="link"
        >
          <button className="success-btn">
            products
            {/* <DoubleArrowIcon style={{width: "10px"}} /> */}
          </button>
        </Link>
      </div>
      <div>
        {" "}
        <button className="danger-btn">
          customer
          {/* <DoubleArrowIcon /> */}
        </button>
      </div>

      <div>
        <MoreHorizIcon />
      </div>
    </div>
  );
}
function VendorOrders({session}) {
  const [orders, setOrders] = useState();
  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    let {data: orders, error} = await supabase.from("orders").select("*");

    if (error) {
      alert(error.message);
    } else if (orders) {
      setOrders(orders);
    }
  }
  const globalState = useContext(globalContext);
  return (
    <div className="vendor-dashboard">
      <HeaderLiner />
      <div className="dashboard">
        <Left session={session} />
        <div className={`right ${globalState.state.vendorDashboardRightClass}`}>
          <MenuBtn />
          <div className="vendor-orders">
            <div className="table">
              <h3 style={{padding: "20px 20px"}}>My Orders</h3>
              <div className="title-container">
                <div>OrderID</div>
                <div>Status</div>
                <div>Date</div>
                <div>Products</div>
                <div>Customer</div>
                <div>Action</div>
              </div>
              <div class="body-container">
                {orders ? (
                  orders.map(order => {
                    return <Order order={order} />;
                  })
                ) : (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorOrders;
