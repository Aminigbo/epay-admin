import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  useMediaQuery,
  Container,
} from "@material-ui/core";
import images from "../images/image";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import Modals from "./Modals";

function Content() {
  const isActive = useMediaQuery("(max-width:959px)");

  const [show, setShow] = useState(false);
  const [head, setHead] = useState("");
  const [writeup, setWriteup] = useState("");

  //   const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Container>
        <div
          style={{
            height: 3,
            width: "20%",
            marginLeft: "40%",
            marginTop: "100px",
            marginBottom: "10px",
            backgroundColor: "#FF6256",
          }}
        />
        <Typography variant="h4" align="center">
          Our Services
        </Typography>
      </Container>
      <div style={{width:"100%", height:"auto"}}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <img
              src={images.rectangle}
              alt=""
              style={{ height: "auto", width: "95%", marginRight:"5%" }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: "auto", height: "auto" }}>
              <Typography variant="h4" style={{ paddingLeft: "30px" }}>
                Business Development
              </Typography>
              <Typography
                variant="body1"
                style={{ padding: "30px 20px 30px 30px" }}
              >
                It is one thing to have a tech product, it is another to convert
                your tech product into a commercially viable business.
                Techlauncher will help you through your business development
                journey. We ensure that we will help you put together everything
                that’s needed to make your business model work.
                <br />
                We cover areas like;
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  setHead("Business Development");
                  setWriteup(
                    <ul>
                      <li>Business model development</li>
                      <li>Business strategy</li>
                      <li>Business plan</li>
                      <li>Business profile</li>
                      <li>Customer acquisition/retention strategy</li>
                      <li>Branding</li>
                      <li>Growth strategy</li>
                      <li>Product management</li>
                      <li>Pre-launch planning</li>
                      <li>Digital marketing strategy</li>
                      <li>Partnership model/strategy</li>
                      <li>Pitch deck</li>
                      <li>Go-to-market strategy</li>
                    </ul>
                  );
                  setShow(true);
                }}
                style={{
                  backgroundColor: "#FF5B5E",
                  color: "#fff",
                  marginLeft: "30px",
                  marginBottom: "60px",
                }}
              >
                read more <ArrowRightAltIcon style={{ paddingLeft: "7px" }} />
              </Button>
            </div>
          </Grid>
        </Grid>
        <Grid direction={isActive ? "column-reverse" : "row"} container>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: "auto", height: "auto" }}>
              <Typography variant="h4" style={{ paddingLeft: "30px" }}>
                Legal Documentation
              </Typography>
              <Typography
                variant="body1"
                style={{ padding: "30px 20px 30px 30px" }}
              >
                For promising and daring tech start-ups, converting awesome
                ingenuity into a commercially viable business can be a very
                risky adventure.
                <br />
                There are legal traps and loopholes here and there.
                <br />
                Well, to help you come out strong and launch out with high
                confidence we will engage our legal team to help your startup develop and process the key legal documents
                that no startup should be without.
                <br />
                We cover areas like;
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  setHead("Legal Documentation");
                  setWriteup(
                    <ul>
                      <li>Incorporation agreement</li>
                      <li>Shareholder agreement</li>
                      <li>Employment agreement</li>
                      <li>Proprietary rights/IP agreement</li>
                      <li>Investor agreement</li>
                      <li>Partnership agreement</li>
                      <li>Policy/terms of use</li>
                      <li>Founder agreement</li>
                      <li>Independent contractor agreement</li>
                      <li>Internship/volunteer agreement</li>
                    </ul>
                  );
                  setShow(true);
                }}
                style={{
                  backgroundColor: "#FF5B5E",
                  color: "#fff",
                  marginLeft: "30px",
                  marginBottom: "60px",
                }}
              >
                read more <ArrowRightAltIcon style={{ paddingLeft: "7px" }} />
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <img
              src={images.rectangle2}
              alt=""
              style={{ height: "auto", width: "95%", marginLeft:"5%" }}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <img
              src={images.rectangle3}
              alt=""
              style={{ height: "auto", width: "95%", marginRight:"5%" }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: "auto", height: "auto" }}>
              <Typography variant="h4" style={{ paddingLeft: "30px" }}>
                Get Funding
              </Typography>
              <Typography
                variant="body1"
                style={{ padding: "30px 20px 30px 30px" }}
              >
                Startups without funding are like small boats in a big ocean.
                Funding increases your visibility and command the alteration of
                the market.
                <br />
                We acknowledge challenges tech Startups face in getting funding
                for their products.
                <br />
                Relax! we will match your business with a wide network of angel
                investors, VCs and other funding sources.
                <br />
                We raise funds for Startups at the;
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  setHead("Get Funding");
                  setWriteup(
                    <ul>
                      <li>Idea stage</li>
                      <li>MVP stage</li>
                      <li>Seed stage</li>
                      <li>Series A</li>
                    </ul>
                  );
                  setShow(true);
                }}
                style={{
                  backgroundColor: "#FF5B5E",
                  color: "#fff",
                  marginLeft: "30px",
                  marginBottom: "60px",
                }}
              >
                read more <ArrowRightAltIcon style={{ paddingLeft: "7px" }} />
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
      <Modals header={head} texts={writeup} opened={show} close={handleClose} />
    </>
  );
}

export default Content;
