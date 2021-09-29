import { Paper, Typography, useMediaQuery } from '@material-ui/core'
import React from 'react'

function WorkSection({header, content, value, children}) {
    const isActive = useMediaQuery("(max-width:959px)")
    return (
      <>
        <Paper
          elevation={3}
          style={{ padding: "10px 15px", position: "relative", height:isActive ? "auto" : "280px", display:"flex", justifyContent:"center", alignItems:"center" }}
        >
          <div
            style={{
              position: "absolute",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              backgroundColor: "#fff",
              top: "-15px",
              left:"47%",
              border: "1px solid #FF6256",
              display:"flex",
              justifyContent:"center",
              alignItems:"center"
            }}
          >
              <Typography variant="body1" >{value}</Typography>
          </div>
          <div>
            <Typography variant="h5" align="center" style={{ paddingTop: isActive ? "30px" : null }}>
              {header}
            </Typography>
            <Typography variant="body1" component="div" align="center" style={{ paddingTop: 10 }}>
              {content}
              {children}
            </Typography>
          </div>
        </Paper>
      </>
    );
}

export default WorkSection
