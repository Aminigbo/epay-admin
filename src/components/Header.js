import {
  Divider,
  Grid,
  IconButton,
  ListItemText,
  ListItem,
  List,
  SwipeableDrawer,
  useMediaQuery,
} from "@material-ui/core";
import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import images from "../images/image";
import { Link, useHistory } from "react-router-dom";

function Header({ color, menu }) {
  const isActive = useMediaQuery("(max-width:959px)");

  const [open, setOpen] = useState(false);

  const history = useHistory();

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <>
      <Grid
        container
        item
        xs={9}
        sm={6}
        md={6}
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingLeft: "4%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "10px 30px 10px 10px",
            justifyContent: "center",
            alignItems: "center",
            height: isActive ? "60%" : "70%",
            backgroundColor: "#fff",
            borderRadius: "20px",
            cursor: "pointer",
          }}
          onClick={() => history.push("/")}
        >
          <img src={images.logo} alt="" height="100%" width="auto" />
        </div>
      </Grid>
      <Grid
        item
        sm={6}
        md={6}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ul
          style={{
            width: "100%",
            display: isActive ? "none" : "flex",
            justifyContent: isActive ? "flex-end" : "space-around",
            alignItems: "center",
            listStyle: "none",
          }}
        >
          <Link style={{ color: color, textDecoration: "none" }} to="/">
            <li style={{ cursor: "pointer" }}>Home</li>
          </Link>
          <Link style={{ color: color, textDecoration: "none" }} to="/offer">
            <li style={{ cursor: "pointer" }}>Our Offers</li>
          </Link>
          <Link style={{ color: color, textDecoration: "none" }} to="/contact">
            <li style={{ cursor: "pointer" }}>Contact Us</li>
          </Link>
          <Link style={{ color: color, textDecoration: "none" }} to="/investor">
            <li style={{ cursor: "pointer" }}>Become an Investor</li>
          </Link>
        </ul>
        <div
          style={{
            width: "100%",
            display: isActive ? "flex" : "none",
            justifyContent: isActive ? "flex-end" : "space-around",
            alignItems: "center",
            color: "#fff",
            // paddingRight: "0px",
          }}
        >
          <IconButton
            onClick={() => setOpen(true)}
            style={{ display: "block" }}
          >
            <MenuIcon style={{ color: menu, fontSize: "35px" }} />
          </IconButton>
        </div>
        <div>
          <SwipeableDrawer
            anchor="left"
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
          >
            <div>
              <div
                style={{
                  padding: "10px 30px 10px 20px",
                  height: isActive ? "40%" : "60%",
                  backgroundColor: "#fff",
                  borderRadius: "20px",
                }}
                onClick={() => {
                  setOpen(false);
                  history.push("/");
                }}
              >
                <img src={images.logo} alt="" height="40px" width="auto" />
              </div>
            </div>
            <Divider />
            <List>
              <ListItem
                button
                onClick={() => {
                  setOpen(false);
                  history.push("/");
                }}
                style={{ color: "#FF6256" }}
              >
                <ListItemText primary={"Home"} />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  setOpen(false);
                  history.push("/offer");
                }}
                style={{ color: "#FF6256" }}
              >
                <ListItemText primary={"Our Offer"} />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  setOpen(false);
                  history.push("/contact");
                }}
                style={{ color: "#FF6256" }}
              >
                <ListItemText primary={"Contact Us"} />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  setOpen(false);
                  history.push("/investor");
                }}
                style={{ color: "#FF6256" }}
              >
                <ListItemText primary={"Become an Investor"} />
              </ListItem>
            </List>
          </SwipeableDrawer>
        </div>
      </Grid>
    </>
  );
}

export default Header;
