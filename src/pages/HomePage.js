import {
  Grid,
  makeStyles,
  Typography,
  Button,
  Container,
  Paper,
  IconButton,
  useMediaQuery,
} from "@material-ui/core";
import React from "react";
import Step from "../components/Step";
import images from "../images/image";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import Section from "../components/Section";
import Content from "../components/Content";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import Programmes from "../components/Programmes";
import Partners from "../components/Partners";
import ReactPlayer from "react-player";

function HomePage() {
  const isActive = useMediaQuery("(max-width:959px)");

  const useStyles = makeStyles({
    hdCont: {
      width: "100%",
      height: "auto",
      backgroundColor: "#fff",
    },
    hdText: {
      display: "flex",
      alignItems: "center",
      paddingLeft: "3%",
    },
    space: {
      marginBottom: "20px",
    },
    investor: {
      width: "100%",
      height: "80vh",
      backgroundColor: "#FF5B5E",
      marginBottom: "150px",
    },
    banner: {
      width: "100%",
      height: isActive ? "auto" : "90vh",
      backgroundImage: `url(${images.landingImg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      padding: isActive ? "70px 0" : null,
    },
  });

  const classes = useStyles();

  return (
    <>
      <div
        style={{ width: "100%", height: "70px", backgroundColor: "#FF5B5E" }}
      >
        <Container style={{ height: "100%" }}>
          <Grid container style={{ height: "100%" }}>
            <Grid item container xs={4} md={6}>
              <div
                style={{
                  width: isActive ? "100%" : "40%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <PhoneIcon style={{ color: "#fff" }} />
                <Typography
                  noWrap
                  variant="body1"
                  style={{ color: "#fff", paddingLeft: "15px" }}
                >
                  +2349137423273
                </Typography>
              </div>
              <div
                style={{
                  width: "60%",
                  height: "100%",
                  display: isActive ? "none" : "flex",
                  alignItems: "center",
                }}
              >
                <MailIcon style={{ color: "#fff" }} />
                <Typography
                  noWrap
                  variant="body1"
                  style={{ color: "#fff", paddingLeft: "15px" }}
                >
                  startup@techlauncher.io
                </Typography>
              </div>
            </Grid>
            <Grid
              item
              md={6}
              xs={8}
              style={{
                display: "flex",
                justifyContent: isActive ? "flex-end" : null,
              }}
            >
              <div
                style={{
                  display: isActive ? "none" : "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  height: "100%",
                  width: "50%",
                }}
              >
                <IconButton>
                  <FacebookIcon style={{ color: "#fff" }} />
                </IconButton>
                <IconButton>
                  <TwitterIcon style={{ color: "#fff" }} />
                </IconButton>
                <IconButton>
                  <InstagramIcon style={{ color: "#fff" }} />
                </IconButton>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  height: "100%",
                  width: isActive ? "100%" : "50%",
                }}
              >
                <Link to="/apply" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    style={{
                      display: "flex",
                      color: "#FF5B5E",
                      backgroundColor: "#fff",
                    }}
                  >
                    get started{" "}
                    <ArrowRightAltIcon style={{ paddingLeft: "10px" }} />
                  </Button>
                </Link>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
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
          <Header color="black" menu="#FF5B5E" />
        </Grid>
      </Grid>
      <div className={classes.banner}>
        <Container>
          <Grid container>
            <Grid
              item
              container
              xs={12}
              md={6}
              style={{
                display: "flex",
                alignItems: "center",
                height: isActive ? "auto" : "90vh",
              }}
            >
              <div style={{ height: "auto" }}>
                <Typography variant="h3" style={{ color: "#fff" }}>
                  Business Development and Funding For Tech Start-Ups
                </Typography>
                <Typography
                  variant="body1"
                  style={{
                    color: "#fff",
                    paddingTop: "30px",
                    paddingBottom: 30,
                  }}
                >
                  We can imagine how much you want to see your tech product
                  succeed. That’s why we are coming through for you.
                </Typography>
                <Link to="/apply" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    style={{
                      display: "flex",
                      color: "#fff",
                      backgroundColor: "#FF5B5E",
                    }}
                  >
                    get started{" "}
                    <ArrowRightAltIcon style={{ paddingLeft: "10px" }} />
                  </Button>
                </Link>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Container style={{ marginTop: "70px" }}>
        <Grid container gutter="false" spacing={4}>
          <Step
            duration={1000}
            image={images.business}
            color="#ff566185"
            title="Business Development"
            text="Your product will crash if you launch without putting certain things in place that will make your busy model work. Your product is as good as the end user says it is."
            size={6}
          />
          <Step
            duration={1500}
            image={images.legal}
            color="#ff615682"
            title="Legal Documentation"
            text="We understand the challenge that Tech-startups face while trying to tidy up their legal documents. We are here to help you."
            size={6}
          />
          <Step
            duration={2000}
            image={images.coins}
            color="#ff566172"
            title="Getting Funding"
            text="It’s a pity, some beautiful ideas never made it through because of lack of funding. That will never happen again with Techlauncher."
            size={12}
          />
        </Grid>
      </Container>
      <Container style={{ marginTop: "100px", marginBottom: "100px" }}>
        <Grid container spacing={5}>
          <Grid container item xs={12} md={5}>
            <Paper
              elevation={0}
              square
              style={{ padding: "10px 0px 10px 10px" }}
            >
              <div
                style={{
                  width: "15%",
                  height: "3px",
                  backgroundColor: "#FF6256",
                }}
              />
              <Typography variant="h4" style={{ paddingTop: "30px" }}>
                4 Steps to make your Dream Come True
              </Typography>
              <Typography variant="body1" style={{ paddingTop: "20px" }}>
                We know how exciting and fulfilling it will be for you to see
                your product become a success.
                <br />
                Techlauncher is here to bring your dream to reality in 4
                interesting steps.
              </Typography>
              <Link to="/offer" style={{textDecoration:"none"}}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#FF5B5E",
                    color: "#fff",
                    marginTop: "30px",
                    marginBottom: "80px",
                  }}
                >
                  see What we offer
                  <ArrowRightAltIcon style={{ paddingLeft: "7px" }} />
                </Button>
              </Link>
            </Paper>
          </Grid>
          <Grid item container spacing={5} xs={12} md={7}>
            <Section
              duration={1000}
              bgcolor="#FF5F59"
              image={images.cash}
              title="We Listen"
              content="First, you tell us what your start up is all about. You tell us the value proposition of your product. We listen to you to understand what you have, why you built it and who you built it for."
            />
            <Section
              duration={1500}
              bgcolor="#6CC9C8"
              image={images.order}
              title="We Get You Ready"
              content="Then we go ahead to arrange the business part of the product, tidy up legal document. Making sure we help you get everything an investor will be looking out for in a tech startup before he/she can invest."
            />
            <Section
              duration={2000}
              bgcolor="#B988F8"
              image={images.investor}
              title="We Bring Your Investor"
              content="This is the point where we start talking with investors in our pool and connect them with you because we are confident that you can have a handshake with them."
            />
            <Section
              duration={2500}
              bgcolor="#FF9654"
              image={images.dream}
              title="Your Dream Comes True"
              content="Now, you can actually launch or scale up your product with a big smile. It’s a promise we made. We keep to our word. We are Techlauncher"
            />
          </Grid>
        </Grid>
      </Container>
      <Content />
      <Programmes />
      <Partners />
      <div
        style={{
          width: "100%",
          padding: "40px 0",
          height: "auto",
          backgroundColor: "#FF5B5E",
        }}
      >
        <Container style={{ height: "100%" }}>
          <Typography
            variant="h4"
            align="center"
            style={{ paddingBottom: "20px", color: "#fff" }}
          >
            Become An Investor
          </Typography>
          <Typography variant="body1" align="center" style={{ color: "#fff" }}>
            Join the league of other individuals across the world investing in
            the tech ecosystem and enjoying huge returns.
            <br />
            There are lots of tech startups with well-defined market, great
            business potentials, sellable value proposition and with high
            probability of huge ROI.
            <br />
            We’ve painstakingly helped them develop a unique business model,
            mapped out strategies (marketing, sales, customer acquisition,
            growth and disruption, retention etc), trained the founders on
            various areas such as business leadership and done a proper risk
            analysis for the product.
          </Typography>
          <div
            style={{
              width: "100%",
              height: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
              marginBottom: "30px",
            }}
          >
            <Link to="/investor" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                style={{ color: "#FF5B5E", backgroundColor: "#fff" }}
              >
                Apply Now
              </Button>
            </Link>
          </div>
        </Container>
      </div>
      <div
        style={{ width: "100%", height: "auto", backgroundColor: "#f7f7f7" }}
      >
        <Container>
          <Grid container style={{ padding: "70px 0 60px 0" }} spacing={7}>
            <Grid item md={6} sm={12} xs={12}>
              <ReactPlayer
                url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                width="100%"
                height="300px"
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <div
                style={{
                  width: "25%",
                  height: "3px",
                  backgroundColor: "#FF6256",
                  marginBottom: "20px",
                }}
              />
              <Typography variant="h4" style={{ paddingBottom: "20px" }}>
                Watch Some Video
              </Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit Vitae
                senectus lacinia lorem aliquet quis ante cras turpis Vitae
                senectus lacinia lorem aliquet quis ante cras turpis.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default HomePage;
