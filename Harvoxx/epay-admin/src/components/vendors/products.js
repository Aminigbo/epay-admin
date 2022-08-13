import React, {useContext, useState, useEffect} from "react";
import "../../App.css";
import "./vendors.css";
import HeaderLiner from "../header-liner";
import Left from "./left";
import MenuBtn from "./menu-btn";
import {globalContext} from "../../global-context";
import poweroil from "../../images/poweroil.jpeg";
import CreateIconOutlined from "@mui/icons-material/CreateOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import {Link} from "react-router-dom";
import {getVendorProducts} from "../../handlers/vendorsHandler";
import {supabase} from "../../supabaseClient";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function Item({products, setProducts, item, isSearched}) {
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState("flex");
  var background = "";
  if (isSearched) {
    background = " #bae6d2";
  }

  async function remove() {
    setLoading(true);
    let {data: ordered_products, error} = await supabase
      .from("ordered_products")
      .select("*")
      .eq("product_id", item.product_d);

    if (error) {
      alert(error.message);
      setLoading(false);
    } else if (ordered_products) {
      if (ordered_products.length === 0) {
        let {data, error} = await supabase
          .from("products")
          .delete()
          .eq("product_id", item.product_id);
        setLoading(false);
        if (error) {
          alert(error.message);
        } else if (data) {
          alert("Deleted!");
          setLoading(false);
          var p = products;
          for (var i = 0; i < p.length; i++) {
            if (p[i].product_id === item.product_id) {
              p.splice(i, 1);
              setProducts(p);
              setDisplay("none");
            }
          }
        }
      } else {
        alert(
          "This product has been ordered so you can't delete it. please go to 'edit' product and set status to 'inactive' instead"
        );
        setLoading(false);
      }
    }
  }
  return (
    <div class="box" style={{display: display, background: background}}>
      <div>
        {" "}
        <img
          src={process.env.REACT_APP_IMAGES_STORAGE_BUCKET + item.images[0]}
          alt=""
          className="image"
          style={{width: "40px", height: "auto"}}
        />
      </div>
      <div>
        <Link
          to={`/product/${item.product_id}`}
          className="link"
          style={{color: "mediumseagreen"}}
        >{`${item.name} ${
          item.weight_type !== "None"
            ? ` - ${item.weight} ${item.weight_type}`
            : ""
        }`}</Link>
      </div>
      <div>{item.product_code}</div>
      <div>{item.category}</div>
      <div>${item.price}</div>
      <div>
        {item.quantity > 0 ? `${item.quantity} in stock` : "out of stock"}
      </div>
      <div>
        <button className="pending-btn">
          <Link to="/vendors/view-vendor" className="link">
            Vendor
          </Link>
        </button>
      </div>
      <div>
        <CreateIconOutlined
          class="edit-icon"
          onClick={() => {
            alert("clicked");
          }}
          style={{width: "20px", height: "auto"}}
        />
        {!loading ? (
          <DeleteOutlineIcon
            class="delete-icon"
            onClick={() => {
              remove();
            }}
            style={{width: "20px", height: "auto"}}
          />
        ) : (
          "..."
        )}
      </div>
    </div>
  );
}
function VendorProducts({session}) {
  const globalState = useContext(globalContext);
  const [products, setProducts] = useState();
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [noOfProducts, setNoOfProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchField, setSearchField] = useState();
  var numberOfProducts = 0;

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    setLoading(true);
    let {data, error} = await supabase.from("products").select("*");
    if (error) {
      alert(error.message);
    } else if (data) {
      setProducts(data);
      setLoading(false);
    }
  }

  function handleSearch(e) {
    if (products) {
      var product_details = [];
      var searched = [];
      var searched_index;
      for (var i = 0; i < products.length; i++) {
        product_details.push([
          products[i].name,
          products[i].product_code,
          products[i].category,
        ]);

        for (var j = 0; j < product_details.length; j++) {
          if (product_details[j].includes(e.target.value)) {
            // searched_index = product_details[i].indexOf(e.target.value);
            searched.push(products[j]);
          }
        }
      }

      setSearchedProducts(searched);
    }
  }
  return (
    <div className="vendor-dashboard">
      {console.log("searched products: " + searchedProducts)}
      <HeaderLiner />
      <div className="dashboard">
        <Left session={session} />
        <div className={`right ${globalState.state.vendorDashboardRightClass}`}>
          <MenuBtn />
          <div className="vendor-orders">
            <div className="header-container">
              <div className="row1">
                {/* <span>All</span>
                      <span>Category</span> */}
              </div>
              <div className="row2">
                <div className="search-container">
                  <button>
                    <SearchIcon style={{width: "20px", height: "auto"}} />
                  </button>
                  <input
                    type="text"
                    placeholder="Search by name, category & product code"
                    onChange={e => {
                      handleSearch(e);
                    }}
                  />
                </div>
                <button className="add-new-btn">
                  <Link to="/vendors/add-product" className="link">
                    + Add new
                  </Link>
                </button>
              </div>
            </div>
            <div className="table">
              <div className="title-container">
                <div>Image</div>
                <div>Product</div>
                <div>Product code</div>
                <div>Category</div>
                <div>Price</div>
                <div>Availability</div>
                <div>Vendor</div>
                <div>Action</div>
              </div>
              <div class="body-container">
                {searchedProducts.length > 0
                  ? searchedProducts.map((item, index) => {
                      numberOfProducts = numberOfProducts + 1;
                      return (
                        <Item
                          key={index}
                          item={item}
                          products={products}
                          setProducts={setProducts}
                          isSearched={true}
                        />
                      );
                    })
                  : ""}
                {products && !loading
                  ? products.map((item, index) => {
                      numberOfProducts = numberOfProducts + 1;
                      return (
                        <Item
                          key={index}
                          item={item}
                          products={products}
                          setProducts={setProducts}
                          isSearched={false}
                        />
                      );
                    })
                  : ""}
                {numberOfProducts === 0 && !loading ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      color: "grey",
                      fontSize: "16px",
                    }}
                  >
                    No items yet!
                  </div>
                ) : (
                  ""
                )}
                {loading ? (
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorProducts;
