import { supabase } from "../supabaseClient";
import uuid from "react-uuid";

export async function getDetails(vendor_id) {
  var res;
  var err;
  let { data: vendors, error } = await supabase
    .from("vendors")
    .select("*")
    .eq("vendor_id", vendor_id);

  if (error) {
    err = error;
  } else if (vendors) {
    res = vendors;
  }

  return [res, err];
}

export async function getVendorProducts(vendor_id) {
  let { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("vendor_id", vendor_id);

  return [products, error];
}

export async function generateAccessToken(vendor_id) {
  const token = uuid();
  const expiration_time = new Date().getTime() + 3600;
  const { data, error } = await supabase
    .from("vendor_access_token")
    .insert([{ vendor_id, token, expiration_time }]);

  return [token, error];
}

export async function isLoggedIn() {
  let time = new Date().getTime();
  let accessToken = JSON.parse(localStorage.getItem("afm_vendor_access_token"));
  if (accessToken) {
    const { data, error } = await supabase
      .from("vendor_access_token")
      .select("*")
      .match({ token: accessToken.token, vendor_id: accessToken.vendor_id });

    if (error) {
      // console.log("second false");
      return false;
    } else if (data.length > 0) {
      //   let diff = data[0].expiration_time - time;
      //   if (diff > 0) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      return true;
    } else {
      // console.log("third false");

      return false;
    }
  } else {
    // console.log("first false");
    return false;
  }
}

export async function updateBalance(vendor_id, value) {
  let old_balance;

  let { data: vendors, error } = await supabase
    .from("vendors")
    .select("*")
    .eq("vendor_id", vendor_id);
  if (error) {
    alert(error.message);
  } else if (vendors) {
    old_balance = parseInt(vendors[0].balance);

    const { data, error } = await supabase
      .from("vendors")
      .update({ balance: old_balance + value })
      .eq("vendor_id", vendor_id);

    return [error, data];
  }
}

export async function updateTotalEarnings(vendor_id, value) {
  let old_balance;

  let { data: vendors, error } = await supabase
    .from("vendors")
    .select("*")
    .eq("vendor_id", vendor_id);
  if (error) {
    alert(error.message);
  } else if (vendors) {
    old_balance = parseInt(vendors[0].total_earnings);

    const { data, error } = await supabase
      .from("vendors")
      .update({ total_earnings: old_balance + value })
      .eq("vendor_id", vendor_id);

    return [error, data];
  }
}
