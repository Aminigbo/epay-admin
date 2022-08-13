import { supabase } from "../supabaseClient";
import uuid from "react-uuid";

export async function generateAccessToken(admin_id) {
  const token = uuid();
  const expiration_time = new Date().getTime() + 3600;
  const { data, error } = await supabase
    .from("admin_access_token")
    .insert([{ admin_id, token, expiration_time }]);

  return [token, error];
}

export async function isLoggedIn() {
  console.log("called");
  let time = new Date().getTime();
  let accessToken = JSON.parse(localStorage.getItem("afm_admin_access_token"));
  console.log(accessToken);
  if (accessToken) {
    const { data, error } = await supabase
      .from("admin_access_token")
      .select("*")
      .match({ token: accessToken.token, admin_id: accessToken.admin_id });

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

export function containsSameWords(a, b) {
  let region = a;
  region = region.split(", ");
  let new_region = "";
  for (var i = 0; i < region.length; i++) {
    new_region += region[i] + " ";
  }
  region = new_region.split(" ");
  new_region = [];
  for (var i = 0; i < region.length; i++) {
    if (region[i] != "") {
      new_region.push(region[i]);
    }
  }

  let search_term = b;
  search_term = search_term.split(", ");
  let new_search_term = "";
  for (var i = 0; i < search_term.length; i++) {
    new_search_term += search_term[i] + " ";
  }
  search_term = new_search_term.split(" ");
  new_search_term = [];
  for (var i = 0; i < search_term.length; i++) {
    if (search_term[i] != "") {
      new_search_term.push(search_term[i]);
    }
  }

  // console.log(new_region);
  // console.log(new_search_term);

  let isFound = false;
  new_search_term.map((term) => {
    if (new_region.includes(term)) {
      isFound = true;
    }
  });

  if (isFound) {
    return true;
  } else {
    return false;
  }
}

export function shortenLength(s, l, suffix) {
  let result = "";
  let trimmedString = "";
  if (s.length > l) {
    trimmedString = s.substring(0, l);
    result = trimmedString + suffix;
  } else {
    result = s;
  }

  return result;
}

export async function getSearchedProductsByRegion(query) {
  let similar_products = [];

  let { data, error } = await supabase
    .from("products")
    .select("*")
    .match({ region: query });
  if (error) {
    alert(error.message);
  } else if (data) {
    if (data.length > 0) {
      data.map((d) => {
        similar_products.push(d);
      });
    }
  }

  let { data: products, error: err } = await supabase
    .from("products")
    .select("*");
  if (err) {
    alert(err.message);
  } else if (products) {
    products.map((product) => {
      if (containsSameWords(product.region, query)) {
        let is_in_similar_products = false;
        similar_products.map((p) => {
          if (p.product_id === product.product_id) {
            is_in_similar_products = true;
          }
        });

        if (!is_in_similar_products) {
          similar_products.push(product);
        }
      }
    });
  }

  return similar_products;
}
