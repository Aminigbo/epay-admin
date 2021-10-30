import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container, Grid, Paper, TextField, Button } from "@mui/material";
import Menu from "../components/Menu";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import { makeStyles } from "@mui/styles";

function Ticket() {
  return (
    <div style={{ width:"100%", height:"100vh", backgroundColor:"#e9f7f7" }}>
      <Box sx={{ display: "flex" }}>
        <Menu />
        <Box
          component="main"
          style={{ flexGrow: 1, backgroundColor: "#e9f7f7", height: "auto" }}
        >
          <Container>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="h4" style={{ paddingTop: "20px" }}>
                  Tickets
                </Typography>
                <Typography
                  variant="body1"
                  style={{ color: "#888795", paddingTop: "10px" }}
                >
                  Information about tickets to be sold and is already sold.
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Paper
                  elevation={3}
                  style={{
                    padding: "15px 10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CalendarTodayIcon
                    style={{ fontSize: "30px", color: "08086b" }}
                  />
                  <Typography
                    variant="body1"
                    style={{ color: "#8887a6", paddingLeft: "7px" }}
                  >
                    Thursday 16th may 2011
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            <div
              style={{
                width: "100%",
                height: "auto",
                backgroundColor: "#fff",
                borderRadius: "10px",
                marginTop: "50px",
                boxShadow: "1px 1px 3px rgba(0,0,0,0.4)",
                overflowX: "auto",
                paddingTop: "10px",
                marginBottom: "30px",
              }}
            >
              
              <div style={{ width: "100%", height: "auto", marginTop: "10px" }}>
                <table>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Pickup Address</th>
                    <th>Dropoff Address</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Maria Anders</td>
                    <td>Rivers State University, Port-Harcourt, Nigeria</td>
                    <td>Woji, Port-Harcourt, Nigeria</td>
                    <td>21:54:29</td>
                    <td>Pending</td>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Maria Anders</td>
                    <td>Rivers State University, Port-Harcourt, Nigeria</td>
                    <td>Woji, Port-Harcourt, Nigeria</td>
                    <td>21:54:29</td>
                    <td>Pending</td>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Maria Anders</td>
                    <td>Rivers State University, Port-Harcourt, Nigeria</td>
                    <td>Woji, Port-Harcourt, Nigeria</td>
                    <td>21:54:29</td>
                    <td>Pending</td>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Maria Anders</td>
                    <td>Rivers State University, Port-Harcourt, Nigeria</td>
                    <td>Woji, Port-Harcourt, Nigeria</td>
                    <td>21:54:29</td>
                    <td>Pending</td>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Maria Anders</td>
                    <td>Rivers State University, Port-Harcourt, Nigeria</td>
                    <td>Woji, Port-Harcourt, Nigeria</td>
                    <td>21:54:29</td>
                    <td>Pending</td>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Maria Anders</td>
                    <td>Rivers State University, Port-Harcourt, Nigeria</td>
                    <td>Woji, Port-Harcourt, Nigeria</td>
                    <td>21:54:29</td>
                    <td>Pending</td>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Maria Anders</td>
                    <td>Rivers State University, Port-Harcourt, Nigeria</td>
                    <td>Woji, Port-Harcourt, Nigeria</td>
                    <td>21:54:29</td>
                    <td>Pending</td>
                    <td>Action</td>
                  </tr>
                </table>
              </div>
            </div>
          </Container>
        </Box>
      </Box>
    </div>
  );
}

export default Ticket;
