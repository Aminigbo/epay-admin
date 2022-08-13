import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import "./vendors.css";
import HeaderLiner from "../header-liner";
import Left from "./left";
import MenuBtn from "./menu-btn";
import { globalContext } from "../../global-context";
import poweroil from "../../images/poweroil.jpeg";
import Button from "@mui/material/Button";
import { supabase } from "../../supabaseClient";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import SiteLoader from "../site_loader";
import MyChart from "./mychart";
import { isLoggedIn } from "../../handlers/vendorsHandler";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { uploadImage } from "../../handlers/imagesHandler";
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
    <>
      <div className="image-box" style={{ display: show }}>
        <CancelRoundedIcon
          className="cancel-btn"
          onClick={() => removeImage()}
        />
        <img src={process.env.REACT_APP_IMAGES_STORAGE_BUCKET + image} alt="" />
      </div>
    </>
  );
}
function VendorVerifications({ session }) {
  const globalState = useContext(globalContext);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [imagesArray, setImagesArray] = useState([]);
  const addImageRef = useRef();

  const navigate = useNavigate();
  var vendor_id;
  useEffect(() => {
    verifyLogin();
  }, []);

  async function verifyLogin() {
    if (await isLoggedIn()) {
      setLoading(false);
      vendor_id = JSON.parse(
        localStorage.getItem("afm_vendor_access_token")
      ).vendor_id;
      getDetails();
    } else {
      navigate("/vendors/login");
    }
  }
  async function getDetails() {
    setLoading(true);
    let { data: vendors, error } = await supabase
      .from("vendors")
      .select("*")
      .eq("vendor_id", vendor_id);
    if (error) {
      alert(error.message);
    } else {
      setDetails(vendors[0]);

      setLoading(false);
    }
  }

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

  async function handleVerification() {
    vendor_id = JSON.parse(
      localStorage.getItem("afm_vendor_access_token")
    ).vendor_id;
    setLoading(true);
    const { data, error } = await supabase.from("verifications").insert([
      {
        account_type: "vendor",
        account_id: vendor_id,
        images: JSON.stringify(imagesArray),
        status: "pending",
      },
    ]);

    if (error) {
      alert(error.message);
      setLoading(false);
    } else if (data) {
      const { data, error } = await supabase
        .from("vendors")
        .update({ verification_status: "pending" })
        .eq("vendor_id", vendor_id);
      if (error) {
        alert(error.message);
        setLoading(false);
      } else if (data) {
        setLoading(false);
        let sent = await MySwal.fire({
          title: <strong>Documents uploaded</strong>,
          html: (
            <i>
              Your verification documents have been successfully uploaded and
              your verification is currenly pending approval
            </i>
          ),
          icon: "success",
          // showCancelButton: true,
          confirmButtonText: "Ok",
        });

        if (sent.isConfirmed) {
          window.location.href = "/vendors/verifications";
        }
      }
    }
  }
  return (
    <div className="vendor-dashboard">
      <SiteLoader show={loading} />
      <HeaderLiner />
      <div className="dashboard">
        <Left page="verifications" />
        <div className={`right ${globalState.state.vendorDashboardRightClass}`}>
          <MenuBtn />
          <div className="vendor-verifications">
            {details && details.verification_status === "verified" ? (
              <>
                <div className="verified-container">
                  <div className="box">
                    <div className="icon-container">
                      <CheckCircleIcon className="icon" />
                    </div>
                    <div className="title">
                      Your account has been sucessfully verified!
                    </div>
                    <div className="description">
                      Your verification documents you submitted has been
                      successfully approved and your account is now verified
                    </div>
                    <div className="btn-container">
                      <button
                        className="btn"
                        onClick={() => {
                          navigate("/vendors/add-product");
                        }}
                      >
                        Upload products
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            {details && details.verification_status === "pending" ? (
              <>
                <div className="verified-container">
                  <div className="box">
                    <div className="icon-container">
                      <AutorenewIcon
                        className="icon"
                        style={{ color: "orange" }}
                      />
                    </div>
                    <div className="title" style={{ color: "orange" }}>
                      Verfication pending
                    </div>
                    <div className="description">
                      Your verification documents you submitted has been
                      successfully uploaded and your verification is awaiting
                      approval by our team.
                    </div>
                    <div className="btn-container">
                      {/* <button className="btn">Upload products</button> */}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            {details && details.verification_status === "not verified" ? (
              <>
                <div className="not-verified-container">
                  <div className="box">
                    <div className="info">
                      <HighlightOffIcon className="cancel-icon" /> Your account
                      is not yet verified. Kindly upload your Identity documents
                      below for verification by our team. (Drivers licence)
                    </div>
                    <div
                      className="upload-box"
                      onClick={() => addImageRef.current.click()}
                    >
                      <div className="icon-container">
                        <CloudUploadIcon className="icon" />
                      </div>
                      <div className="description">
                        Click to upload document
                      </div>
                    </div>
                    <div className="note">
                      {!isUploading ? (
                        <>
                          You can continue clicking on the "Click to upload" box
                          to add more files 
                        </>
                      ) : (
                        <div
                          className={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Loader
                            type="TailSpin"
                            color="#3bb77e"
                            height={50}
                            width={50}
                          />
                        </div>
                      )}

                      <input
                        type="file"
                        style={{ display: "none" }}
                        ref={addImageRef}
                        onChange={(e) => handleUploadImage(e)}
                      />
                    </div>
                    <div className="images-container">
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
                    <div className="submit-btn-container">
                      <button
                        className="submit-btn"
                        onClick={() => {
                          if (imagesArray.length === 0) {
                            alert("You must add at least one image");
                          } else {
                            handleVerification();
                          }
                        }}
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorVerifications;
