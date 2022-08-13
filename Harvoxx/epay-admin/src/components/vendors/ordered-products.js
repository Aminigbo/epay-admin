import React, {useContext} from "react";
import {useParams} from "react-router-dom";
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
import {Link} from "react-router-dom";

function VendorOrderedProducts({session}) {
  const globalState = useContext(globalContext);
  const params = useParams();
  const order_id = params.order_id;
  return (
    <div className="vendor-dashboard">
      <HeaderLiner />
      <div className="dashboard">
        <Left session={session} />
        <div className={`right ${globalState.state.vendorDashboardRightClass}`}>
          <MenuBtn />
          <div className="vendor-orders">
            <div className="table">
              <h3 style={{padding: "20px 20px"}}>
                Ordered Products <b>"{order_id}"</b>
              </h3>
              <div className="title-container">
                <div>Image</div>
                <div>Product</div>
                <div>Product code</div>
                <div>Category</div>
                <div>Price</div>
                <div>availability</div>
                <div>Action</div>
              </div>
              <div class="body-container">
                <div class="box">
                  <div>
                    {" "}
                    <img
                      src={poweroil}
                      alt=""
                      className="image"
                      style={{width: "40px", height: "auto"}}
                    />
                  </div>
                  <div>Rice - 3k of bag</div>
                  <div>#HFIFS</div>
                  <div>Cereals</div>
                  <div>$11</div>
                  <div>In stock</div>
                  <div>
                    <CreateIconOutlined
                      class="edit-icon"
                      onClick={() => {
                        alert("clicked");
                      }}
                      style={{width: "20px", height: "auto"}}
                    />
                    <DeleteOutlineIcon
                      class="delete-icon"
                      onClick={() => {
                        alert("clicked");
                      }}
                      style={{width: "20px", height: "auto"}}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorOrderedProducts;
