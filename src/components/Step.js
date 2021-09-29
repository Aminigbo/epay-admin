import {
  Grid,
  Paper,
  useMediaQuery,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

function Step({ image, color, title, text, size }) {
  const isActive = useMediaQuery("(max-width:959px)");

  const useStyles = makeStyles((theme) => ({
    space: {
      marginBottom: "20px",
    },
  }));

  const classes = useStyles();

  return (
    <Grid item md={4} sm={size} xs={12}>
      <Paper
        elevation={6}
        style={{
          background: "#fff",
          height: "auto",
          width: "100%",
        }}
        className={isActive ? classes.space : null}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "auto",
            padding: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50px",
              width: "50px",
              borderRadius: "10px",
              background: color,
            }}
          >
            <img src={image} alt="" />
          </div>
          <Typography
            variant="h6"
            noWrap={true}
            style={{ paddingLeft: 15, fontWeight: 400 }}
          >
            {title}
          </Typography>
        </div>
        <div
          style={{
            width: "red",
            height: "auto",
            padding: "0 0 10px 0",
            display: "flex",
          }}
        >
          <div style={{ width: "100%" }}>
            <Typography
              variant="body2"
              style={{ paddingLeft: 15, paddingRight: 15, fontWeight: 400 }}
            >
              {text}
            </Typography>
          </div>
        </div>
      </Paper>
    </Grid>
  );
}

export default Step;
