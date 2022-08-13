import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import "./vendors.css";
import HeaderLiner from "../header-liner";
import Left from "./left";
import MenuBtn from "./menu-btn";
import { globalContext } from "../../global-context";
import poweroil from "../../images/poweroil.jpeg";
import CreateIconOutlined from "@mui/icons-material/CreateOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { getVendorProducts } from "../../handlers/vendorsHandler";
import { supabase } from "../../supabaseClient";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import SiteLoader from "../site_loader";
import { isLoggedIn } from "../../handlers/vendorsHandler";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

function Item({ products, setProducts, item, isSearched }) {
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState("");
  const navigate = useNavigate();
  var background = "";
  if (isSearched) {
    background = " #bae6d2";
  }

  async function remove() {
    let removeProduct = await MySwal.fire({
      title: <strong>Delete product?</strong>,
      html: (
        <i>You are about to delete this product. do you wish to continue?</i>
      ),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, I want",
      cancelButtonText: "No, I don't",
    });
    if (removeProduct.isConfirmed) {
      setLoading(true);
      let { data: ordered_products, error } = await supabase
        .from("ordered_products")
        .select("*")
        .eq("product_id", `${item.product_id}`);

      if (error) {
        setLoading(false);
      } else if (ordered_products) {
        if (ordered_products.length === 0) {
          let { data, error } = await supabase
            .from("products")
            .delete()
            .eq("product_id", `${item.product_id}`);
          setLoading(false);
          if (error) {
            alert(error.message);
          } else if (data) {
            setLoading(false);
            var p = products;
            for (var i = 0; i < p.length; i++) {
              if (p[i].product_id === item.product_id) {
                p.splice(i, 1);
                setProducts(p);
                setDisplay("none");
              }
            }
            let productDeleted = await MySwal.fire({
              title: <strong>Prduct deleted</strong>,
              html: <i>Product have been successfully deleted</i>,
              icon: "success",
              confirmButtonText: "Ok",
            });
          }
        } else {
          MySwal.fire({
            title: <strong>Unable to delete product</strong>,
            html: (
              <i>
                This product has been ordered so you can't delete it. please go
                to 'edit' product and set status to 'inactive' instead
              </i>
            ),
            icon: "info",
            confirmButtonText: "Ok",
          });
          setLoading(false);
        }
      }
    }
  }
  return (
    <tr style={{ display: display, background: background }}>
      <td>
        {" "}

        {console.log(item)}
        <img
          src={"https://jdptlyjoqfaypjklxsgv.supabase.co/storage/v1/object/public/images/" + item.images[0]}
          alt=""
          className="image"
          style={{ width: "40px", height: "auto" }}
        />
      </td>
      <td>
        {" "}
        <Link
          to={`/product/${item.product_id}`}
          className="link"
          style={{ color: "mediumseagreen" }}
        >{`${item.name} `}</Link>
      </td>
      <td>{item.product_code}</td>
      <td>{item.category}</td>
      <td>${item.price}</td>
      <td>
        {item.quantity > 0 ? `${item.quantity} in stock` : "out of stock"}
      </td>
      <td>
        <CreateIconOutlined
          class="edit-icon"
          onClick={() => {
            navigate(`/vendors/edit-product/${item.product_id}`);
          }}
          style={{ width: "20px", height: "auto" }}
        />
        {!loading ? (
          <DeleteOutlineIcon
            class="delete-icon"
            onClick={() => {
              remove();
            }}
            style={{ width: "20px", height: "auto" }}
          />
        ) : (
          "..."
        )}
      </td>
    </tr>
  );
}
function VendorMyProducts({ session }) {
  const globalState = useContext(globalContext);
  const [products, setProducts] = useState();
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [noOfProducts, setNoOfProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchField, setSearchField] = useState();
  const navigate = useNavigate();
  var numberOfProducts = 0;

  useEffect(() => {
    getProducts()
  }, []);

  var vendor_id;

  async function getProducts() {
    setLoading(true);
    let { data, error } = await supabase
      .from("products")
      .select("*")
    // .eq("vendor_id", vendor_id);
    if (error) {
      alert(error.message);
      setLoading(false);
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
      {/* {console.log("searched products: " + searchedProducts)} */}
      <SiteLoader show={loading} />
      <HeaderLiner />
      <div className="dashboard">
        <Left page="my-products" />
        <div className={`right ${globalState.state.vendorDashboardRightClass}`}>
          <MenuBtn />
          <div className="vendor-orders">
            <div className="header-container">
              
              <div className="row2">
                {/* <div className="search-container">

                  <button>
                    <SearchIcon style={{ width: "20px", height: "auto" }} />
                  </button>
                  <input
                    type="text"
                    placeholder="Search by name, category & product code"
                    onChange={(e) => {
                      handleSearch(e);
                    }}
                  />
                </div> */}
                <button className="add-new-btn">
                  <Link to="/vendors/add-product" className="link">
                    + Add new
                  </Link>
                </button>
              </div>
            </div>
            <div className="afm-table" style={{ width: "90%", margin: "auto" }}>
              <h3>My Products</h3>
              <table>
                <thead>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Product code</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>availability</th>
                  <th>Action</th>
                </thead>
                <tbody>
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
                        <>
                          {console.log(products)}
                          <Item
                            key={index}
                            item={item}
                            products={products}
                            setProducts={setProducts}
                            isSearched={false}
                          />
                        </>
                      );
                    })
                    : ""}
                </tbody>
              </table>
              {numberOfProducts === 0 && !loading ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    color: "grey",
                    fontSize: "16px",
                    padding: "20px 0px",
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
  );
}

export default VendorMyProducts;
