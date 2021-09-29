import React, { useState } from "react";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import WorkSection from "./WorkSection";
import images from "../images/image";
import ProgramModal from "./ProgramModal";

function Programmes() {
  const [open, setOpen] = useState(false);
  const [program, setProgram] = useState("");


  const first = () => {
    setOpen(true);
    setProgram("Campus- To- The - World (CTTW) Program")
  }

  const second = () => {
    setOpen(true);
    setProgram("Pitch- To – Launch (PTL) Program")
  }

  const third = () => {
    setOpen(true);
    setProgram("Rebuild To Scale (RTS) Program")
  }


  const fourth = () => {
    setOpen(true);
    setProgram("Idea – To – Product (ITP) Program")
  }

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#f7f7f7",
        padding: "70px 0 70px 0",
        margin: "100px 0",
      }}
    >
      <Container>
        <div
          style={{
            height: 3,
            width: "20%",
            marginLeft: "40%",
            marginBottom: "10px",
            backgroundColor: "#FF6256",
          }}
        />
        <Typography
          variant="h4"
          align="center"
          style={{ paddingBottom: "50px" }}
        >
          Our Programmes
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <WorkSection
              value={1}
              img={images.business}
              header="Campus- To- The - World (CTTW) Program"
            >
              We believe so much in the potentials that lies within our young
              populations in various campuses. We also acknowledge the
              challenges they face while trying to build, launch and scale their
              tech products. So, the CTTW program is designed to help students
              in various campuses successfully launch out their tech startups.
              <div
                style={{
                  width: "100%",
                  height: "auto",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  style={{
                    color: "#fff",
                    backgroundColor: "#FF6256",
                    marginTop: "20px",
                  }}
                  onClick={first}
                >
                  Apply
                </Button>
              </div>
            </WorkSection>
          </Grid>
          <Grid item xs={12} md={6}>
            <WorkSection
              value={2}
              img={images.business}
              header="Pitch- To – Launch (PTL) Program"
            >
              Your MVP is set and you are looking for angel investors, VCs to
              invest in your product, or you are looking to set up a good board
              of advisors that will be made up of exposed and reputable
              professionals. Our PTL program provides startups with the
              opportunity to pitch their MVPs to a pool of investors, industry
              professionals, mentors etc.
              <div
                style={{
                  width: "100%",
                  height: "auto",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  style={{
                    color: "#fff",
                    backgroundColor: "#FF6256",
                    marginTop: "20px",
                  }}
                  onClick={second}
                >
                  Apply
                </Button>
              </div>
            </WorkSection>
          </Grid>
          <Grid item xs={12} md={6}>
            <WorkSection
              value={3}
              img={images.business}
              header="Rebuild To Scale (RTS) Program"
            >
              You built and launched your startup before, but it crashed or it
              isn’t performing well in the market. Our RTS program helps you
              reposition, retool, rebrand and re-strategize to launch out again,
              but better. The program also ensures that you can get reasonable
              equity funding for your product.
              <div
                style={{
                  width: "100%",
                  height: "auto",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  style={{
                    color: "#fff",
                    backgroundColor: "#FF6256",
                    marginTop: "20px",
                  }}
                  onClick={third}
                >
                  Apply
                </Button>
              </div>
            </WorkSection>
          </Grid>
          <Grid item xs={12} md={6}>
            <WorkSection
              value={4}
              img={images.business}
              header="Idea – To – Product (ITP) Program"
            >
              In our ITP program, we help first timers validate their ideas, get
              co-founders (if need be), develop top-notch and realistic business
              strategy documents, pitch decks and financial models from scratch
              and specifically tailored to your product. It is one thing to have
              an idea and it is another thing to turn the idea into a
              commercially viable product.
              <div
                style={{
                  width: "100%",
                  height: "auto",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  style={{
                    color: "#fff",
                    backgroundColor: "#FF6256",
                    marginTop: "20px",
                  }}
                  onClick={fourth}
                >
                  Apply
                </Button>
              </div>
            </WorkSection>
          </Grid>
        </Grid>
      </Container>
      <ProgramModal open={open} close={setOpen} program={program} />
    </div>
  );
}

export default Programmes;
