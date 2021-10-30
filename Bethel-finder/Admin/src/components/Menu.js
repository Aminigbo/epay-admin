import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LogoutIcon from "@mui/icons-material/Logout";
import images from "../images/images";
import { Link } from "react-router-dom";

const drawerWidth = 270;

export default function Menu() {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <div
        style={{
          width: "100%",
          height: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={images.logo} alt="" style={{ margin: "20px 0" }} />
      </div>
      <Divider />
      <List>
        <Link to="/" style={{textDecoration:"none", color:"#000000"}}>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link to="/user" style={{textDecoration:"none", color:"#000000"}}>
          <ListItem button>
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </Link>
        <Link to ="/event" style={{textDecoration:"none", color:"#000000"}}>
          <ListItem button>
            <ListItemIcon>
              <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary="Events" />
          </ListItem>
        </Link>
        <Link to="/ticket" style={{textDecoration:"none", color:"#000000"}}  >
          <ListItem button>
            <ListItemIcon>
              <LocalShippingIcon />
            </ListItemIcon>
            <ListItemText primary="Tickets" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <List style={{ width: "100%" }}>
          <ListItem button>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="LogOut" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}
