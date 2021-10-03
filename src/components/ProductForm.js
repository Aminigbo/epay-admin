import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  FormControl,
  Button,
  makeStyles,
  IconButton,
  useMediaQuery,
} from "@material-ui/core";
import images from "../images/image";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";

const useStyles = makeStyles({
  formImg: {
    backgroundImage: `url(${images.form2})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    objectFit: "cover",
    backgroundRepeat: "no-repeat",
    height: "auto",
    width: "100%",
  },
});

function ProductForm({
  prevForm,
  display,
  nextForm,
  productName,
  productType,
  primaryIndustry,
  developmentStage,
  productDes,
  setProductName,
  setProductType,
  setPrimaryIndustry,
  setDevelopmentStage,
  setProductDes,
}) {
  const isActive = useMediaQuery("(max-width:959px)");

  //   product error state
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");
  const [error5, setError5] = useState("");

  const next = () => {
    if (productName === "") {
      setError("Enter a product name");
      setError2("");
      setError3("");
      setError4("");
      setError5("");
      return false;
    } else if (productType === "") {
      setError("");
      setError2("Enter select the type of product");
      setError3("");
      setError4("");
      setError5("");
      return false;
    } else if (primaryIndustry === "") {
      setError("");
      setError2("");
      setError3("Enter the primary industry for the product");
      setError4("");
      setError5("");
      return false;
    } else if (developmentStage === "") {
      setError("");
      setError2("");
      setError3("");
      setError4("Select the development stage for the product");
      setError5("");
      return false;
    } else if (productDes === "") {
      setError("");
      setError2("");
      setError3("");
      setError4("");
      setError5("Write a little about you product");
      return false;
    } else if (productDes.length > 200) {
      setError("");
      setError2("");
      setError3("");
      setError4("");
      setError5("letters should not be more than 200");
      return false;
    } else {
      setError("");
      setError2("");
      setError3("");
      setError4("");
      setError5("");
      nextForm();
    }
  };

  const classes = useStyles();
  return (
    <>
      <Container style={{ display: display, marginTop: "100px" }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={5} className={classes.formImg}>
            <div
              style={{
                backgroundColor: "#ff5b5e69",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: isActive ? 20 : 0,
              }}
            >
              <div>
                <div
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "30px",
                  }}
                >
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                    }}
                  >
                    <img src={images.logo2} alt="" height="100%" width="100%" />
                  </div>
                </div>
                <Typography
                  align="center"
                  style={{ color: "#fff", paddingBottom: "40px" }}
                  variant="h4"
                >
                  Just Be Patient.
                  <br /> You Are Almost There...
                </Typography>
                <Typography
                  align="center"
                  style={{ color: "#fff", paddingBottom: "10px" }}
                  variant="h4"
                >
                  Please, Let's Know About Your Product
                </Typography>
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <IconButton>
                    <FacebookIcon style={{ color: "#fff" }} />
                  </IconButton>
                  <IconButton>
                    <TwitterIcon style={{ color: "#fff" }} />
                  </IconButton>
                  <IconButton>
                    <YouTubeIcon style={{ color: "#fff" }} />
                  </IconButton>
                  <IconButton>
                    <InstagramIcon style={{ color: "#fff" }} />
                  </IconButton>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={7}>
            <Paper
              style={{
                padding: isActive ? "10px 0px 10px 0px" : "10px 0px 10px 40px",
              }}
              elevation={0}
              square
            >
              <div
                style={{
                  display: "flex",
                  flexFlow: "row nowrap",
                  marginBottom: 20,
                }}
              >
                <div style={{ width: "45%" }}>
                  <input
                    style={{
                      width: "100%",
                      padding: "15px 10px",
                      border: "1px solid #FF5F59",
                    }}
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  <Typography variant="body1" style={{ color: "red" }}>
                    {error}
                  </Typography>
                </div>
                <div style={{ width: "45%", marginLeft: "10%" }}>
                  <FormControl
                    style={{
                      width: "100%",
                    }}
                  >
                    {/* <InputLabel color="secondary">Product Type</InputLabel> */}
                    <select
                      style={{
                        width: "100%",
                        padding: "15px 10px",
                        border: "1px solid #FF5F59",
                      }}
                      value={productType}
                      onChange={(e) => setProductType(e.target.value)}
                    >
                      <option value="" disabled>Select a Product Type</option>
                      <option value="website">Website</option>
                      <option value="mobile app">Mobile apps</option>
                      <option value="digital marketing">Digital marketing</option>
                      <option value="IoT">IoT</option>
                    </select>
                  </FormControl>
                  <Typography variant="body1" style={{ color: "red" }}>
                    {error2}
                  </Typography>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexFlow: "row nowrap",
                  marginBottom: "50px",
                }}
              >
                <div style={{ width: "45%" }}>
                  <FormControl
                    style={{
                      width: "100%",
                    }}
                  >
                    {/* <InputLabel color="secondary">Primary Industry</InputLabel> */}
                    <select
                      style={{
                        width: "100%",
                        padding: "15px 10px",
                        border: "1px solid #FF5F59",
                      }}
                      value={primaryIndustry}
                      onChange={(e) => setPrimaryIndustry(e.target.value)}
                    >
                      <option value="" disabled>Select Primary Industry</option>
                      <option value="FinTech">FinTech</option>
                      <option value="HealthTech">HealthTech</option>
                      <option value="Block chain">Block chain</option>
                      <option value="EdTech">EdTech</option>
                      <option value="AgroTech">AgroTech</option>
                      <option value="InsurTech">InsurTech</option>
                      <option value="BioTech">BioTech</option>
                      <option value="FoodTech">FoodTech</option>
                      <option value="Cryptocurrency">Cryptocurrency</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Logistics">Logistics</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                    </select>
                  </FormControl>
                  <Typography variant="body1" style={{ color: "red" }}>
                    {error3}
                  </Typography>
                </div>
                <div style={{ width: "45%", marginLeft: "10%" }}>
                  <FormControl
                    style={{
                      width: "100%",
                    }}
                  >
                    {/* <InputLabel color="secondary">Development Stage</InputLabel> */}
                    <select
                      style={{
                        width: "100%",
                        padding: "15px 10px",
                        border: "1px solid #FF5F59",
                      }}
                      value={developmentStage}
                      onChange={(e) => setDevelopmentStage(e.target.value)}
                    >
                      <option value="" disabled>Select a Development Stage</option>
                      <option value="Idea stage">Idea stage</option>
                      <option value="MVP">MVP</option>
                      <option value="Finished product">
                        Finished product
                      </option>
                      <option value="Launched">Launched</option>
                      <option value="Already have users">
                        Already have users
                      </option>
                      <option value="Already generating money">
                        Already generating money
                      </option>
                    </select>
                  </FormControl>
                  <Typography variant="body1" style={{ color: "red" }}>
                    {error4}
                  </Typography>
                </div>
              </div>
              <textarea
                multiline
                rows={7}
                value={productDes}
                onChange={(e) => setProductDes(e.target.value)}
                style={{
                  width: "100%",
                  padding: "15px 10px",
                  border: "1px solid #FF5F59",
                  resize:"none"
                }}
                placeholder="Enter Product Description"
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="body1"
                  style={{ color: "red", paddingTop: 10 }}
                >
                  {error5}
                </Typography>
                <Typography
                  variant="body2"
                  style={{ color: "#ccc", paddingTop: 10 }}
                >
                  (200 letters)
                </Typography>
              </div>
              <div style={{ marginTop: "50px" }}>
                <Button
                  variant="contained"
                  onClick={prevForm}
                  style={{ color: "#fff", backgroundColor: "#FF5F59" }}
                >
                  <KeyboardArrowLeftIcon style={{ paddingRight: "7px" }} />
                  Back
                </Button>
                <Button
                  variant="contained"
                  style={{
                    float: "right",
                    color: "#fff",
                    backgroundColor: "#FF5F59",
                  }}
                  onClick={next}
                >
                  Next <KeyboardArrowRightIcon style={{ paddingLeft: "7px" }} />
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ProductForm;
