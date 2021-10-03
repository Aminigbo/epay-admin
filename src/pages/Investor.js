import React, { useState } from "react";
import {
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  FormControl,
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
  heading: {
    color:"#FF5B5E"
  }
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
              <input
                style={{ width: "100%", padding:"15px 10px", border:"1px solid #FF5F59" }}
                placeholder="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Typography variant="body1" style={{ color: "red" }}>
                {error}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <input
                style={{ width: "100%", padding:"15px 10px", border:"1px solid #FF5F59" }}
                placeholder="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Typography variant="body1" style={{ color: "red" }}>
                {error2}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <input
                style={{ width: "100%", padding:"15px 10px", border:"1px solid #FF5F59" }}
                placeholder="Phone Number"
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
                {/* <InputLabel color="secondary">Country</InputLabel> */}
                <select
                  placeholder="Country"
                  style={{padding:"15px 10px", border:"1px solid #FF5F59"}}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="" disabled>Select Country</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="South Africa">South Africa</option>
                  <option value="U.S.A">U.S.A</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Finland">Finland</option>
                </select>
              </FormControl>
              <Typography variant="body1" style={{ color: "red" }}>
                {error4}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <input
                style={{ width: "100%", padding:"15px 10px", border:"1px solid #FF5F59" }}
                placeholder="Email Address"
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
                <select
                  style={{padding:"15px 10px", border:"1px solid #FF5F59"}}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
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
                <select
                  value={invest}
                  onChange={(e) => setInvest(e.target.value)}
                  style={{padding:"15px 10px", border:"1px solid #FF5F59"}}
                >
                  <option value="" disabled>Where would you like to invest in?</option>
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
                {error7}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <FormControl
                style={{
                  width: "100%",
                }}
              >
                {/* <InputLabel color="secondary">
                  What's your preferred stage of investing?
                </InputLabel> */}
                <select
                  style={{padding:"15px 10px", border:"1px solid #FF5F59"}}
                  value={prefferedStage}
                  onChange={(e) => setPrefferedStage(e.target.value)}
                >
                  <option value="" disabled>What's your preferred stage of investing?</option>
                  <option value="Idea Stage">Idea Stage</option>
                  <option value="M.V.P">M.V.P</option>
                  <option value="Seed Stage">Seed Stage</option>
                  <option value="Series A">Series A</option>
                </select>
              </FormControl>
              <Typography variant="body1" style={{ color: "red" }}>
                {error8}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <button
                variant="contained"
                style={{
                  color: "#fff",
                  backgroundColor: "#FF5F59",
                  padding: "8px 20px",
                  border:"none",
                  borderRadius:"5px"
                }}
                onClick={next}
                disabled={disabled}
              >
                {apply}
              </button>
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
            <Typography className={classes.heading}>
              1. Why should I invest in startups recommended by techlauncher.io?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The question is why shouldn’t you?
              <br />
              - We have a unique validation process for every tech startup
              that signs up with techlauncher.io.
              <br />
              - We dedicate our time and resources to do a proper business
              development for each tech startup to ensure that their business model works.
              <br />
              - We have established partnership with a reputable law firm to
              ensure that all loopholes are covered, and respective tech startups
              are legally protected, thereby giving investors from our pool the
              needed security and peace of mind for their investments.
              <br />
              - We link them with our pool of mentors for professional and result-oriented mentorship to
              boast their chances of surviving in the market.
              <br />
              Fact is, we do the due diligence and make sure that the startup is
              worthy of investment. We get ourselves involved in every
              tech-startup as well.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              2. If I get involved what next?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              We will establish relationship with you and feed you with details
              about the startups that you will be willing to invest in.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              3. What is Techlauncher’s investor terms?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The startup at hand will determine the investor terms. They will
              present the terms to interested investors, though Techlauncher
              will be fully involved in the conversation. However, we will stay
              true to our resolve to fight for what’s best for the tech-startup
              and the investor as well.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              4. Asides investing, are there other obligations allocated to
              Investors?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              - Investors can also opt to mentor tech-startups.
              <br />
              - Investors will be fully informed about Techlauncher events and
              can decide to fully participate (by speaking or being part of
              panels).
              <br />- Investors can also be part of any of Techlauncher’s four
              (4) cardinal programs:
              <ul>
                <li>Campus- To- The - World (CTTW) Program</li>
                <li>Pitch- To – Launch (PTL) Program</li>
                <li>Rebuild To Scale (RTS) Program</li>
                <li>Idea – To – Product (ITP) Program</li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              5. How does investors keep track of the startups they invested in
              and their investment?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Simple! Techlauncher provides individual investors with regular
              updates on tech-startups. We ensure that investors are not at any
              point starved of updates about the startup(s) they are linked to.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              6. What’s Techlauncher’s revenue model?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              We do our best to raise and support startups that are investment
              worthy, can generate revenue or that can be sold to other
              companies.
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
