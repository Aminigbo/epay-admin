import React, { useState } from "react";
import {
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Container,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
} from "@material-ui/core";
import Header from "../components/Header";
import images from "../images/image";
import WorkSection from "../components/WorkSection";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Success from "../components/Success";
import Failed from "../components/Failed";

const useStyles = makeStyles({
  hdCont: {
    width: "100%",
    height: "auto",
    backgroundColor: "#FF5B5E",
  },
});

function Investor() {
  const isActive = useMediaQuery("(max-width:959px)");

  let phoneno = /^\d{11}$/;

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const [finished, setFinished] = useState(false);
  const [failed, setFailed] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState("");
  const [lastName, setLastName] = useState("");
  const [error2, setError2] = useState("");
  const [phone, setPhone] = useState("");
  const [error3, setError3] = useState("");
  const [country, setCountry] = useState("");
  const [error4, setError4] = useState("");
  const [email, setEmail] = useState("");
  const [error5, setError5] = useState("");
  const [gender, setGender] = useState("");
  const [error6, setError6] = useState("");
  const [invest, setInvest] = useState("");
  const [error7, setError7] = useState("");
  const [prefferedStage, setPrefferedStage] = useState("");
  const [error8, setError8] = useState("");

  const [disabled, setDisabled] = useState(false);
  const [apply, setApply] = useState("Apply");

  const sendData = () => {
    fetch("https://techlauncher-backend.herokuapp.com/api/investor", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        phone_no: phone,
        country: country,
        email: email,
        gender: gender,
        invest: invest,
        preferred_stage: prefferedStage,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          setFinished(true);
          setFailed(false);
          setApply("sent");
        } else {
          setFailed(true);
          setFinished(false);
        }
      });
  };

  const next = () => {
    if (firstName === "") {
      setError("Enter your first name");
      setError2("");
      setError3("");
      setError4("");
      setError5("");
      setError6("");
      setError7("");
      setError8("");
      return false;
    } else if (lastName === "") {
      setError("");
      setError2("Enter your last name");
      setError3("");
      setError4("");
      setError5("");
      setError6("");
      setError7("");
      setError8("");
      return false;
    } else if (phone === "") {
      setError("");
      setError2("");
      setError3("Enter your phone number");
      setError4("");
      setError5("");
      setError6("");
      setError7("");
      setError8("");
      return false;
    } else if (!phone.match(phoneno)) {
      setError("");
      setError2("");
      setError3("Enter a valid phone number");
      setError4("");
      setError5("");
      setError6("");
      setError7("");
      setError8("");
      return false;
    } else if (country === "") {
      setError("");
      setError2("");
      setError3("");
      setError4("Select your country");
      setError5("");
      setError6("");
      setError7("");
      setError8("");
      return false;
    } else if (email === "") {
      setError("");
      setError2("");
      setError3("");
      setError4("");
      setError5("Enter your email address");
      setError6("");
      setError7("");
      setError8("");
      return false;
    } else if (!validateEmail(email)) {
      setError("");
      setError2("");
      setError3("");
      setError4("");
      setError5("Enter a valid email address");
      setError6("");
      setError7("");
      setError8("");
      return false;
    } else if (gender === "") {
      setError("");
      setError2("");
      setError3("");
      setError4("");
      setError5("");
      setError6("Select your gender");
      setError7("");
      setError8("");
      return false;
    } else if (invest === "") {
      setError("");
      setError2("");
      setError3("");
      setError4("");
      setError5("");
      setError6("");
      setError7("Select where you would like to invest");
      setError8("");
      return false;
    } else if (prefferedStage === "") {
      setError("");
      setError2("");
      setError3("");
      setError4("");
      setError5("");
      setError6("");
      setError7("");
      setError8("Enter your preferred stage of investing");
      return false;
    } else {
      setError("");
      setError2("");
      setError3("");
      setError4("");
      setError5("");
      setError6("");
      setError7("");
      setError8("");
      setDisabled(true);
      setApply(<CircularProgress size={15} style={{ color: "#fff" }} />);
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
          <Header color="#fff" menu="#FFf" />
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: 0 }}>
        <Grid item container xs={12} md={7} style={{ padding: "0 30px" }}>
          <Grid item xs={12} md={12}>
            <div
              style={{
                width: "100%",
                height: "auto",
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
                marginTop: "40px",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  backgroundColor: "#fff",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img src={images.logo2} alt="" height="100%" width="100%" />
              </div>
            </div>
            <Typography
              variant="h4"
              align="center"
              style={{ color: "#FF5F59", paddingBottom: "40px" }}
            >
              BECOME AN INVESTOR
            </Typography>
          </Grid>
          <Grid item container spacing={5}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                style={{ width: "100%" }}
                label="First Name"
                variant="standard"
                color="secondary"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Typography variant="body1" style={{ color: "red" }}>
                {error}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                style={{ width: "100%" }}
                label="Last Name"
                variant="standard"
                color="secondary"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Typography variant="body1" style={{ color: "red" }}>
                {error2}
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
              <Typography variant="body1" style={{ color: "red" }}>
                {error3}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <FormControl
                style={{
                  width: "100%",
                }}
              >
                <InputLabel color="secondary">Country</InputLabel>
                <Select
                  color="secondary"
                  labelId="demo-simple-select-label"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <MenuItem value="Nigeria">Nigeria</MenuItem>
                  <MenuItem value="South Africa">South Africa</MenuItem>
                  <MenuItem value="U.S.A">U.S.A</MenuItem>
                  <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                  <MenuItem value="Canada">Canada</MenuItem>
                  <MenuItem value="Finland">Finland</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="body1" style={{ color: "red" }}>
                {error4}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                style={{ width: "100%" }}
                label="Email Address"
                variant="standard"
                color="secondary"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Typography variant="body1" style={{ color: "red" }}>
                {error5}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <FormControl
                style={{
                  width: "100%",
                }}
              >
                <InputLabel color="secondary">Gender</InputLabel>
                <Select
                  color="secondary"
                  labelId="demo-simple-select-label"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="body1" style={{ color: "red" }}>
                {error6}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <FormControl
                style={{
                  width: "100%",
                }}
              >
                <InputLabel color="secondary">
                  Where would you like to invest in?
                </InputLabel>
                <Select
                  color="secondary"
                  labelId="demo-simple-select-label"
                  value={invest}
                  onChange={(e) => setInvest(e.target.value)}
                >
                  <MenuItem value="FinTech">FinTech</MenuItem>
                  <MenuItem value="HealthTech">HealthTech</MenuItem>
                  <MenuItem value="Block chain">Block chain</MenuItem>
                  <MenuItem value="EdTech">EdTech</MenuItem>
                  <MenuItem value="AgroTech">AgroTech</MenuItem>
                  <MenuItem value="InsurTech">InsurTech</MenuItem>
                  <MenuItem value="BioTech">BioTech</MenuItem>
                  <MenuItem value="FoodTech">FoodTech</MenuItem>
                  <MenuItem value="Cryptocurrency">Cryptocurrency</MenuItem>
                  <MenuItem value="E-commerce">E-commerce</MenuItem>
                  <MenuItem value="Entertainment">Entertainment</MenuItem>
                  <MenuItem value="Logistics">Logistics</MenuItem>
                  <MenuItem value="Cybersecurity">Cybersecurity</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="body1" style={{ color: "red" }}>
                {error7}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <FormControl
                style={{
                  width: "100%",
                }}
              >
                <InputLabel color="secondary">
                  What's your preferred stage of investing?
                </InputLabel>
                <Select
                  color="secondary"
                  labelId="demo-simple-select-label"
                  value={prefferedStage}
                  onChange={(e) => setPrefferedStage(e.target.value)}
                >
                  <MenuItem value="Idea Stage">Idea Stage</MenuItem>
                  <MenuItem value="M.V.P">M.V.P</MenuItem>
                  <MenuItem value="Seed Stage">Seed Stage</MenuItem>
                  <MenuItem value="Series A">Series A</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="body1" style={{ color: "red" }}>
                {error8}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Button
                variant="contained"
                style={{
                  color: "#fff",
                  backgroundColor: "#FF5F59",
                  padding: "10px 25px",
                }}
                onClick={next}
                disabled={disabled}
              >
                {apply}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          style={{ display: isActive ? "none" : "block" }}
        >
          <div
            style={{
              backgroundColor: "#FF5B5E",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: isActive ? 20 : 0,
            }}
          >
            <div>
              <Typography
                variant="h4"
                align="center"
                style={{ color: "#fff", marginBottom: 30 }}
              >
                Loads of Tech StartUps with validated business models and
                amazing prospects are waiting to have a handshake with you
              </Typography>
              <div
                style={{
                  width: "100%",
                  height: "320px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img src={images.investorPics} alt="" />
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <Container>
        <div
          style={{
            height: 3,
            width: "20%",
            marginLeft: "40%",
            marginTop: "100px",
            marginBottom: 10,
            backgroundColor: "#FF6256",
          }}
        />
        <Typography
          variant="h4"
          align="center"
          style={{ paddingBottom: "50px" }}
        >
          How It Works
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <WorkSection value={1} header="Come In">
              First, you fill in the brief form above.
              <br />
              Welcome.
            </WorkSection>
          </Grid>
          <Grid item xs={12} md={6}>
            <WorkSection
              value={2}
              header="We Meet You"
              content="Then, we will reach out to you, familiarize with you, answer some of your questions, talk to you about our progress so far and with your approval include you on our list of investors."
            />
          </Grid>
          <Grid xs={12} item md={6}>
            <WorkSection
              value={3}
              header="We Notify You"
              content="We will consistently feed you with information about profiled and verified startups that are seeking to raise capital."
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <WorkSection
              value={4}
              header="It’s Your Call"
              content="It is totally up to you to decide which of those startups that tickles your fancy."
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <WorkSection
              value={5}
              header="Details at your disposal"
              content="We will finish with more of details of the startup you’ve picked interest in: stage of the product, MVP validation, financial analysis, tractions (if any), funding required, team, product future."
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <WorkSection
              value={6}
              header="Peace of Mind"
              content="You go ahead review the information provided about the startup knowing that we have done our due diligence and all the startups in our pool have gone through our validation model and certified investment ready."
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <WorkSection
              value={7}
              header="Meet, Negotiate and Invest"
              content="Yes, you can schedule to meet with the founders to negotiate and clear out grey areas and eventually have a handshake.
              "
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <WorkSection
              value={8}
              header="Don’t worry, We follow up"
              content="You shouldn’t lose sleep at all. Just remember that we are doing a follow up and providing mentorship for the startup you’ve invested in. we ensure that KPI’s are met and business and financial goals are met."
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <WorkSection
              value={9}
              header="Your ROI is on the way"
              content="Thanks for investing. Your ROI will come in big."
            />
          </Grid>
        </Grid>
      </Container>
      <Container style={{ paddingBottom: "100px" }}>
        <div
          style={{
            height: 3,
            width: "20%",
            marginLeft: "40%",
            marginTop: "100px",
            backgroundColor: "#FF6256",
          }}
        />
        <Typography
          variant={isActive ? "h4" : "h3"}
          align="center"
          style={{ padding: "30px 0 50px 0" }}
        >
          Frequently Asked Questions
        </Typography>
        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Accordion 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Accordion 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Accordion 3</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Accordion 4</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
      <Success open={finished} close={setFinished} />
      <Failed openFailed={failed} closeFailed={setFailed} />
    </>
  );
}

export default Investor;
