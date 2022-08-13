import React, {useState, useEffect, createContext} from "react";
import {supabase} from "./supabaseClient";

export const globalContext = createContext();

export const GlobalProvider = props => {
  const cartId = "afm_cart";
  var cart_items = [];
  var globalRegion = "";
  const [vendorDetails, setVendorDetails] = useState();

  // localStorage.removeItem(cartId);
  if (localStorage.getItem(cartId)) {
    cart_items = JSON.parse(localStorage.getItem(cartId));
  } else {
    cart_items = [];
  }

  if (localStorage.getItem("afm_region")) {
    globalRegion= localStorage.getItem("afm_region");
  } 

  // console.log("cart items: " + JSON.stringify(cart_items));

  useEffect(() => {
    getVendorDetails();
  }, []);

  const Globalstate = {
    cartId: cartId,
    cartItems: cart_items,
    noOfCartItems: cart_items.length,
    cartStyle: {display: "none"},
    vendorDashboardLeftClass: "open",
    vendorDashboardRightClass: "close",
    getVendorDetails,
    vendorDetails,
    globalRegion,
  };
  const [state, setState] = useState(Globalstate);

  async function getVendorDetails() {
    let accessToken = JSON.parse(
      localStorage.getItem("afm_vendor_access_token")
    );
    if (accessToken) {
      let {data: vendors, error} = await supabase
        .from("vendors")
        .select("*")
        .eq("vendor_id", accessToken.vendor_id);
      if (error) {
        alert(error.message);
      } else {
        setState(state => {
          return {...state, vendorDetails: vendors[0]};
        });
      }
    }
  }

  return (
    <globalContext.Provider value={{state, setState}}>
      {props.children}
    </globalContext.Provider>
  );
};
