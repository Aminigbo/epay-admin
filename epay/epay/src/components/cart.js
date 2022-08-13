import React, {useState, useContext} from "react";
import "../App.css";
import HeaderLiner from "./header-liner";
import Header from "./header";
import Footer from "./footer";
import {Link} from "react-router-dom";
import MobileMenu from "./mobile-menu";
import {NormalItems} from "./items";
import {supabase} from "../supabaseClient";
import {globalContext} from "../global-context";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function CartItem({item}) {
  const globalState = useContext(globalContext);
  const [quantity, setQuantity] = useState(parseInt(item.quantity));
  const [isDeleting, setIsDeleting] = useState(false);
  const [display, setDisplay] = useState("flex");
  function remove() {
    var cart_items = globalState.state.cartItems;
    for (var i = 0; i < cart_items.length; i++) {
      if (cart_items[i].product_id === item.product_id) {
        cart_items.splice(i, 1);
        setDisplay("none");
        globalState.setState(state => {
          return {
            ...state,
            cartItems: cart_items,
            noOfCartItems: globalState.state.noOfCartItems - 1,
          };
        });
        localStorage.setItem(
          globalState.state.cartId,
          JSON.stringify(cart_items)
        );
      }
    }
  }
  return (
    <div className="details-container" style={{display: display}}>
      <div className="row detail">
        <img
          src={process.env.REACT_APP_IMAGES_STORAGE_BUCKET + item.image}
          alt=""
          className="image"
        />
      </div>
      <div className="row detail">{item.name}</div>
      <div className="row detail">
        {item.weight_type !== `None`
          ? `${item.weight} - ${item.weight_type}`
          : `...`}
      </div>
      <div className="row detail">${item.price}</div>
      <div className="row detail">
        <div className="quantity-container">
          <button
            className="minus"
            onClick={() => {
              if (quantity <= 1) {
                setQuantity(1);
              } else {
                setQuantity(quantity - 1);
                var cart_items = globalState.state.cartItems;
                for (var i = 0; i < cart_items.length; i++) {
                  if (cart_items[i].product_id === item.product_id) {
                    cart_items[i] = {
                      ...cart_items[i],
                      quantity: cart_items[i].quantity - 1,
                    };
                  }
                }

                globalState.setState(state => {
                  return {...state, cartItems: cart_items};
                });
                localStorage.setItem(
                  globalState.state.cartId,
                  JSON.stringify(cart_items)
                );
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

              var cart_items = globalState.state.cartItems;
              for (var i = 0; i < cart_items.length; i++) {
                if (cart_items[i].product_id === item.product_id) {
                  cart_items[i] = {
                    ...cart_items[i],
                    quantity: cart_items[i].quantity + 1,
                  };
                }
              }

              globalState.setState(state => {
                return {...state, cartItems: cart_items};
              });
              localStorage.setItem(
                globalState.state.cartId,
                JSON.stringify(cart_items)
              );
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className="row detail" style={{cursor:"pointer"}}>
        ${item.price * item.quantity}{" "}
        <DeleteOutlineIcon
          style={{
            color: "slategrey",
            width: "20px",
            marginLeft: "15px",
            cursor: "pointer",
          }}
          onClick={() => remove()}
        />
        <small  onClick={() => remove()} style={{fontSize:"10px"}} >Remove</small>
      </div>
    </div>
  );
}
function Cart() {
  const globalState = useContext(globalContext);

  return (
    <div className="cart">
      <HeaderLiner />
      <Header />
      <div className="cart-title">SHOPPING CART</div>
      <div className="cart-container">
        <div className="title-container">
          <div className="row">Product</div>
          <div className="row">Name</div>
          <div className="row">Measure</div>
          <div className="row">Price</div>
          <div className="row">Quantity</div>
          <div className="row">Subtotal</div>
        </div>
        {/* {console.log("Cart, cart_items: " + globalState.state.cartItems)} */}
        {globalState.state.cartItems.map((item, index) => {
          return <CartItem key={index} item={item} />;
        })}
        {globalState.state.noOfCartItems === 0 ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              fontSize: "16px",
              color: "slategrey",
              padding: "40px 0px",
            }}
          >
            No items in your cart yet!
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="checkout-btn-container">
        <button className="checkout-btn">
          <Link to="/checkout" className="link">
            Proceed to Checkout
          </Link>
        </button>
      </div>
      <MobileMenu />
      <Footer />
    </div>
  );
}

export default Cart;
