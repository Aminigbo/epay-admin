import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  makeStyles,
  useMediaQuery,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import images from "../images/image";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import Success from "./Success";
import Failed from "./Failed";

const useStyles = makeStyles({
  formImg: {
    backgroundImage: `url(${images.form3})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    objectFit: "cover",
    backgroundRepeat: "no-repeat",
    height: "auto",
    width: "100%",
  },
});

function MarketForm({
  prevForm,
  display,
  marketDesc,
  avaMarket,
  teamSize,
  selectedFile,
  setMarketDesc,
  setAvaMarket,
  setTeamSize,
  setSelectedFile,
  sendDetails,
  finished,
  setFinished,
  failed,
  setFailed,
}) {
  const isActive = useMediaQuery("(max-width:959px)");

  //   market error state
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");
  const [finishBtn, setFinishBtn] = useState("finish");
  const [disabled, setDisabled] = useState(false);

  const next = () => {
    if (marketDesc === "") {
      setError("Describe your market ");
      setError2("");
      setError3("");
      setError4("");
      return false;
    } else if (marketDesc.length > 200) {
      setError("letters should not be more than 200");
      setError2("");
      setError3("");
      setError4("");
      return false;
    } else if (avaMarket === "") {
      setError("");
      setError2("Enter number of total available market");
      setError3("");
      setError4("");
      return false;
    } else if (/\D/.test(avaMarket)) {
      setError("");
      setError2("Enter a valid amount");
      setError3("");
      setError4("");
      return false;
    } else if (teamSize === "") {
      setError("");
      setError2("");
      setError3("Select your team size");
      setError4("");
      return false;
    } else if (selectedFile === images.upload) {
      setSelectedFile("");
      setError("");
      setError2("");
      setError3("");
      setError4("");
      setFinishBtn(
        <CircularProgress
          size={20}
          style={{ color: "#fff", margin: "5px 10px" }}
        />
      );
      setDisabled(true);
      sendDetails();
    } else if (selectedFile !== null) {
      setSelectedFile("");
      setError("");
      setError2("");
      setError3("");
      setError4("");
      setFinishBtn(
        <CircularProgress
          size={20}
          style={{ color: "#fff", margin: "5px 10px" }}
        />
      );
      setDisabled(true);
      sendDetails();
    } else if (selectedFile === null) {
      setSelectedFile("");
      setError("");
      setError2("");
      setError3("");
      setError4("");
      setFinishBtn(
        <CircularProgress
          size={20}
          style={{ color: "#fff", margin: "5px 10px" }}
        />
      );
      setDisabled(true);
      sendDetails();
    } else {
      setSelectedFile("")
      setError("");
      setError2("");
      setError3("");
      setError4("");
      setFinishBtn(
        <CircularProgress
          size={20}
          style={{ color: "#fff", margin: "5px 10px" }}
        />
      );
      setDisabled(true);
      sendDetails();
    }
  };

  const imageHandler = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setSelectedFile(reader.result);
      }
    };
    for (let i = 0; i < event.target.files.length; i++) {
      if (event.target.files.length <= 3) {
        setError4("");
        // console.log(event.target.files[i]);
        return reader.readAsDataURL(event.target.files[i]);
      } else {
        return setError4("images should not be more than 3");
      }
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
                  Hurray!
                  <br /> This is your last step
                </Typography>
                <Typography
                  align="center"
                  style={{ color: "#fff", paddingBottom: "10px" }}
                  variant="h4"
                >
                  We can't wait to be part of your journey
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
              <TextField
                id="outlined-multiline-static"
                label="Market Description"
                multiline
                rows={6}
                value={marketDesc}
                onChange={(e) => setMarketDesc(e.target.value)}
                variant="filled"
                color="secondary"
                style={{ width: "100%", marginTop: "30px" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography
                  variant="body1"
                  style={{ color: "red", paddingTop: 10, marginBottom: "30px" }}
                >
                  {error}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    color: "#ccc",
                    paddingTop: 10,
                    marginBottom: "30px",
                  }}
                >
                  (200 letters)
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  flexFlow: "row nowrap",
                  marginBottom: 20,
                }}
              >
                <div style={{ width: "45%" }}>
                  <TextField
                    style={{ width: "100%" }}
                    label="Total Available Market"
                    variant="standard"
                    color="secondary"
                    value={avaMarket}
                    onChange={(e) => setAvaMarket(e.target.value)}
                    type="tel"
                  />
                  <Typography variant="body1" style={{ color: "red" }}>
                    {error2}
                  </Typography>
                </div>
                <div style={{ width: "45%", marginLeft: "10%" }}>
                  <FormControl
                    style={{
                      width: "100%",
                    }}
                  >
                    <InputLabel color="secondary">Team Size</InputLabel>
                    <Select
                      color="secondary"
                      labelId="demo-simple-select-label"
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                    >
                      <MenuItem value="0-5">0-5</MenuItem>
                      <MenuItem value="6-10">6-10</MenuItem>
                      <MenuItem value="10 and above">10 and above</MenuItem>
                    </Select>
                  </FormControl>
                  <Typography variant="body1" style={{ color: "red" }}>
                    {error3}
                  </Typography>
                </div>
              </div>
              <Grid spacing={3} container style={{ marginTop: "0px" }}>
                <Grid item md={12} sm={12} xs={12}>
                  <Paper elevation={0} square>
                    <div
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          height: "80%",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={selectedFile}
                          alt=""
                          height="auto"
                          width="20%"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </div>
                    <Typography
                      variant="body2"
                      align="center"
                      style={{ paddingTop: 20 }}
                    >
                      Do you have outstanding photos that you want
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        marginTop: 10,
                      }}
                    >
                      <Button
                        variant="contained"
                        component="label"
                        style={{ color: "#fff", backgroundColor: "#FF6772" }}
                      >
                        upload
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          multiple
                          onChange={imageHandler}
                        />
                      </Button>
                    </div>
                    <Typography
                      align="center"
                      variant="body1"
                      style={{ color: "red" }}
                    >
                      {error4}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
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
                  disabled={disabled}
                >
                  {finishBtn}
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Success open={finished} close={setFinished} />
      <Failed openFailed={failed} closeFailed={setFailed} />
    </>
  );
}

export default MarketForm;
