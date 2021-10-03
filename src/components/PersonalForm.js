import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  FormControl,
  Button,
  makeStyles,
  useMediaQuery,
  IconButton,
} from "@material-ui/core";
import images from "../images/image";
import NaijaStates from "naija-state-local-government";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";

const useStyles = makeStyles({
  formImg: {
    backgroundImage: `url(${images.form1})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    objectFit: "cover",
    backgroundRepeat: "no-repeat",
    height: "auto",
    width: "100%",
  },
});

function PersonalForm({
  prevForm,
  display,
  nextForm,
  firstName,
  lastName,
  email,
  phone,
  state,
  gender,
  type,
  setFirstName,
  setLastName,
  setEmail,
  setPhone,
  setState,
  setGender,
  setType,
}) {
  const isActive = useMediaQuery("(max-width:959px)");

  //   personal information error state

  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");
  const [error5, setError5] = useState("");
  const [error6, setError6] = useState("");
  const [error7, setError7] = useState("");

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  let phoneno = /^\d{11}$/;

  const next = () => {
    if (firstName === "") {
      setError("FirstName must not be empty");
      setError2("");
      setError3("");
      setError4("");
      setError5("");
      setError6("");
      setError7("");
      return false;
    } else if (lastName === "") {
      setError("");
      setError2("LastName must not be empty");
      setError3("");
      setError4("");
      setError5("");
      setError6("");
      setError7("");
      return false;
    } else if (email === "") {
      setError("");
      setError2("");
      setError3("Email must not be empty");
      setError4("");
      setError5("");
      setError6("");
      setError7("");
      return false;
    } else if (!validateEmail(email)) {
      setError("");
      setError2("");
      setError3("Enter a valid Email Address");
      setError4("");
      setError5("");
      setError6("");
      setError7("");
      return false;
    } else if (phone === "") {
      setError("");
      setError2("");
      setError3("");
      setError4("Enter phone number");
      setError5("");
      setError6("");
      setError7("");
    } else if (!phone.match(phoneno)) {
      setError("");
      setError2("");
      setError3("");
      setError4("Enter a valid phone number");
      setError5("");
      setError6("");
      setError7("");
      return false;
    } else if (state === "") {
      setError("");
      setError2("");
      setError3("");
      setError4("");
      setError5("Select your state of residence");
      setError6("");
      setError7("");
      return false;
    } else if (gender === "") {
      setError("");
      setError2("");
      setError3("");
      setError4("");
      setError5("");
      setError6("Select gender");
      setError7("");
      return false;
    } else if (type === "") {
      setError("");
      setError2("");
      setError3("");
      setError4("");
      setError5("");
      setError6("");
      setError7("Select a valid type");
      return false;
    } else {
      setError("");
      setError2("");
      setError3("");
      setError4("");
      setError5("");
      setError6("");
      setError7("");
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
                  style={{ color: "#fff", paddingBottom: "20px" }}
                  variant="h4"
                >
                  You Are A Champion!
                </Typography>
                <Typography
                  align="center"
                  style={{ color: "#fff", paddingBottom: "20px" }}
                  variant="h4"
                >
                  We are happy you are here
                </Typography>
                <Typography
                  align="center"
                  style={{ color: "#fff", paddingBottom: "10px" }}
                  variant="h4"
                >
                  So, Let's get to meet you
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
              <div style={{ display: "flex", flexFlow: "row nowrap" }}>
                <div style={{ width: "45%" }}>
                  <input
                    style={{
                      width: "100%",
                      padding: "15px 10px",
                      border: "1px solid #FF5F59",
                    }}
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Typography variant="body1" style={{ color: "red" }}>
                    {error}
                  </Typography>
                </div>
                <div style={{ width: "45%", marginLeft: "10%" }}>
                  <input
                    placeholder="Last Name"
                    style={{
                      width: "100%",
                      padding: "15px 10px",
                      border: "1px solid #FF5F59",
                    }}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <Typography variant="body1" style={{ color: "red" }}>
                    {error2}
                  </Typography>
                </div>
              </div>
              <input
                style={{
                  width: "100%",
                  padding: "15px 10px",
                  border: "1px solid #FF5F59",
                  marginTop: "25px",
                }}
                placeholder="Email Address"
                variant="standard"
                color="secondary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Typography variant="body1" style={{ color: "red" }}>
                {error3}
              </Typography>
              <input
                style={{
                  width: "100%",
                  marginTop: "20px",
                  padding: "15px 10px",
                  border: "1px solid #FF5F59",
                }}
                placeholder="Phone Number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Typography variant="body1" style={{ color: "red" }}>
                {error4}
              </Typography>
              <FormControl style={{ marginTop: "20px", width: "100%" }}>
                {/* <InputLabel color="secondary">State of Residence</InputLabel> */}
                <select
                  style={{
                    width: "100%",
                    padding: "15px 10px",
                    border: "1px solid #FF5F59",
                  }}
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="" disabled>
                    Select Country
                  </option>
                  {NaijaStates.states().map((states) => (
                    <option key={states} selected value={states}>
                      {states}
                    </option>
                  ))}
                </select>
              </FormControl>
              <Typography variant="body1" style={{ color: "red" }}>
                {error5}
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexFlow: "row nowrap",
                  marginTop: "20px",
                }}
              >
                <div style={{ width: "45%" }}>
                  <FormControl style={{ width: "100%" }}>
                    {/* <InputLabel color="secondary">Gender</InputLabel> */}
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "15px 10px",
                        border: "1px solid #FF5F59",
                      }}
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </FormControl>
                  <Typography variant="body1" style={{ color: "red" }}>
                    {error6}
                  </Typography>
                </div>
                <div style={{ width: "45%", marginLeft: "10%" }}>
                  <FormControl
                    style={{
                      width: "100%",
                    }}
                  >
                    {/* <InputLabel color="secondary">I am ...</InputLabel> */}
                    <select
                      style={{ width: "100%",padding:"15px 10px", border:"1px solid #FF5F59" }}
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="" disabled>I am ...</option>
                      <option selected value="Founder">
                        Founder
                      </option>
                      <option selected value="Co-founder">
                        Co-founder
                      </option>
                    </select>
                  </FormControl>
                  <Typography variant="body1" style={{ color: "red" }}>
                    {error7}
                  </Typography>
                </div>
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

export default PersonalForm;
