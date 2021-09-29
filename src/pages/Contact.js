import {
  Container,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  Paper,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import images from "../images/image";
import Success from "../components/Success";
import Failed from "../components/Failed";

function Contact() {
  const [finished, setFinished] = useState(false);
  const [failed, setFailed] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [subject, setSubject] = useState("");
  const [error2, setError2] = useState("");
  const [email, setEmail] = useState("");
  const [error3, setError3] = useState("");
  const [phone, setPhone] = useState("");
  const [error4, setError4] = useState("");
  const [message, setMessage] = useState("");
  const [error5, setError5] = useState("");
  const [disabled, setDisabled] = useState(false);

  const [btn, setBtn] = useState("contact");

  const isActive = useMediaQuery("(max-width:959px)");

  const useStyles = makeStyles({
    hdCont: {
      width: "100%",
      height: "auto",
      backgroundColor: "#FF5B5E",
    },
  });

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  let phoneno = /^\d{11}$/;

  const sendData = () => {
    fetch("https://techlauncher-backend.herokuapp.com/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        name: name,
        subject: subject,
        phone_no: phone,
        email: email,
        message: message,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          setFinished(true);
          setBtn("sent");
          setFailed(false)
        } else {
          setFinished(false);
          setBtn("failed");
          setFailed(true)
        }
      });
  };

  const validate = () => {
    if (name === "") {
      setError("Enter your name");
      setError2("");
      setError3("");
      setError4("");
      setError5("");
      return false;
    } else if (subject === "") {
      setError("");
      setError2("Enter the message subject");
      setError3("");
      setError4("");
      setError5("");
      return false;
    } else if (email === "") {
      setError("");
      setError2("");
      setError3("Enter your email address");
      setError4("");
      setError5("");
      return false;
    } else if (!validateEmail(email)) {
      setError("");
      setError2("");
      setError3("Enter a valid email address");
      setError4("");
      setError5("");
      return false;
    } else if (phone === "") {
      setError("");
      setError2("");
      setError3("");
      setError4("Enter your phone number");
      setError5("");
      return false;
    } else if (!phone.match(phoneno)) {
      setError("");
      setError2("");
      setError3("");
      setError4("Enter a valid phone number");
      setError5("");
      return false;
    } else if (message === "") {
      setError("");
      setError2("");
      setError3("");
      setError4("");
      setError5("Write your message");
      return false;
    } else if (message.length > 200) {
      setError("");
      setError2("");
      setError3("");
      setError4("");
      setError5("Message should not be more than 200 letters");
      return false;
    } else {
      setError("");
      setError2("");
      setError3("");
      setError4("");
      setError5("");
      setBtn(<CircularProgress size={15} style={{ color: "#fff" }} />);
      setDisabled(true);
      sendData();
    }
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
          <Header color="#fff" menu="#fff" />
        </Grid>
      </Grid>
      <Typography
        variant={isActive ? "h4" : "h3"}
        align="center"
        style={{ paddingTop: 40, paddingBottom: 30 }}
      >
        Contact Us
      </Typography>
      <Container>
        <Grid spacing={4} container>
          <Grid item xs={12} sm={12} md={6}>
            <Paper
              elevation={3}
              style={{ height: "160px", padding: "10px 15px" }}
            >
              <div
                style={{ display: "flex", width: "100%", alignItems: "center" }}
              >
                <img src={images.phoneIcon} alt="" height="35px" width="auto" />
                <Typography
                  variant="h5"
                  style={{ paddingLeft: 15, fontSize: "calc(1.3rem + .6vw)" }}
                >
                  Call Us
                </Typography>
              </div>
              <Typography variant="body1" style={{ padding: "15px 0" }}>
                You can talk to us now or anytime
              </Typography>
              <Typography variant="body1">+2349137423273</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Paper
              elevation={3}
              style={{ height: "160px", padding: "10px 15px" }}
            >
              <div
                style={{ display: "flex", width: "100%", alignItems: "center" }}
              >
                <img src={images.whatsapp} alt="" height="35px" width="auto" />
                <Typography
                  variant="h5"
                  style={{ paddingLeft: 15, fontSize: "calc(1.3rem + .6vw)" }}
                >
                  Whatsapp
                </Typography>
              </div>
              <Typography variant="body1" style={{ padding: "15px 0" }}>
                If we can’t talk now, we are available to chat with you on
                WhatsApp{" "}
                <Link
                  target="__blank"
                  to={{ pathname: "https://wa.link/th4a3h" }}
                  style={{ color: "#FF6772" }}
                >
                  Here.
                </Link>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Paper
              elevation={3}
              style={{ height: "auto", padding: "10px 15px" }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={images.mailIcon}
                    alt=""
                    height="45px"
                    width="auto"
                  />
                </div>
                <Typography
                  variant="h5"
                  align="center"
                  style={{ fontSize: "calc(1.3rem + .6vw)" }}
                >
                  ...Better still
                </Typography>
              </div>
              <Typography
                variant="body1"
                align="center"
                style={{ padding: "10px 0" }}
              >
                You can send us an email now!
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={6} style={{ marginTop: 30 }}>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              style={{ width: "100%" }}
              label="Name"
              variant="standard"
              color="secondary"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Typography variant="body1" style={{ color: "red", marginTop: 10 }}>
              {error}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              style={{ width: "100%" }}
              label="Subject"
              variant="standard"
              color="secondary"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <Typography variant="body1" style={{ color: "red", marginTop: 10 }}>
              {error2}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              style={{ width: "100%" }}
              label="Email Address"
              variant="standard"
              color="secondary"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography variant="body1" style={{ color: "red", marginTop: 10 }}>
              {error3}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              style={{ width: "100%" }}
              label="Phone Number"
              variant="standard"
              color="secondary"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Typography variant="body1" style={{ color: "red", marginTop: 10 }}>
              {error4}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              style={{ width: "100%" }}
              label="Message"
              variant="filled"
              color="secondary"
              type="text"
              multiline
              rows={9}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Typography variant="body1" style={{ color: "red" }}>
                {error5}
              </Typography>
              <Typography variant="body2" style={{ color: "#ccc" }}>
                (200 letters)
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Button
              variant="contained"
              style={{
                float: "left",
                color: "#fff",
                padding: "10px 25px",
                backgroundColor: "#FF5F59",
              }}
              onClick={validate}
              disabled={disabled}
            >
              {btn}
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Success open={finished} close={setFinished} />
      <Failed openFailed={failed} closeFailed={setFailed} />
    </>
  );
}

export default Contact;
