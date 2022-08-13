import React, { useContext, useState, useEffect } from "react";
import { globalContext } from "../global-context";
import "../App.css";
import { Link } from "react-router-dom";
import chicken from "../images/chicken.jpeg";
// import fish1 from "../images/fish1.jpeg";
import fish3 from "../images/fish3.jpeg";
// import garbage from "../images/garbage.jpeg";
import garri from "../images/garri.jpeg";
import maggi from "../images/magi.jpeg";
import pepper from "../images/pepper.jpeg";
import goatmeat from "../images/goatmeat.jpeg";
import poweroil from "../images/poweroil.jpeg";
import ricebag from "../images/ricebag.jpeg";
import salt from "../images/salt.jpeg";
// import rubber1 from "../images/rubber1.jpeg";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { shortenLength } from "../handlers/cpHandler";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

var item = [
  {
    id: 1,
    name: "Chicken - 3 KG",
    image: chicken,
  },
  {
    id: 2,
    name: "Fish - 2 KG",
    image: poweroil,
  },
  {
    id: 3,
    name: "Fish- 4 KG",
    image: fish3,
  },
  {
    id: 4,
    name: "Garri - 1 bag",
    image: garri,
  },
  {
    id: 5,
    name: "Maggi- 2 packets",
    image: maggi,
  },
  { id: 6, name: "Pepper - 1 bag", image: pepper },
  {
    id: 7,
    name: "Goat Meat - 5KG",
    image: goatmeat,
  },
  {
    id: 8,
    name: "Power Oil - 2 packs",
    image: poweroil,
  },
  {
    id: 9,
    name: "Rice Bag - 3 KG",
    image: ricebag,
  },
  {
    id: 10,
    name: "Salt - 1 pack",
    image: salt,
  },
];

/*** Normal items start *** */
export function NormalItem({ item }) {
  var globalState = useContext(globalContext);
  const [itemIsInCart, setItemIsInCart] = useState(false);

  useEffect(() => {
    var cart_items = globalState.state.cartItems;
    for (var i = 0; i < cart_items.length; i++) {
      if (cart_items[i].product_id === item.product_id) {
        setItemIsInCart(true);
      }
    }
  }, []); 
  return (
    <div className="normal-item">
      <div className="image-container">
        <Link to={`/product/${item.product_id}`} className="link">
          <img
            src={"https://jdptlyjoqfaypjklxsgv.supabase.co/storage/v1/object/public/images/" + item.images[0]}
            alt=""
            className="image"
          />
        </Link>
      </div>
      <div className="title">
        <Link to={`/product/${item.product_id}`} className="link">
          {shortenLength(item.name, 15, "...")}
        </Link>
      </div>
      <div className="price">
        {/* <span className="left">{shortenLength(item.region, 10, "...")}</span> */}
        <span className="right">${item.price}</span>
      </div>
      {/* <div className="add-to-cart">
        {!itemIsInCart ? (
          <button
            onClick={() =>
              addToCart(
                item.product_id,
                item.vendor_id,
                item.images[0],
                item.name,
                item.price,
                item.quantity,
                item.weight_type,
                item.weight
              )
            }
          >
            Add to Cart
          </button>
        ) : (
          <Link to="/cart" className="link">
            <button>View Cart</button>
          </Link>
        )}
      </div> */}
      {/* <Typography align="center">
        <LocationOnIcon
          style={{
            color: "mediumseagreen",
            position: "relative",
            top: "2px",
            fontSize: "16px",
          }}
        />
        {item.region}
      </Typography>
      <Grid container style={{paddingBottom: "10px"}}>
        <Grid xs="4">
          <Typography>${item.price}</Typography>
        </Grid>
        <Grid xs="8">
          <Button variant="contained" style={{background: "mediumseagreen"}}>
            Add to Cart
          </Button>
        </Grid>
      </Grid> */}
    </div>
  );
}

export function DummyNormalItem() {
  return (
    <div className={`normal-item`}>
      <div className="image-container">
        <Link to="/" className="link">
          <div
            className="image blink-animation"
            style={{ width: "80%", height: "130px", background: "#eee" }}
          ></div>
        </Link>
      </div>
      <div className="title">
        <Link to="/" className="link"></Link>
      </div>
      <div className="price">
        <span className="left"></span>
        <span className="right"></span>
      </div>
      <div className="add-to-cart">
        <button
          className="blink-animation"
          style={{
            background: "#eee",
            width: "80%",
            height: "30px",
            boxShadow: "none",
          }}
        ></button>
      </div>
    </div>
  );
}
export function NormalItems(props) {
  return (
    <div className="normal-items-container">
      {item.map((i) => {
        return (
          <NormalItem key={i.id} item_id={i.id} name={i.name} image={i.image} />
        );
      })}
    </div>
  );
}

/**** Normal items end *** */

/*** Deals items start ** */
function DealsItem(props) {
  var globalState = useContext(globalContext);

  function addToCart(item_id, image, name, price, quantity) {
    var cart_items = globalState.state.cartItems;
    var noOfCartItems = globalState.state.noOfCartItems;

    cart_items.push({ item_id, image, name, price, quantity });
    globalState.setState((state) => {
      return {
        ...state,
        cartItems: cart_items,
        noOfCartItems: noOfCartItems + 1,
      };
    });

    cart_items = JSON.stringify(cart_items);
    localStorage.setItem(globalState.state.cartId, cart_items);

    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: <strong>Added to Cart! {item_id}</strong>,
      html: <i>This item has been added to cart!</i>,
      icon: "success",
    });
  }
  return (
    <div className="deals-item">
      <div className="image-container">
        <Link to={`/product/${props.item_id}`} className="link">
          <img src={props.image} alt="" className="image" />
          <span className="label">-20%</span>
        </Link>
      </div>
      <div className="title">
        <Link to={`/product/${props.item_id}`} className="link">
          {props.name}
        </Link>
      </div>
    </div>
  );
}
export function DealsItems(props) {
  return (
    <div className="deals-items-container">
      <div className="header">More Deals to Expect</div>
      {item.map((i) => {
        return (
          <DealsItem key={i.id} item_id={i.id} name={i.name} image={i.image} />
        );
      })}
    </div>
  );
}

/*** Deals items end ** */

/*** Grouped items start ** */

function GroupedItem(props) {
  return (
    <div className="grouped-item">
      <div className="title">{props.title}</div>

      <div className="item">
        <div className="image-container">
          <img src={chicken} alt="" />
        </div>
        <div className="price">$6.00</div>
        <div className="trending-now">Trending Now</div>
      </div>

      <div className="item">
        <div className="image-container">
          <img src={pepper} alt="" />
        </div>
        <div className="price">$6.00</div>
        <div className="trending-now">Trending Now</div>
      </div>

      <div className="item">
        <div className="image-container">
          <img src={ricebag} alt="" />
        </div>
        <div className="price">$6.00</div>
        <div className="trending-now">Trending Now</div>
      </div>
    </div>
  );
}
export function GroupedItems(props) {
  return (
    <div className="grouped-items-container">
      <GroupedItem title="New Arrivals" />
      <GroupedItem title="Top Ranking Products" />
      <GroupedItem title="Global Sources" />
    </div>
  );
}
/*** Grouped items end *** */
