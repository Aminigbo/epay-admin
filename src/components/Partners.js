import React from "react";
import { Container, Typography } from "@material-ui/core";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import images from "../images/image";

function Partners() {
  return (
    <Container style={{paddingBottom:"40px"}}>
      <div
        style={{
          height: 3,
          width: "20%",
          marginLeft: "40%",
          marginBottom: "10px",
          backgroundColor: "#FF6256",
        }}
      />
      <Typography variant="h4" align="center" style={{paddingBottom:"60px"}}>
        Our Partners
      </Typography>
      <OwlCarousel
        className="owl-theme"
        loop
        margin={30}
        dots
        autoplay
        autoplayTimeout={2000}
        autoplayHoverPause
        responsive={{
          0: {
            items: 2,
          },
          600: {
            items: 3,
          },
          800: {
            items: 4,
          },
          1000: {
            items: 5,
          },
        }}
      >
        <div
          className="item"
          style={{
            height: "130px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={images.partner1}
            alt=""
            style={{ height: "90%", width: "100%", objectFit: "contain" }}
          />
        </div>
        <div
          className="item"
          style={{
            height: "130px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom:"20px"
          }}
        >
          <img
            src={images.partner2}
            alt=""
            style={{ height: "90%", width: "100%", objectFit: "contain" }}
          />
        </div>
        <div
          className="item"
          style={{
            height: "130px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={images.partner3}
            alt=""
            style={{ height: "90%", width: "100%", objectFit: "contain" }}
          />
        </div>
        <div
          className="item"
          style={{
            height: "130px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={images.partner4}
            alt=""
            style={{ height: "90%", width: "100%", objectFit: "contain" }}
          />
        </div>
        <div
          className="item"
          style={{
            height: "130px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={images.partner5}
            alt=""
            style={{ height: "90%", width: "100%", objectFit: "contain" }}
          />
        </div>
        <div
          className="item"
          style={{
            height: "130px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={images.partner6}
            alt=""
            style={{ height: "90%", width: "100%", objectFit: "contain" }}
          />
        </div>
        <div
          className="item"
          style={{
            height: "130px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={images.partner7}
            alt=""
            style={{ height: "90%", width: "100%", objectFit: "contain" }}
          />
        </div>
      </OwlCarousel>
    </Container>
  );
}

export default Partners;
