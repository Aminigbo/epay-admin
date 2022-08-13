import React, { useContext, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

import SiteLoader from "../site_loader";
import { isLoggedIn } from "../../handlers/vendorsHandler";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PlacesAutocomplete from "../placesAutocomplete";
// import autocomplete from 'autocompleter';
// import "autocompleter/autocomplete.css"
import Suggestion from 'search-suggestion';
import images from "./prod-cat-images/images"

import { productList } from "./prod-cat"
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
        src={'https://jdptlyjoqfaypjklxsgv.supabase.co/storage/v1/object/public/images/' + image}
        alt=""
      />
      <button className="remove-btn">
        <CloseIcon className="icon" onClick={() => removeImage()} />
      </button>
    </div>
  );
}
function VendorAddProduct() {
  const [region, setRegion] = useState();
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
  const [loading, setLoading] = useState();
  const [vendorDetails, setVendorDetails] = useState();
  const [details, setDetails] = useState({
    name: "",
    category: " ",
    price: "",
    quantity: 1, 
    description: "", 
    color:"",
  });

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

  var vendor_id;
  useEffect(() => {
    // verifyLogin();
    setProductCode(generateProductCode());
    setProductId(uuid());
  }, []);

  async function verifyLogin() {
    if (await isLoggedIn()) {
      setLoading(false);
      vendor_id = JSON.parse(
        localStorage.getItem("afm_vendor_access_token")
      ).vendor_id;
      setVendorId(vendor_id);
      getVendorDetails();
    } else {
      navigate("/vendors/login");
    }
  }
  async function handleSend() {
    console.log(imagesArray)
    setLoading(true);
    var images_to_upload = [];
    for (var i = 0; i < imagesArray.length; i++) {
      images_to_upload.push({product_id: productId, src: imagesArray[i]});
    }

    let { data, error } = await supabase.from("products").insert([
      {
        product_id: productId, 
        name: details.name,
        category: details.category, 
        price: details.price,
        quantity: details.quantity, 
        description: details.description,
        product_code: productCode,
        images: imagesArray,
      },
    ]);

    if (error) {
      alert(error.message);
      setLoading(false);
    } else if (data) {
      setLoading(false); 
      let uploaded = await MySwal.fire({
        title: <strong>Product uploaded!</strong>,
        html: <i>You have successfully uploaded this product</i>,
        icon: "success",
        // showCancelButton: true,
        confirmButtonText: "Ok",
      });
      if (uploaded.isConfirmed) {
        setLoading(true);
        window.location.href = "/vendors/add-product";
      }
    }
  }

  async function getVendorDetails() {
    setLoading(true);
    let { data: vendors, error } = await supabase
      .from("vendors")
      .select("*")
      .eq("vendor_id", vendor_id);
    if (error) {
      alert(error.message);
    } else {
      setVendorDetails(vendors[0]);

      setLoading(false);
    }
  }

  function quantities() {
    let numbers = [];
    for (var i = 1; i < 1000; i++) {
      numbers.push(i);
    }

    return numbers;
  }






  const [items, setitems] = useState(productList('ALL'));

  // let items = [
  //   { code: 'af', name: 'Afghanistan' },
  //   { code: 'ax', name: 'Aland Islands' },
  //   { code: 'al', name: 'Albania' },
  // ]

  const [newimage, setnewimage] = useState()
  const [defaultData, setdefaultData] = useState({
    defaultImg: false,
    defaultImgSRC: ""
  })

  const [currentData, setcurrentData] = useState()
  let createData = (word, data) => {
    const re = new RegExp(`${word.toLowerCase()}.*\\B`, 'g');
    let ht = data.filter(item => re.test(item.toLowerCase()));
    return ht;
  };

  let handleChange = e => {
    const value = e.target.value;
    let filterData = [];
    if (value) {
      filterData = createData(value, items);
    }
    setcurrentData(filterData)
    // setnewimage(e.target.value)

    setdefaultData({
      ...defaultData,
      defaultImg: false,
      item: ''
    })
  };



  return (
    <div className="vendor-dashboard">
      <SiteLoader show={loading} />
      <HeaderLiner />
      <div className="dashboard">
        <Left page="add-product" />
        <div className={`right ${globalState.state.vendorDashboardRightClass}`}>
          <MenuBtn />
          <div className="vendor-add-product">
            {/* <div style={{ width: "90%", margin: "auto", marginTop: "10px", marginBotton: "10px" }}>
              <a href="#" style={{ textDecoration: "none" }} onClick={() => navigate(-1)}> {"<<"} back</a>
            </div> */}
            <div className="form-container">
              <div className="row1">
                <div className="title">Add Product</div> 

                <label>Product Name</label>
                <input
                  type="text"
                  value={details.name}
                  className="field"
                  onChange={(e) => {
                    setDetails((state) => ({
                      ...state,
                      name: e.target.value,
                    }));
                  }
                  }
                /> 

                  <label>Product type</label>
                <input
                  type="text"
                  value={details.category}
                  className="field"
                  onChange={(e) => {
                    setDetails((state) => ({
                      ...state,
                      category: e.target.value,
                    }));
                  }
                  }
                /> 

                <label>Color</label>
                <input
                  type="text"
                  value={details.color}
                  className="field"
                  onChange={(e) =>
                    setDetails((state) => ({ ...state, color: e.target.value }))
                  }
                />

                <label>Price (NGN)</label>
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
                  onChange={(e) => {
                    if (e.target.value.length < 101) {
                      setDetails((state) => ({
                        ...state,
                        description: e.target.value,
                      }))
                    }
                  }
                  }
                ></textarea>

                <div className="submit-btn-container">
                  <button
                    className="submit-btn"
                    disabled={loading}
                    onClick={() => {
                      // if (vendorDetails.verification_status !== "verified") {
                      //   MySwal.fire({
                      //     title: <strong>Unverified account!</strong>,
                      //     html: (
                      //       <i>
                      //         Your account is not yet verified. Kindly visit
                      //         your "verifications" page to submit neccessary
                      //         documents
                      //       </i>
                      //     ),
                      //     icon: "warning",
                      //     // showCancelButton: true,
                      //     confirmButtonText: "Ok",
                      //   });
                      // } else
                        
                        if (details.name === "") {
                        alert("name cannot be empty!");
                      } else if (details.category === "") {
                        alert("category cannot be empty!");
                      } else if (details.price === "") {
                        alert("price cannot be empty!");
                      } else if (details.quantity === "") {
                        alert("quantity cannot be empty!");
                      }  else if (details.description === "") {
                        alert("description cannot be empty!");
                      } else if (imagesArray.length === 0) {
                        alert("You must add atleast one image");
                      } else {
                        handleSend();
                        // console.log(details);
                      }
                    }}
                  >
                    {loading ? "Uploading..." : "Upload"}
                  </button>
                </div>
              </div>
              <div className="row2">

                {defaultData.defaultImg == true ? <>
                  {console.log(defaultData.item)}
                  <div className="images-display-container">
                    <img
                      src={defaultData.item}
                      alt=""
                      className="image"
                      style={{ width: "40%", height: "auto" }}
                    />
                  </div>
                </> :
                  <><div
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
                    </div> <div className="text">
                      Click here to add images <br /> Support: Jpeg, Jpg, png
                      <input
                        type="file"
                        style={{ display: "none" }}
                        ref={addImageRef}
                        onChange={(e) => handleUploadImage(e)}
                      />
                    </div>



                  </div></>}

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

export default VendorAddProduct;
