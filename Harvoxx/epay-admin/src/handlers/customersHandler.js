import {supabase} from "../supabaseClient";
import uuid from "react-uuid";

export async function generateAccessToken(customer_id) {
  const token = uuid();
  const expiration_time = new Date().getTime() + 3600;
  const {data, error} = await supabase
    .from("customer_access_token")
    .insert([{customer_id, token, expiration_time}]);

  return [token, error];
}

export async function isLoggedIn() {
  console.log("called");
  let time = new Date().getTime();
  let accessToken = JSON.parse(
    localStorage.getItem("afm_customer_access_token")
  );
  console.log(accessToken);
  if (accessToken) {
    const {data, error} = await supabase
      .from("customer_access_token")
      .select("*")
      .match({token: accessToken.token, customer_id: accessToken.customer_id});

    if (error) {
      console.log("second false");

      return false;
    } else if (data.length > 0) {
      //   let diff = data[0].expiration_time - time;
      //   if (diff > 0) {
      //     return true;
      //   } else {
      //     console.log("fourth false", diff);
      //     return false;
      //   }
      return true;
    } else {
      console.log("third false");
      //   return false;
    }
  } else {
    console.log("first false");
    return false;
  }
}

