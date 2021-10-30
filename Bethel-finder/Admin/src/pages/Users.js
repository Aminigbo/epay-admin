import React, { useState } from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container, Grid, Paper, TextField, Button } from "@mui/material";
import Menu from "../components/Menu";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useHistory } from "react-router-dom"
import {supabase} from "../function/config/index"

function Users() {

  const history = useHistory();
  const [compState, setCompState] = useState("")


  const fetch = () => {
      setCompState({
        ...compState, loading:true
      })
      supabase.from("users").select("*").then(users => {
        setCompState({
          ...compState, users:users.body, loading:false
        })
      }).catch(error => {
        setCompState({
          ...compState, loading:false
        })
      })
  }
  


  const users = () => {
    let array = [{}, {}, {}, {}] 

    if (compState.users) {
      return compState.users.map(users => {
        return (
          <>
            <tr style={{cursor:"pointer"}} onClick={() => history.push(`/profile/${users.id}`)}>
                <td>{users.id}</td>
                <td>{users.name}</td>
                <td>{users.email}</td>
                <td>{users.meta.phone}</td>
                <td>{users.meta.password}</td>
                <td>{users.wallet}</td>
                <td>-/-</td>
            </tr> 
          </>
        )
      })
    }
  }



  React.useEffect(() => {  
    window.scrollTo(0, 0);
    fetch()
  }, []);


  return (
    <>
    {compState.loading == true && <div style={{ backgroundColor: "rgb(0,0,0,0.8)", position: "fixed", width: "100%", height: "100%", top: "0px", zIndex: "3000", paddingTop:"20%", textAlign:"center", color:"white" }}>
      Loading......
    </div>}
    {console.log(compState)}
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
                  Users
                </Typography>
                <Typography
                  variant="body1"
                  style={{ color: "#888795", paddingTop: "10px" }}
                >
                  Information about your users.
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
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={7}
                  style={{ display: "flex", justifyContent: "flex-Start" }}
                >
                  <Button
                    variant="text"
                    style={{ color: "#000" }}
                  >
                    All Registered Users
                  </Button> 
                </Grid>
                <Grid item xs={5}>
                  {/* <TextField
                    variant="filled"
                    label="Search"
                    style={{ width: "90%", borderRadius: "10px" }}
                  /> */}
                </Grid>
              </Grid>
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
                  {/*  */}
                  {users()}
                </table>
              </div>
            </div>
          </Container>
        </Box>
      </Box>
      </div>
      
      </>
  );
}

export default Users;
