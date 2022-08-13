import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../App.css";
import HeaderLiner from "./header-liner";
import Header from "./header";
import Footer from "./footer";
import { NormalItems } from "./items";
import MobileMenu from "./mobile-menu";
import poweroil from "../images/poweroil.jpeg";
import { supabase } from "../supabaseClient";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { globalContext } from "../global-context";
import SiteLoader from "./site_loader";
import { NormalItem, DummyNormalItem } from "./items";

function Product() {
  const [details, setDetails] = useState();
  const [pageIsLoading, setPageIsLoading] = useState(true);
  const [otherProducts, setOtherProducts] = useState();
  const [quantity, setQuantity] = useState(1);
  const [itemIsInCart, setItemIsInCart] = useState(false);
  const [loading, setLoading] = useState(false);
  var globalState = useContext(globalContext);
  const params = useParams();

  const MySwal = withReactContent(Swal);

  function addToCart(
    product_id,
    vendor_id,
    image,
    name,
    price,
    quantity,
    weight_type,
    weight
  ) {
    var cart_items = globalState.state.cartItems;
    var noOfCartItems = globalState.state.noOfCartItems;
    var isInCart = false;

    for (var i = 0; i < cart_items.length; i++) {
      if (cart_items[i].product_id === product_id) {
        isInCart = true;
      }
    }

    if (!isInCart) {
      cart_items.push({
        product_id,
        vendor_id,
        image,
        name,
        price,
        quantity: parseInt(quantity),
        weight_type,
        weight,
      });
      globalState.setState(state => {
        return {
          ...state,
          cartItems: cart_items,
          noOfCartItems: noOfCartItems + 1,
        };
      });

      cart_items = JSON.stringify(cart_items);
      localStorage.setItem(globalState.state.cartId, cart_items);
      MySwal.fire({
        title: <strong>Added to Cart! </strong>,
        html: <i>This item has been added to cart!</i>,
        icon: "success",
      });
    } else {
      // is in cart
      MySwal.fire({
        title: <strong>Item already in cart! </strong>,
        html: <i>This item is already in your cart!</i>,
        icon: "error",
      });
    }
  }

  useEffect(() => {
    getDetails();
    for (var i = 0; i < globalState.state.cartItems.length; i++) {
      if (globalState.state.cartItems[i].product_id === params.id) {
        setItemIsInCart(true);
      }
    }
    getOtherProducts();
  }, []);

  async function getDetails() {
    let { data: products, error } = await supabase
      .from("products")
      .select("*")
      .eq("product_id", params.id);

    if (error) {
      alert(error.message);
    } else if (products) {
      setDetails(products[0]);
      setPageIsLoading(false);
    }
  }

  async function getOtherProducts() {
    setLoading(true);
    let { data: products, error } = await supabase.from("products").select("*");

    if (error) {
      alert(error.message);
    } else if (products) {
      setOtherProducts(products);
      setLoading(false);
    }
  }
  return (
    <div className="product">
      <SiteLoader show={loading} />
      <HeaderLiner />
      <Header />

      <>
        <div className="product-details">
          <div className="row1">
            <div className="image-container">
              {details ? (
                <img
                  src={
                    "https://jdptlyjoqfaypjklxsgv.supabase.co/storage/v1/object/public/images/" +
                    details.images[0]
                  }
                  alt=""
                  className="image"
                />
              ) : (
                <div
                  className="blink-animation"
                  style={{ width: "90%", height: "200px", background: "#eee" }}
                ></div>
              )}
            </div> 
          </div>
          <div className="row1">
            <div className="image-container">
              {details ? (
                <img
                  src={
                    "https://jdptlyjoqfaypjklxsgv.supabase.co/storage/v1/object/public/images/" +
                    details.images[1]
                  }
                  alt=""
                  className="image"
                />
              ) : (
                <div
                  className="blink-animation"
                  style={{ width: "90%", height: "200px", background: "#eee" }}
                ></div>
              )}
            </div>
            <div className="image-container">
              {details && (
                <>
                  {details.images[2] ? <img
                    src={
                      "https://jdptlyjoqfaypjklxsgv.supabase.co/storage/v1/object/public/images/" +
                      details.images[1]
                    }
                    alt=""
                    className="image"
                  /> : (
                    <div
                      className="blink-animation"
                      style={{ width: "90%", height: "200px", background: "#eee" }}
                    ></div>
                  )}
                </>
              )}
            </div> 
          </div>

          <div className="row2">
            <div className="title">
              {details ? (
                details.name
              ) : (
                <div
                  className="blink-animation"
                  style={{ width: "60%", height: "20px", background: "#eee" }}
                ></div>
              )}
            </div>
            <div className="price">
              {details ? (
                `NGN ${details.price}`
              ) : (
                <div
                  className="blink-animation"
                  style={{ width: "20%", height: "20px", background: "#eee" }}
                ></div>
              )}
            </div>
            <div className="description">
              {details ? (
                details.description
              ) : (
                <div
                  className="blink-animation"
                  style={{ width: "70%", height: "50px", background: "#eee" }}
                ></div>
              )}
            </div>
            {/* <div className="quantity-container">
              <button
                className="minus"
                onClick={() => {
                  if (quantity <= 1) {
                    setQuantity(1);
                  } else {
                    setQuantity(quantity - 1);
                  }
                }}
              >
                -
              </button>
              <input type="text" className="field" value={quantity} />
              <button
                className="plus"
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              >
                +
              </button>
            </div> */}
            <div className="buy-btn-container">
              {/* {details && !itemIsInCart ? (
                <button
                  className="buy-btn"
                  onClick={() =>
                    addToCart(
                      params.id,
                      details.vendor_id,
                      details.images[0],
                      details.name,
                      details.price,
                      quantity,
                      details.weight_type,
                      details.weight
                    )
                  }
                >
                  Buy now
                </button>
              ) : (
                ""
              )} */}

              {/* {details && itemIsInCart ? (
                <button className="buy-btn">
                  <Link to="/cart" className="link">
                    View cart
                  </Link>
                </button>
              ) : (
                ""
              )} */}


            </div>
          </div>
        </div>
        {/* <div className="related-products-title">Related products</div>
        <div className="normal-items-container">
          {otherProducts ? (
            otherProducts.map((item, index) => {
              return <NormalItem key={index} item={item} />;
            })
          ) : (
            <>
              <DummyNormalItem />
              <DummyNormalItem />
              <DummyNormalItem />
              <DummyNormalItem />
              <DummyNormalItem />
            </>
          )}
        </div> */}
      </>

      <MobileMenu />
      {/* <Footer /> */}
    </div>
  );
}

export default Product;
