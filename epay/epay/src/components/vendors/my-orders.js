import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import CircularProgress from "@mui/material/CircularProgress";
import SiteLoader from "../site_loader";
import SiteModal from "../site_modal";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { supabase } from "../../supabaseClient";
import { isLoggedIn } from "../../handlers/vendorsHandler";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const MySwal = withReactContent(Swal);

function DeliveryBox({ delivery, product, order, setLoading, details }) {
  var pickup_address = "";
  // const [pickupAddress, setPickupAddress] = useState("");


  useEffect(() => {
    getSettings()
  }, []);

  const [percentage, setpercentage] = React.useState(0);
  const [delivery_cost, setdelivery_cost] = React.useState(0);


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
      setpercentage(response.deliveryPer)


      let perc = response.deliveryPer * parseInt(product.price) / 100; 
      setdelivery_cost(perc)

      console.log(perc)

    }
  }






  async function select() {

    // console.log(delivery)
    // console.log(product)



    setLoading(true);
    const { data, error } = await supabase
      .from("delivery_person_orders")
      .insert([
        {
          delivery_person_id: delivery.delivery_person_id,
          order_id: order.order_id,
          product_id: order.product_id,
          ordered_product_id: order.id,
          pickup_address,
          status: "Pending",
          delivery_cost: delivery_cost
        },
      ]);

    if (error) {
      alert(error.message);
      setLoading(false);
    } else if (data) {
      let { data, error } = await supabase
        .from("ordered_products")
        .update({ status: "Awaiting pickup" })
        .eq("id", order.id);

      if (error) {
        alert(error.message);
        setLoading(false);
      } else if (data) {
        setLoading(false);
        let selected = await MySwal.fire({
          title: <strong>Delivery Selected</strong>,
          html: <i>You have successfully selected this delivery personnel</i>,
          icon: "success",
          confirmButtonText: "Ok",
        });

        if (selected.isConfirmed) {
          window.location.href = "/vendors/my-orders";
        }
        if (selected.isDismissed) {
          window.location.href = "/vendors/my-orders";
        }
      }
    }
  }

  return (
    <div
      className="box"
      onClick={async () => {
        console.log(delivery_cost)
        let { isConfirmed, value: pickupAddress } = await MySwal.fire({
          title: <strong>Procceed?</strong>,
          html: (
            <i>
              You are about to select this delivery personnel to come pick up
              your item to deliver at ${delivery_cost}.. do you wish to continue?
            </i>
          ),
          icon: "info",
          showCancelButton: true,
          cancelButtonText: "No",
          confirmButtonText: "Yes",
          input: "text",
          inputLabel: "Enter your pickup location:",
          inputValue: details.shop_region,
          inputValidator: (value) => {
            if (!value) {
              return "You need to add a pickup location";
            }
          },
        });
        if (pickupAddress) {
          pickup_address = pickupAddress;

        }
        if (isConfirmed) {
          // select();
        }
      }}
    >
      <div className="row1">
        <button className="indicator"></button>
      </div>
      <div className="row2">
        <div className="name">
          {`${delivery.firstname} ${delivery.lastname}`},
        </div>
        <div className="location">{`${delivery.region}`}</div>
      </div>
    </div>
  );
}
function Order({ order, setLoading, details }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showPopper, setShowPopper] = useState(false);
  const [product, setProduct] = useState();
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [closestDelivery, setClosestDelivery] = useState();
  const [otherDelivery, setOtherDelivery] = useState();

  useEffect(() => {
    getProduct();
  }, []);


  async function getProduct() {
    let { data: products, error } = await supabase
      .from("products")
      .select("*")
      .eq("product_id", order.product_id);

    if (error) {
      alert(error.message);
    } else if (products[0]) {
      setProduct(products[0]);
    }
  }

  async function getClosestDelivery() {
    let { data: delivery_persons, error } = await supabase
      .from("delivery_persons")
      .select("*")
      .eq("region", product.region);
    if (delivery_persons) {
      setClosestDelivery(delivery_persons);
      // getDeliveries();
    }
  }

  async function getOtherDelivery() {
    let { data: delivery_persons, error } = await supabase
      .from("delivery_persons")
      .select("*")
      .not("region", "eq", product.region);
    if (delivery_persons) {
      setOtherDelivery(delivery_persons);
      // getDeliveries();
    }
  }

  async function cancel() {
    let cancelDelivery = await MySwal.fire({
      title: <strong>Cancel delivery assignment?</strong>,
      html: (
        <i>
          Are you sure you want to cancel this delivery assignment to this
          personnel?
        </i>
      ),
      icon: "info",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    });

    if (cancelDelivery.isConfirmed) {
      setLoading(true);
      let { data, error } = await supabase
        .from("delivery_person_orders")
        .update({ status: "Rejected" })
        .match({
          order_id: order.order_id,
          product_id: order.product_id,
          ordered_product_id: order.id,
          status: "Pending",
        });

      if (error) {
        alert(error.message);
        setLoading(false);
      } else if (data) {
        let { data, error } = await supabase
          .from("ordered_products")
          .update({ status: "Pending" })
          .match({ id: order.id });

        if (error) {
          alert(error.message);
          setLoading(false);
        } else if (data) {
          setLoading(false);
          let cancelled = await MySwal.fire({
            title: <strong>Delivery Cancelled!</strong>,
            html: <i>You have cancelled this delivery assignment</i>,
            icon: "info",
            confirmButtonText: "Ok",
          });

          if (cancelled.isConfirmed) {
            window.location.href = "/vendors/my-orders";
          }
          if (cancelled.isDismissed) {
            window.location.href = "/vendors/my-orders";
          }
        }
      }
    }
  }

  var noOfClosestDelivery = 0;
  var noOfOtherDelivery = 0;

  return (
    <>
      {/* {"delivery modal start"} */}
      <div
        className="site-modal"
        style={{ display: `${showDeliveryModal ? "flex" : "none"}` }}
      >
        <div className="site-modal-main">
          <div className="site-modal-title">
            Assign Delivery
            <CloseRoundedIcon
              className="site-modal-close-btn"
              onClick={() => {
                setShowDeliveryModal(false);
              }}
            />
          </div>
          <div className="site-modal-body">
            <div className="assign-delivery-container">
              <div className="assign-delivery-title">
                Around {product ? product.region : "..."}
              </div>
              {closestDelivery ? (
                closestDelivery.map((delivery, index) => {
                  noOfClosestDelivery = noOfClosestDelivery + 1;
                  return (
                    <DeliveryBox
                      key={index}
                      delivery={delivery}
                      product={product}
                      order={order}
                      setLoading={setLoading}
                      details={details}
                    />
                  );
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
              {noOfClosestDelivery === 0 && closestDelivery ? (
                <div className="" style={{ color: "grey" }}>
                  <i>
                    We could not find any delivery personnel in
                    {product ? " " + product.region : "..."}
                  </i>
                </div>
              ) : (
                ""
              )}

              <div className="assign-delivery-title">Other places</div>
              {otherDelivery ? (
                otherDelivery.map((delivery, index) => {
                  noOfOtherDelivery = noOfOtherDelivery + 1;
                  return (
                    <DeliveryBox
                      key={index}
                      delivery={delivery}
                      product={product}
                      order={order}
                      setLoading={setLoading}
                      details={details}
                    />
                  );
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
              {noOfOtherDelivery === 0 && otherDelivery ? (
                <>
                  <div className="" style={{ color: "grey" }}>
                    <i>We could not find other delivery personnels</i>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      {/* {"delivery modal end"} */}
      <tr>
        {product ? (
          <>
            <td>{order.order_id}</td>
            <td>
              <img
                src={
                  process.env.REACT_APP_IMAGES_STORAGE_BUCKET +
                  product.images[0]
                }
                alt=""
                className="image"
              />
            </td>
            <td>{product.name}</td>
            <td>
              <button className="btn warning outlined">{order.quantity}</button>
            </td>
            <td>
              <button className="btn success outlined">${order.price}</button>
            </td>
            <td>
              {order.status === "Pending" ? (
                <button
                  className="btn success"
                  onClick={() => {
                    getClosestDelivery();
                    getOtherDelivery();
                    setShowDeliveryModal(true);
                  }}
                >
                  Assign Delivery
                </button>
              ) : (
                ""
              )}

              {order.status === "Awaiting pickup" ? (
                <button className="btn warning outined">Awaiting pickup</button>
              ) : (
                ""
              )}
              {order.status === "Awaiting delivery" ? (
                <button className="btn success outlined">
                  Awaiting delivery
                </button>
              ) : (
                ""
              )}
              {order.status === "Awaiting pickup" ? (
                <button
                  className="btn danger outlined"
                  style={{ margin: "3px" }}
                  onClick={() => cancel()}
                >
                  cancel?
                </button>
              ) : (
                ""
              )}

              {order.status === "Delivered" ? (
                <>
                  <button
                    className="btn success outlined"
                    style={{ margin: "5px" }}
                  >
                    Delivered
                  </button>
                  <button className="btn warning outlined">
                    Awaiting approval
                  </button>
                </>
              ) : (
                ""
              )}
              {order.status === "Approved" ? (
                <button
                  className="btn success outlined"
                  style={{ margin: "5px" }}
                >
                  Approved
                </button>
              ) : (
                ""
              )}
            </td>
            {!product ? (
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
            {/* <td>
            <span
              onClick={e => {
                setAnchorEl(e.currentTarget);
                setShowPopper(!showPopper);
              }}
            >
              Action
            </span>
            <Popper id={1} open={showPopper} anchorEl={anchorEl}>
              <div className="afm-card">
                <div>Delivered</div>
                <div>Pending</div>
                <div>Cancelled</div>
              </div>
            </Popper>
          </td> */}
          </>
        ) : (
          ""
        )}
      </tr>
    </>
  );
}
function VendorMyOrders() {
  const globalState = useContext(globalContext);
  const params = useParams();
  const [orders, setOrders] = useState();
  const [details, setDetails] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
      getDetails();
      getOrders();
    } else {
      navigate("/login");
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

  async function getOrders() {
    let { data: ordered_products, error } = await supabase
      .from("ordered_products")
      .select("*")
      .eq("vendor_id", vendor_id);

    if (error) {
      alert(error.message);
    } else if (ordered_products) {
      setOrders(ordered_products);
    }
  }

  var noOfOrders = 0;

  const body = (
    <>
      <Grid container style={{ marginTop: "10px" }} spacing={2}>
        <Grid item xs={6} md={6}>
          {" "}
          <input type="text" className="afm-field" style={{ width: "90%" }} />
        </Grid>
        <Grid item xs={6} md={6}>
          {" "}
          <input type="text" className="afm-field" style={{ width: "90%" }} />
        </Grid>
      </Grid>
    </>
  );
  return (
    <div className="vendor-dashboard">
      <SiteLoader show={loading} />
      <HeaderLiner back={true} />
      <div className="dashboard">
        <Left page="my-orders" />
        <div className={`right ${globalState.state.vendorDashboardRightClass}`}>
          <MenuBtn />
          <div className="vendor-orders">
            <div style={{ width: "90%", margin: "auto", marginTop: "10px", marginBotton: "10px" }}>
              <a href="#" style={{ textDecoration: "none" }} onClick={() => navigate(-1)}> {"<<"} back</a>
            </div>
            <div
              className="afm-table"
              style={{ width: "90%", margin: "auto", marginTop: "10px" }}
            >

              <div className="title">My Orders</div>
              <table>
                <thead>
                  <th>OrderID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Status</th>
                </thead>
                <tbody>
                  {orders
                    ? orders.map((order, index) => {
                      noOfOrders = noOfOrders + 1;
                      return (
                        <Order
                          key={index}
                          order={order}
                          setLoading={setLoading}
                          details={details}
                        />
                      );
                    })
                    : ""}
                </tbody>
              </table>
              {!orders ? (
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
              {noOfOrders === 0 && orders ? (
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
                  No Orders yet!
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

export default VendorMyOrders;
