import React, { useState } from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";
import Menu from "../components/Menu";
import images from "../images/images";


import { useHistory, useParams } from "react-router-dom";
import { supabase } from "../function/config/index"

function Description() {

  const history = useHistory();
  
  const [compState, setCompState] = useState("")
  let {eventId} = useParams()

  const fetch = () => {
      setCompState({
        ...compState, loading:true
      })
      supabase.from("event").select("*").eq("id", eventId).then(events => {
        setCompState({
          ...compState, event:events.body[0], loading:false
        })
      }).catch(error => {
        setCompState({
          ...compState, loading:false
        })
      })
  }
  

  const allCategories = () => {
    if (compState.event) {
      return compState.event.meta.tickets.map(tks => {
        return (
          <>
            <div
              style={{
                display: "flex",
                flexFlow: "row nowrap",
                width: "100%",
                height: "100px",
                backgroundColor: "#fff",
                borderBottom: "1px solid #ccc",
              }}
            >
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div style={{ paddingLeft: "20px" }}>
                  <Typography
                    variant="h5"
                    style={{ paddingBottom: "15px" }}
                  >
                    {tks.category}
                  </Typography>
                  <Typography variant="body1">₦{tks.cost}</Typography>
                </div>
              </div>
            </div>
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
    <div style={{ width: "100%", height: "100vh", backgroundColor: "#0d0c10" }}>

      {compState.loading == true && <div style={{ backgroundColor: "rgb(0,0,0,0.8)", position: "fixed", width: "100%", height: "100%", top: "0px", zIndex: "3000", paddingTop:"20%", textAlign:"center", color:"white" }}>
      Loading......
      </div>}


      <Box sx={{ display: "flex" }}>
        {console.log(compState)}
        <Menu />
        <Box
          component="main"
          style={{ flexGrow: 1, backgroundColor: "#e9f7f7", height: "auto" }}
        >
          <div
            style={{
              width: "100%",
              height: "100vh",
              backgroundColor: "#0d0c10",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "auto",
                backgroundColor: "#0d0c10",
              }}
            >
              <div style={{ width: "100%", height: "400px" }}>
                <img
                  src={compState.event ? `https://ogabike.com/reelwood/images/tickets/${compState.event.ticket_image}` : '---/---'}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <Container>
                <Typography
                  variant="h5"
                  style={{ color: "#fff", padding: "20px 0" }}
                >
                  {compState.event ? <span>{compState.event.event_title}</span>:"--/--"}
                </Typography>
              </Container>
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
                    Event Description
                  </Typography>
                </Container>
              </div>
              <Container>
                <Grid container spacing={5}>
                  <Grid item md={6} sm={12} xs={12}>
                    <Typography
                      variant="body1"
                      style={{
                        paddingTop: "40px",
                        color: "#fff",
                        paddingBottom: "30px",
                      }}
                    >
                      {/* {compState.event.meta.desc} */}
                       {compState.event ? <span>{compState.event.meta.desc}</span>:"--/--"}
                    </Typography>
                    <Typography
                      variant="h5"
                      style={{ color: "#fff", paddingBottom: "20px" }}
                    >
                      Date and Time
                    </Typography>
                    <div
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "flex",
                        flexFlow: "row wrap",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Typography
                          variant="h6"
                          style={{ color: "#fff", paddingBottom: "10px" }}
                        >
                          Start Date
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ color: "#ccc", paddingBottom: "20px" }}
                        >
                           {compState.event ? <span>{compState.event.meta.startDate}</span>:"--/--"}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          variant="h6"
                          style={{ color: "#fff", paddingBottom: "10px" }}
                        >
                          End Date
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ color: "#ccc", paddingBottom: "20px" }}
                        >
                          {compState.event ? <span>{compState.event.meta.endDate}</span>:"--/--"}
                        </Typography>
                      </div>
                    </div>
                    <Typography
                      variant="body1"
                      style={{ color: "#ccc", paddingBottom: "30px" }}
                    >
                      Time:  {compState.event ? <span>{compState.event.meta.startTime}</span>:"--/--"}
                    </Typography>
                    <Typography
                      variant="h6"
                      style={{ color: "#fff", paddingBottom: "10px" }}
                    >
                      Location
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{ color: "#ccc", paddingBottom: "20px" }}
                    >
                       {compState.event ? <span>{compState.event.meta.location}</span>:"--/--"}
                    </Typography>
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <div
                      style={{
                        width: "100%",
                        height: "auto",
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.4)",
                        padding: "20px 0",
                        margin: "40px 0",
                      }}
                    >
                      <Typography
                        variant="h4"
                        align="center"
                        style={{ color: "#124ac3", paddingBottom: "20px" }}
                      >
                        Tickets Available
                      </Typography>
                      


                      {allCategories()}
                      

                      



                    </div>
                  </Grid>
                </Grid>
              </Container>
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default Description;
