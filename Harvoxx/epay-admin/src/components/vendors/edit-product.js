import React, { useContext, useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../App.css";
import "./vendors.css";
import HeaderLiner from "../header-liner";
import Left from "./left";
import MenuBtn from "./menu-btn";
import { globalContext } from "../../global-context";
import { Link } from "react-router-dom";
import CropOriginalIcon from "@mui/icons-material/CropOriginal"; // image
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import chicken from "../../images/chicken.jpeg";
import { uploadImage } from "../../handlers/imagesHandler";
import { generateProductCode } from "../../handlers/productsHandler";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import uuid from "react-uuid";
import { supabase } from "../../supabaseClient";
import PlacesAutocomplete from "../placesAutocomplete";

import SiteLoader from "../site_loader";
import { isLoggedIn } from "../../handlers/vendorsHandler";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

function ImageBox({ image, imagesArray, setImagesArray }) {
  const [show, setShow] = useState("block");
  function removeImage() {
    var images_array = imagesArray;
    for (var i = 0; i < images_array.length; i++) {
      if (images_array[i] === image) {
        images_array.splice(i, 1);
        setShow("none");
      }
    }
    setImagesArray(images_array);
  }

  return (
    <div className="box" style={{ display: show }}>
      <img
        className="image"
        src={"https://jdptlyjoqfaypjklxsgv.supabase.co/storage/v1/object/public/images/" + image}
        alt=""
      />
      <button className="remove-btn">
        <CloseIcon className="icon" onClick={() => removeImage()} />
      </button>
    </div>
  );
}
function VendorEditProduct() {
  var regions = [
    "Alabama",
    "Alaska",
    "American Samoa",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "District of Columbia",
    "Federated States of Micronesia",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Marshall Islands",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Northern Mariana Islands",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Palau",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virgin Island",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  const navigate = useNavigate();
  const globalState = useContext(globalContext);
  const addImageRef = useRef();
  const [imagesArray, setImagesArray] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [weight, setWeight] = useState("kg");
  const [productId, setProductId] = useState();
  const [vendorId, setVendorId] = useState();
  const [productCode, setProductCode] = useState();
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState();
  const params = useParams();
  //   const [details, setDetails] = useState();
  const [details, setDetails] = useState({
    product_id: "",
    name: "",
    category: "Snacks",
    price: "",
    quantity: 1,
    weight_type: "None",
    weight: "",
    description: "",
    region: "Alabama",
  });

  var vendor_id;

  useEffect(() => {
    setDetails((state) => ({
      ...state,
      region: region,
    }));
  }, [region]);

  async function handleUploadImage(e) {
    setIsUploading(true);
    let [uploading, fileUrl, error] = await uploadImage(e);

    if (error) {
      alert(error.message);
      setIsUploading(false);
    } else if (fileUrl) {
      setImagesArray((state) => {
        return [...state, fileUrl];
      });
      setIsUploading(false);
    }
  }

  useEffect(() => {
    // verifyLogin();
    setProductCode(generateProductCode());
    setProductId(uuid());
    getDetails();
  }, []);

  async function verifyLogin() {
    if (await isLoggedIn()) {
      setLoading(false);
      vendor_id = JSON.parse(
        localStorage.getItem("afm_vendor_access_token")
      ).vendor_id;
      setVendorId(vendor_id);
      getDetails();
    } else {
      navigate("/vendors/login");
    }
  }

  async function getDetails() {
    setLoading(true);
    let { data: products, error } = await supabase
      .from("products")
      .select("*")
      .eq("product_id", params.id);

    if (error) {
      alert(error.message);
    } else if (products) {
      setDetails(products[0]);
      setImagesArray(products[0].images);
      setLoading(false);
    }
  }
  async function handleSend() {
    setLoading(true);
    // var images_to_upload = [];
    // for (var i = 0; i < imagesArray.length; i++) {
    //   images_to_upload.push({product_id: productId, src: imagesArray[i]});
    // }

    let { data, error } = await supabase
      .from("products")
      .update({
        vendor_id: vendorId,
        name: details.name,
        category: details.category,
        weight_type: details.weight_type,
        weight: details.weight,
        price: details.price,
        quantity: details.quantity,
        region: details.region,
        description: details.description,
        product_code: productCode,
        images: imagesArray,
      })
      .eq("product_id", details.product_id);

    if (error) {
      alert(error.message);
      setLoading(false);
    } else if (data) {
      setLoading(false);
      let updated = await MySwal.fire({
        title: <strong>Product updated!</strong>,
        html: <i>You have successfully updated this product</i>,
        icon: "success",
        // showCancelButton: true,
        confirmButtonText: "Ok",
      });
      if (updated.isConfirmed) {
        setLoading(true);
        window.location.href = `/vendors/edit-product/${details.product_id}`;
      }
    }
  }

  function quantities() {
    let numbers = [];
    for (var i = 1; i < 1000; i++) {
      numbers.push(i);
    }

    return numbers;
  }
  return (
    <div className="vendor-dashboard">
      <SiteLoader show={loading} />
      <HeaderLiner />
      <div className="dashboard">
        <Left page="add-product" />
        <div className={`right ${globalState.state.vendorDashboardRightClass}`}>
          <MenuBtn />
          <div className="vendor-add-product">
            <div className="form-container">
              <div className="row1">
                <div className="title">Edit product</div>

                <label>Product Name</label>
                <input
                  type="text"
                  value={details.name}
                  className="field"
                  onChange={(e) =>
                    setDetails((state) => ({ ...state, name: e.target.value }))
                  }
                />

                <label>Category</label>
                <select
                  className="field"
                  value={details.category}
                  style={{ width: "105%" }}
                  onChange={(e) =>
                    setDetails((state) => ({
                      ...state,
                      category: e.target.value,
                    }))
                  }
                >
                  <option>{details.category}</option>
                  <option>Meat</option>
                  <option>Vegetables</option>
                  <option>Leaves</option>
                </select>

                <label>Weight type</label>
                <select
                  className="field"
                  value={details.weight_type}
                  style={{ width: "105%" }}
                  onChange={(e) =>
                    setDetails((state) => ({
                      ...state,
                      weight_type: e.target.value,
                    }))
                  }
                >
                  <option>None</option>
                  <option>kg</option>
                  <option>pounds</option>
                </select>

                {details.weight_type !== "None" ? (
                  <>
                    <label>
                      Weight (
                      {details.weight_type !== "None"
                        ? details.weight_type
                        : ""}
                      )
                    </label>
                    <input
                      type="number"
                      value={details.weight}
                      className="field"
                      onChange={(e) =>
                        setDetails((state) => ({
                          ...state,
                          weight: e.target.value,
                        }))
                      }
                    />{" "}
                  </>
                ) : (
                  ""
                )}

                <label>Price ($)</label>
                <input
                  type="number"
                  value={details.price}
                  className="field"
                  onChange={(e) =>
                    setDetails((state) => ({ ...state, price: e.target.value }))
                  }
                />

                <label>Quantity</label>
                <select
                  className="field"
                  value={details.quantity}
                  style={{ width: "105%" }}
                  onChange={(e) =>
                    setDetails((state) => ({
                      ...state,
                      quantity: e.target.value,
                    }))
                  }
                >
                  {quantities().map((number, key) => {
                    return <option key={key}>{number}</option>;
                  })}
                </select> 

                <label>Description</label>
                <textarea
                  className="field textarea"
                  value={details.description}
                  onChange={(e) =>
                    setDetails((state) => ({
                      ...state,
                      description: e.target.value,
                    }))
                  }
                ></textarea>

                <div className="submit-btn-container">
                  <button
                    className="submit-btn"
                    disabled={loading}
                    onClick={() => {
                      if (details.name === "") {
                        alert("name cannot be empty!");
                      } else if (details.category === "") {
                        alert("category cannot be empty!");
                      } else if (
                        details.weight_type !== "None" &&
                        details.weight === ""
                      ) {
                        alert(
                          "Please a value for weight as your 'weight type' is not equal to 'None'"
                        );
                      } else if (details.price === "") {
                        alert("price cannot be empty!");
                      } else if (details.quantity === "") {
                        alert("quantity cannot be empty!");
                      } else if (details.region === "") {
                        alert("region cannot be empty!");
                      } else if (details.description === "") {
                        alert("description cannot be empty!");
                      } else if (imagesArray.length === 0) {
                        alert("You must add atleast one image");
                      } else {
                        handleSend();
                        // console.log(details);
                      }
                    }}
                  >
                    {loading ? "Updating..." : "Update"}
                  </button>
                </div>
              </div>
              <div className="row2">
                <div
                  className="image-drop-container"
                  onClick={() => addImageRef.current.click()}
                >
                  <div className="icon-container">
                    {!isUploading ? (
                      <AddPhotoAlternateIcon
                        style={{ width: "40px", height: "auto" }}
                      />
                    ) : (
                      <Loader
                        type="TailSpin"
                        color="#3bb77e"
                        height={50}
                        width={50}
                      />
                    )}{" "}
                  </div>
                  <div className="text">
                    Click here to add images <br /> Support: Jpeg, Jpg, png
                    <input
                      type="file"
                      style={{ display: "none" }}
                      ref={addImageRef}
                      onChange={(e) => handleUploadImage(e)}
                    />
                  </div>
                </div>
                <div className="images-display-container">
                  {imagesArray
                    ? imagesArray.map((image) => {
                      return (
                        <ImageBox
                          image={image}
                          imagesArray={imagesArray}
                          setImagesArray={setImagesArray}
                        />
                      );
                    })
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorEditProduct;
