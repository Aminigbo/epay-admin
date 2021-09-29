import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";

function Section({ bgcolor, image, title, content }) {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={6}
      style={{ marginBottom: "50px" }}
    >
      <Paper elevation={0} style={{ backgroundColor: "#fff", height: "auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "60px",
            height: "60px",
            backgroundColor: bgcolor,
            padding: "10px",
            borderRadius: "50%",
            boxShadow: "0px 0px 10px #ccc",
          }}
        >
          <img src={image} alt="" height="100%" width="auto" />
        </div>
        <Typography
          variant="h5"
          noWrap
          style={{
            paddingLeft: "9px",
            marginTop: "20px",
            paddingRight: 0,
            // wordWrap: "break-word",
          }}
        >
          {title}
        </Typography>
        <div
          style={{
            width: "20%",
            height: "3px",
            backgroundColor: "#FF6256",
            marginLeft: "8px",
            marginTop: "15px",
          }}
        />
        <Typography
          variant="body1"
          style={{
            paddingLeft: "9px",
            marginTop: "30px",
            paddingRight: 0,
            wordWrap: "break-word",
          }}
        >
          {content}
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Section;
