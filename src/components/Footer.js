import {
  Container,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import images from "../images/image";
import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";

function Footer() {
  const isActive = useMediaQuery("(max-width:959px)");

  const useStyles = makeStyles({
    footContainer: {
      width: "100%",
      height: "auto",
      backgroundColor: "#FF5F59",
      marginTop: "50px",
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.footContainer}>
      <Container>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} style={{ paddingBottom: "40px" }}>
            <Link to="/">
              <div
                style={{
                  padding: "5px 30px 5px 15px",
                  height: "50px",
                  width: "200px",
                  backgroundColor: "#fff",
                  borderRadius: "20px",
                  marginTop: "20px",
                  cursor: "pointer",
                }}
              >
                <img src={images.logo} alt="" height="100%" width="auto" />
              </div>
            </Link>
          </Grid>
          <Grid item xs={12} md={3} style={{ marginBottom: isActive ? 30 : 0 }}>
            <Typography variant="body1" style={{ color: "#fff" }}>
              Techlauncher, a product of Harvoxx Tech Hub, prides herself as the
              platform where successful startups emerge. We are focused on
              ensuring that we help tech startups launch their products
              successfully and grow exponentially.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            style={{
              paddingLeft: isActive ? 0 : "10%",
              marginBottom: isActive ? 30 : 0,
            }}
          >
            <Typography
              variant="h5"
              style={{ color: "#fff", paddingBottom: "20px" }}
            >
              Quick Links
            </Typography>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="body1"
                style={{
                  color: "#fff",
                  paddingBottom: "10px",
                  cursor: "pointer",
                }}
              >
                Home
              </Typography>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/offer">
              <Typography
                variant="body1"
                style={{
                  color: "#fff",
                  paddingBottom: "10px",
                  cursor: "pointer",
                }}
              >
                Our Offers
              </Typography>
            </Link>
            <Link to="/contact" style={{ textDecoration: "none" }}>
              <Typography
                variant="body1"
                style={{
                  color: "#fff",
                  paddingBottom: "10px",
                  cursor: "pointer",
                }}
              >
                Contact Us
              </Typography>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/investor">
              <Typography
                variant="body1"
                style={{
                  color: "#fff",
                  paddingBottom: "10px",
                  cursor: "pointer",
                }}
              >
                Become an Investor
              </Typography>
            </Link>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            style={{
              paddingLeft: isActive ? 0 : "9%",
              marginBottom: isActive ? 20 : 0,
            }}
          >
            <Typography
              variant="h5"
              style={{ color: "#fff", paddingBottom: "20px" }}
            >
              Visit
            </Typography>
            <Typography
              variant="body1"
              style={{ color: "#fff", paddingBottom: "10px" }}
            >
              Elzazi complex, opposite Westharm petrol station along
              gbalajam/akpajo road, woji
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            style={{
              paddingLeft: isActive ? 0 : "9%",
              marginBottom: isActive ? 30 : 0,
            }}
          >
            <Typography
              variant="h5"
              style={{ color: "#fff", paddingBottom: "20px" }}
            >
              Legals
            </Typography>
            <Typography
              variant="body1"
              style={{ color: "#fff", paddingBottom: "10px" }}
            >
              Terms and Conditions
            </Typography>
            <Typography
              variant="body1"
              style={{ color: "#fff", paddingBottom: "10px" }}
            >
              Privacy Policy
            </Typography>
          </Grid>
          <Grid item container xs={12} md={12}>
            <Grid
              item
              xs={12}
              sm={6}
              md={8}
              style={{ padding: "30px 0", color: "#fff" }}
            >
              <Typography variant="body1">
                Copyright © 2021 Techlauncher.io. A Product of Harvoxx Tech Hub. All
                rights reserved
              </Typography>
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
              sm={6}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
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
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Footer;
