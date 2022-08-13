import { supabase } from "../supabaseClient";
import uuid from "react-uuid";

export async function generateAccessToken(delivery_person_id) {
  const token = uuid();
  const expiration_time = new Date().getTime() + 3600;
  const { data, error } = await supabase
    .from("delivery_person_access_token")
    .insert([{ delivery_person_id, token, expiration_time }]);

  return [token, error];
}

export async function isLoggedIn() {
  let time = new Date().getTime();
  let accessToken = JSON.parse(
    localStorage.getItem("afm_delivery_person_access_token")
  );
  // console.log(accessToken);
  if (accessToken) {
    const { data, error } = await supabase
      .from("delivery_person_access_token")
      .select("*")
      .match({
        token: accessToken.token,
        delivery_person_id: accessToken.delivery_person_id,
      });

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

export async function updateBalance(delivery_person_id, value) {
  let old_balance;

  let { data: delivery_persons, error } = await supabase
    .from("delivery_persons")
    .select("*")
    .eq("delivery_person_id", delivery_person_id);
  if (error) {
    alert(error.message);
  } else if (delivery_persons) {
    old_balance = parseInt(delivery_persons[0].balance);

    const { data, error } = await supabase
      .from("delivery_persons")
      .update({ balance: old_balance + value })
      .eq("delivery_person_id", delivery_person_id);

    return [error, data];
  }
}

export async function getDeliveryPersonIdFromOrderedProduct(
  order_id,
  product_id
) {
  let { data, error } = await supabase
    .from("delivery_person_orders")
    .select("*")
    .match({ order_id: order_id, product_id: product_id, status: "Accepted" });

  if (error) {
    alert(error.message);
  } else if (data) {
    return data[0].delivery_person_id;
  }
}
