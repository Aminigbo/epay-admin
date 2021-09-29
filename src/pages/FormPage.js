import { makeStyles, Grid } from "@material-ui/core";
import React, { useState } from "react";
import Header from "../components/Header";
import images from "../images/image";
import PersonalForm from "../components/PersonalForm";
import ProductForm from "../components/ProductForm";
import Packages from "../components/Packages";
import MarketForm from "../components/MarketForm";

const useStyles = makeStyles({
  hdCont: {
    width: "100%",
    height: "auto",
    backgroundColor: "#FF5B5E",
  },
  formControl: {
    width: "100%",
  },
  formImg: {
    backgroundImage: `url(${images.form1})`,
    backgroundPosition: "center",
    backgroundSize: "auto 100%",
    objectFit: "cover",
    backgroundRepeat: "no-repeat",
    height: "500px",
    width: "100%",
    backgroundColor: "red",
  },
});

function FormPage() {
  const [finished, setFinished] = useState(false);
  const [failed, setFailed] = useState(false);

  // CHANGING FORM PAGE STATE
  const [display, setDisplay] = useState("block");
  const [display2, setDisplay2] = useState("none");
  const [display3, setDisplay3] = useState("none");
  const [display4, setDisplay4] = useState("none");

  // PACKAGES STATE
  const [businessCheck, setBusinessCheck] = useState(false);
  const [legalCheck, setLegalCheck] = useState(false);
  const [fundCheck, setFundCheck] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState();

  // PERSONAL STATE
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");

  // PRODUCT STATE
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [primaryIndustry, setPrimaryIndustry] = useState("");
  const [developmentStage, setDevelopmentStage] = useState("");
  const [productDes, setProductDes] = useState("");

  // MARKET STATE
  const [marketDesc, setMarketDesc] = useState("");
  const [avaMarket, setAvaMarket] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [selectedFile, setSelectedFile] = useState(images.upload);

  //   GET PACKAGE SELECT
  const packageSelected = () => {
    const business = {
      serviceStatement: businessCheck,
      detail: "Business Development",
    };

    const legal = {
      serviceStatement: legalCheck,
      detail: "Legal Documentation",
    };

    const fund = {
      serviceStatement: fundCheck,
      detail: "Get funding",
    };

    const packages = [business, legal, fund];
    const filteredServicePackage = packages.filter(
      (servicePackage) => servicePackage.serviceStatement === true
    );
    setSelectedPackage(filteredServicePackage);
  };

  const sendDetails = async () => {
    await fetch("https://techlauncher-backend.herokuapp.com/api/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        package: selectedPackage.map((element) => `${element.detail}`),
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_no: phone,
        state: state,
        gender: gender,
        i_am: type,
        product_name: productName,
        product_type: productType,
        primary_industry: primaryIndustry,
        dev_stage: developmentStage,
        product_desc: productDes,
        market_desc: marketDesc,
        total_market: avaMarket,
        team_size: teamSize,
        uploads: selectedFile,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          setFinished(true);
          setFailed(false);
        } else if (data.status !== true) {
          setFailed(true);
          setFinished(false);
        }
      });
  };

  //   FORM PAGE ROUTE
  const toPackage = () => {
    setDisplay("block");
    setDisplay2("none");
    setDisplay3("none");
  };

  const toProfile = () => {
    setDisplay("none");
    setDisplay2("block");
    setDisplay3("none");
  };

  const toProduct = () => {
    setDisplay("none");
    setDisplay2("none");
    setDisplay3("block");
  };

  const toProductPrev = () => {
    setDisplay("none");
    setDisplay2("block");
    setDisplay3("none");
  };

  const toMarketPrev = () => {
    setDisplay("none");
    setDisplay2("none");
    setDisplay3("block");
    setDisplay4("none");
  };

  const toMarket = () => {
    setDisplay("none");
    setDisplay2("none");
    setDisplay3("none");
    setDisplay4("block");
  };

  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.hdCont}>
        <Grid
          item
          container
          xs={12}
          style={{
            backgroundColor: "Transparent",
            height: "100px",
          }}
        >
          <Header color="#fff" menu="#FFf" />
        </Grid>
      </Grid>
      {/* <Steppers activeStep={activeStep} /> */}
      <Packages
        display={display}
        nextForm={toProfile}
        businessCheck={businessCheck}
        setBusinessCheck={setBusinessCheck}
        legalCheck={legalCheck}
        setLegalCheck={setLegalCheck}
        fundCheck={fundCheck}
        setFundCheck={setFundCheck}
        packageSelected={packageSelected}
      />
      <PersonalForm
        display={display2}
        prevForm={toPackage}
        nextForm={toProduct}
        firstName={firstName}
        lastName={lastName}
        email={email}
        phone={phone}
        state={state}
        gender={gender}
        type={type}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setEmail={setEmail}
        setPhone={setPhone}
        setState={setState}
        setGender={setGender}
        setType={setType}
      />
      <ProductForm
        display={display3}
        prevForm={toProductPrev}
        nextForm={toMarket}
        productName={productName}
        productType={productType}
        primaryIndustry={primaryIndustry}
        developmentStage={developmentStage}
        productDes={productDes}
        setProductName={setProductName}
        setProductType={setProductType}
        setPrimaryIndustry={setPrimaryIndustry}
        setDevelopmentStage={setDevelopmentStage}
        setProductDes={setProductDes}
      />
      <MarketForm
        display={display4}
        prevForm={toMarketPrev}
        marketDesc={marketDesc}
        avaMarket={avaMarket}
        teamSize={teamSize}
        selectedFile={selectedFile}
        setMarketDesc={setMarketDesc}
        setAvaMarket={setAvaMarket}
        setTeamSize={setTeamSize}
        setSelectedFile={setSelectedFile}
        sendDetails={sendDetails}
        finished={finished}
        setFinished={setFinished}
        failed={failed}
        setFailed={setFailed}
      />
    </>
  );
}

export default FormPage;
