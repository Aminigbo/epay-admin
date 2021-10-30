import React, { useState } from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";
import Menu from "../components/Menu";


import { useHistory, useParams } from "react-router-dom";
import {supabase} from "../function/config/index"


function Profile() {

  const history = useHistory();
  const [compState, setCompState] = useState("")
  let {userId} = useParams()

  const fetch = () => {
      setCompState({
        ...compState, loading:true
      })
      supabase.from("users").select("*").eq("id", userId).then(users => {
        setCompState({
          ...compState, users:users.body[0], loading:false
        })
      }).catch(error => {
        setCompState({
          ...compState, loading:false
        })
      })
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

      {compState.users ? 
        <>
           <div style={{ width: "100%", height: "100vh", backgroundColor: "#0d0c10" }}>
      <Box sx={{ display: "flex" }}>
          <Menu />
          {console.log(compState)}
        <Box
          component="main"
          style={{ flexGrow: 1, backgroundColor: "#e9f7f7", height: "auto" }}
        >
          <div
            style={{
              width: "100%",
              height: "auto",
              backgroundColor: "#0d0c10",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "auto",
                backgroundColor: "#1f1d23",
              }}
            >
              <Container>
                <Typography
                  style={{ padding: "20px 0", color: "#fff" }}
                  variant="h5"
                >
                  User Profile
                </Typography>
              </Container>
            </div>
            <Container>
              <Grid container>
                <Grid item md={12} sm={12} xs={12}>
                  <div
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "flex",
                      flexFlow: "row wrap",
                      justifyContent: "space-between",
                      margin:"20px 0"
                    }}
                  >
                    <div>
                      <Typography
                        variant="h6"
                        style={{ color: "#fff", paddingBottom: "10px" }}
                      >
                        Name
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ color: "#ccc", paddingBottom: "20px" }}
                      >
                       {compState.users.name}
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        variant="h6"
                        style={{ color: "#fff", paddingBottom: "10px" }}
                      >
                        Phone Number
                      </Typography>
                      <Typography
                        variant="body1"
                        align="right"
                        style={{ color: "#ccc", paddingBottom: "20px" }}
                      >
                        {compState.users.meta.phone}
                      </Typography>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "flex",
                      flexFlow: "row wrap",
                      justifyContent: "space-between",
                      margin:"20px 0"
                    }}
                  >
                    <div>
                      <Typography
                        variant="h6"
                        style={{ color: "#fff", paddingBottom: "10px" }}
                      >
                        Email
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ color: "#ccc", paddingBottom: "20px" }}
                      >
                        {compState.users.email}
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        variant="h6"
                        style={{ color: "#fff", paddingBottom: "10px" }}
                      >
                        NO. of ticket created
                      </Typography>
                      <Typography
                        variant="body1"
                        align="right"
                        style={{ color: "#ccc", paddingBottom: "20px" }}
                      >
                       30 
                      </Typography>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "flex",
                      flexFlow: "row wrap",
                      justifyContent: "space-between",
                      margin:"20px 0"
                    }}
                  >
                    <div>
                      <Typography
                        variant="h6"
                        style={{ color: "#fff", paddingBottom: "10px" }}
                      >
                        NO. of ticket sold
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ color: "#ccc", paddingBottom: "20px" }}
                      >
                        300
                      </Typography>
                    </div>
                    {/* <div>
                      <Typography
                        variant="h6"
                        style={{ color: "#fff", paddingBottom: "10px" }}
                      >
                        Phone Number
                      </Typography>
                      <Typography
                        variant="body1"
                        align="right"
                        style={{ color: "#ccc", paddingBottom: "20px" }}
                      >
                        07041528380
                      </Typography>
                    </div> */}
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
        </Box>
      </Box>
      </div>
      
        </>
        :
      ''
      }
      
      
      </>
  );
}

export default Profile;
