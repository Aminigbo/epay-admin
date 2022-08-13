import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import HeaderLiner from "./header-liner";
import Header from "./header";
import Footer from "./footer";
import { Link } from "react-router-dom";
import MobileMenu from "./mobile-menu";
import { globalContext } from "../global-context";
import { supabase } from "../supabaseClient";
import { generateOrderId } from "../handlers/ordersHandler";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import SiteLoader from "./site_loader";
import { isLoggedIn } from "../handlers/customersHandler";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import PlacesAutocomplete from "./placesAutocomplete";
import { generateAccessToken } from "../handlers/deliveryHandler";
import uuid from "react-uuid";
const initialOptions = {
  "client-id":
    "AWW2W7NXmIzWVQE_yU3AMwdQqyMlz4t9lmP9uDcWH4yFTyh-ae3TKsPjPuaUaanwp5rWZo4rXlawagKi",
  currency: "USD",
  intent: "capture",
  // "data-client-token": "abc123xyz==",
};

function CartItem({ item }) {
  return (
    <div className="order-details">
      <span className="left">
        {item.name} 1KG x {item.quantity}
      </span>
      <span className="right">${item.price * item.quantity}</span>
    </div>
  );
}
function Checkout() {
  const globalState = useContext(globalContext);
  const navigate = useNavigate();
  const [cartTotal, setCartTotal] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [paypalBackgroundDisplay, setPaypalBackgroundDisplay] =
    useState("none");
  var customer_id;
  const MySwal = withReactContent(Swal);
  const [details, setDetails] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    region: "",
    postal_code: "",
  });

  useEffect(() => {
    if (globalState.state.noOfCartItems === 0) {
      navigate(-1);
    }
    verifyLogin();
    // getCartTotal();
  }, []);

  useEffect(() => {
    setDetails((state) => {
      return { ...state, address: address };
    });
  }, [address]);

  async function verifyLogin() {
    setLoading(true);
    if (await isLoggedIn()) {
      customer_id = JSON.parse(
        localStorage.getItem("afm_customer_access_token")
      ).customer_id;
      getDetails();
      setLoading(false);
    } else {
      setLoading(false);
    }
  }

  async function getDetails() {
    setLoading(true);

    let { data: customers, error } = await supabase
      .from("customers")
      .select("*")
      .eq("customer_id", customer_id);

    if (error) {
      alert(error.message);
      setLoading(false);
    } else if (customers) {
      setDetails(customers[0]);
      setLoading(false);
    }
  }

  const [checked1, percentage] = React.useState();
  const [total, setTotal] = React.useState();

  useEffect(() => {

    getSettings()





  }, []);


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
      percentage(response.deliveryPer)
      // console.log(response.deliveryPer)

      // getCartTotal()

      let cart_total = 0;
      let cart_items = globalState.state.cartItems;
      for (var i = 0; i < cart_items.length; i++) {
        cart_total = cart_total + cart_items[i].price * cart_items[i].quantity;
      }

      let perc = response.deliveryPer * cart_total / 100;
      console.log(perc)
      console.log(perc)
      setCartTotal(cart_total + perc)
      setDeliveryFee(perc)


    }
  }

  function getCartTotal() {
    // let cart_total = 0;
    // let cart_items = globalState.state.cartItems;
    // for (var i = 0; i < cart_items.length; i++) {
    //   cart_total = cart_total + cart_items[i].price * cart_items[i].quantity;
    // }

    let perc = checked1 * cartTotal / 100;

    // console.log(cart_total)
    console.log(checked1)
    console.log(perc)
    // setDeliveryFee(perc) 
  }



  async function placeOrder() {
    setLoading(true);

    // customer_id = JSON.parse(
    //   localStorage.getItem("afm_customer_access_token")
    // ).customer_id;

    var order_id = generateOrderId();
    var date = new Date();


    var currentdate = new Date();
    var oneJan = new Date(currentdate.getFullYear(), 0, 1);
    var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
    var week = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);



    let { data, error } = await supabase.from("orders").insert([
      {
        order_id,
        customer_id: details.email,
        status: "Pending",
        time: date.getTime(),
        date,
        customer_details: JSON.stringify(details),
        payment_method: "Paypal",
        week: week
      },
    ]);

    if (error) {
      alert(error.message);
      setLoading(false);
    } else if (data) {
      var ordered_products = [];
      for (var i = 0; i < globalState.state.cartItems.length; i++) {
        var product_id = globalState.state.cartItems[i].product_id;
        var vendor_id = globalState.state.cartItems[i].vendor_id;
        var price = globalState.state.cartItems[i].price;


        var quantity = globalState.state.cartItems[i].quantity;
        var status = "Pending";
        ordered_products.push({
          order_id,
          product_id,
          vendor_id,
          customer_id,
          quantity,
          price,
          status,
        });
      }
      let { data, error } = await supabase
        .from("ordered_products")
        .insert(ordered_products);
      if (error) {
        alert(error.message);
        setLoading(false);
      } else if (data) {
        // alert("Order sent");
        setLoading(false);
        setPaypalBackgroundDisplay("none");
        globalState.setState((state) => {
          return { ...state, cartItems: [], noOfCartItems: 0 };
        });
        localStorage.setItem(globalState.state.cartId, JSON.stringify([]));
        let notify = await MySwal.fire({
          title: <strong>Order successful!</strong>,
          html: (
            <i>Your orderID is: {order_id}. you would be contacted shortly!</i>
          ),
          icon: "success",
          showCancelButton: true,
          cancelButtonText: "Homepage",
          // confirmButtonText: "View orders",
          confirmButtonText: "Done",
        });
        if (notify.isConfirmed) {
          // navigate("/");
          signupCustomer()
          // navigate("/customers/orders");
        }
        if (notify.isDismissed) {
          navigate("/");
        }
      }
    }
  }


  async function signupCustomer() {
    setLoading(true);
    var customer_id = uuid();

    let { data: customers, error } = await supabase
      .from("customers")
      .select("*")
      .eq("email", details.email);

    if (error) {
      alert(error.message);
      setLoading(false);
    } else if (customers) {
      if (customers.length === 0) {
        // customer does not exists
        let { data, error } = await supabase.from("customers").insert([
          {
            customer_id,
            firstname: details.firstname,
            lastname: details.lastname,
            phone: details.phone,
            email: details.email,
            password: details.phone,
          },
        ]);
        if (error) {
          alert(error.message);
          setLoading(false);
        } else if (data) {
          let [token, error] = await generateAccessToken(customer_id);
          if (error) {
            navigate("/customers/login");
          } else {
            localStorage.setItem(
              "afm_customer_access_token",
              JSON.stringify({ token, customer_id })
            );

            // if (params.redirect === "checkout") {
            //   navigate("/checkout");
            // } else {
            //   navigate("/customers/orders");
            // }

            navigate("/customers/orders");
          }
        }
      } else {
        // customer exists
        alert("Email address already in use!");
        setLoading(false);
      }
    }
  }
  //  firstname: "",
  //   lastname: "",
  //   phone: "",
  //   email: "",
  //   address: "",
  //   region: "",
  //   postal_code: "",
  // });

  async function loginCustomer() {
    setLoading(true);
    let {data: customers, error} = await supabase
      .from("customers")
      .select("*")
      .match({email: details.email});

    if (error) {
      alert(error.message);
    } else if (customers) {
      if (customers.length > 0) {
        let [token, error] = await generateAccessToken(
          customers[0].customer_id
        );
        if (error) {
          alert(error.message);
          setLoading(false);
        } else {
          localStorage.setItem(
            "afm_customer_access_token",
            JSON.stringify({token, customer_id: customers[0].customer_id})
          );
         navigate("/customers/orders");
        }
      } else {
        alert("Invalid credencials!");
        setLoading(false);
      }
    }
  }


  async function checkLoggedInStatus() {
    setLoading(true);
    if (await isLoggedIn()) {
      setLoading(false);
      setPaypalBackgroundDisplay("flex");
    } else {
      setLoading(false);
      let notify = await MySwal.fire({
        title: <strong>Continue ? </strong>,
        html: <i>Do you wish to continue without logging in ?</i>,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes, I'm ready!",
        cancelButtonText: "No, Login instead",
      });
      if (notify.isConfirmed) {
        // navigate("/customers/login/checkout");
        setLoading(false);
        setPaypalBackgroundDisplay("flex");
      }
      if (notify.isDismissed) {
        navigate("/customers/login/checkout");
      }
    }
  }
  return (
    <PayPalScriptProvider options={initialOptions}>
      {/* {loading == false && getCartTotal()} */}
      <div className="checkout">
        <div
          className="paypal-background"
          style={{ display: paypalBackgroundDisplay }}
        >
          <HighlightOffRoundedIcon
            className="close-btn"
            onClick={() => setPaypalBackgroundDisplay("none")}
          />
          <div className="box">
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: cartTotal,
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  // const name = details.payer.name.given_name;
                  // alert(`Transaction completed by ${name}`);
                  placeOrder();
                });
              }}
            />
          </div>
        </div>
        <SiteLoader show={loading} />
        <HeaderLiner />
        <Header />
        <div className="checkout-container">
          <div className="row1">
            <div className="title">Billing Details</div>
            <form className="form-container">
              <div className="double-field-container">
                <div class="row">
                  <label>First Name</label>
                </div>
                <div class="row">
                  <label>Last Name</label>
                </div>
              </div>
              <div className="double-field-container">
                <div className="row">
                  <input
                    required
                    type="text"
                    className="field"
                    value={details.firstname}
                    onChange={(e) => {
                      setDetails((state) => {
                        return { ...state, firstname: e.target.value };
                      });
                    }}
                  />
                </div>
                <div className="row">
                  <input
                    required
                    type="text"
                    className="field"
                    value={details.lastname}
                    onChange={(e) => {
                      setDetails((state) => {
                        return { ...state, lastname: e.target.value };
                      });
                    }}
                  />
                </div>
              </div>

              <label>Phone Number</label>
              <select
                className="field"
                style={{ padding: "9px 5px", borderRadius: "3px", marginRight: "10px", border: 'none', width: "75px" }}>
                <option>
                  +1
                </option>
              </select>
              <input
                required
                maxlength="18"
                type="text"
                className="field"
                value={details.phone}
                onChange={e => {
                  if (e.target.value.length < 11) {
                    setDetails(state => ({ ...state, phone: e.target.value }))
                  }
                }
                }
                style={{ width: " 70%" }}
              />

              {/* <input
                type="text"
                className="field"
                value={details.phone}
                onChange={(e) => {
                  setDetails((state) => {
                    return { ...state, phone: e.target.value };
                  });
                }}
              /> */}

              <label>Email Address</label>
              <input
                required
                type="email"
                className="field"
                value={details.email}
                onChange={(e) => {
                  setDetails((state) => {
                    return { ...state, email: e.target.value };
                  });
                }}
              />

              <label>Address</label>
              {/* <input
                type="text"
                className="field"
                value={details.address}
                onChange={(e) => {
                  setDetails((state) => {
                    return { ...state, address: e.target.value };
                  });
                }}
              /> */}
              <PlacesAutocomplete
                inputClass={`field`}
                containerClass={``}
                inputPlaceholder={""}
                setSearchFieldValue={setAddress}
              />

              {/* <label>Region/City</label>
              <input
                type="text"
                className="field"
                value={details.region}
                onChange={(e) => {
                  setDetails((state) => {
                    return { ...state, region: e.target.value };
                  });
                }}
              /> */}

              <label>Postal / Zip code</label>
              <input
                type="text"
                className="field"
                value={details.postal_code}
                onChange={(e) => {
                  setDetails((state) => {
                    return { ...state, postal_code: e.target.value };
                  });
                }}
              />
            </form>
          </div>
          <div className="row2">
            <div className="title">My Order</div>
            <div className="order-details">
              <span className="left details-title">Product</span>
              <span className="right details-title">Sub-Total</span>
            </div>
            {globalState.state.cartItems.map((item, index) => {
              return <CartItem key={index} item={item} />;
            })}
            <div className="order-details">
              <span className="left">Delivery Fee</span>
              <span className="right">${deliveryFee}</span>
            </div>
            <div className="order-details-seperator"></div>
            <div className="order-details total">
              <span className="left total-title">Total</span>
              <span className="right total-value">${cartTotal}</span>
            </div>
            <div className="payment-method-container">
              {/* <div className="payment-type">
              <input type="radio" /> <label>Direct Bank Transfer</label>
            </div>
            <div className="description">
              Make your payment directly into our bank account. Please use your
              product code as the payment reference. Your order won't be shipped
              until the funds have cleared in our account.
            </div> */}

              <div className="payment-type">
                <input type="radio" checked /> <label>PayPal</label>
              </div>
              <div className="description">
                Make payment using your debit and credit cards
              </div>
            </div>
            {/* <PayPalButtons style=
          {{
            color: "blue",
            shape: "pill",
            label: "pay",
            tagline: false,
            layout: "horizontal",
          }}
          createOrder={createOrder}
         onApprove={onApprove} 
          /> */}

            <div className="placeorder-btn-container">
              <button
                className="placeorder-btn"
                disabled={loading}
                onClick={() => {
                  if (details.firstname === "") {
                    alert("firstname cannot be empty!");
                  } else if (details.lastname === "") {
                    alert("lastname cannot be empty!");
                  } else if (details.phone === "") {
                    alert("phone cannot be empty!");
                  } else if (details.email === "") {
                    alert("email cannot be empty!");
                  } else if (details.address === "") {
                    alert("lastname cannot be empty!");
                  } else if (details.postal_code === "") {
                    alert("Post/Zip code cannot be empty!");
                  } else {
                    checkLoggedInStatus();
                  }
                }}
              >
                {loading ? "Proccessing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
        <MobileMenu />
        <Footer />
      </div>
    </PayPalScriptProvider>
  );
}

export default Checkout;
