import {
  Container,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import React from "react";
import Content from "../components/Content";
import Header from "../components/Header";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Programmes from "../components/Programmes";

function About() {
  const isActive = useMediaQuery("(max-width:959px)");

  const useStyles = makeStyles({
    hdCont: {
      width: "100%",
      height: "auto",
      backgroundColor: "#FF5B5E",
    },
    root: {
      width: "100%",
    },
    heading: {
      fontSize: 18,
      fontWeight: 400,
      color:"#FF5B5E"
    },
  });

  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.hdCont}>
        <Grid
          item
          container
          xs={12}
          style={{
            backgroundColor: "Transparent",
            height: "100px",
          }}
        >
          <Header color="#fff" menu="#fff" />
        </Grid>
      </Grid>
      <Content />
      <Programmes />
      <Container style={{ paddingBottom: "100px" }}>
        <div
          style={{
            height: 3,
            width: "20%",
            marginLeft: "40%",
            marginTop: "100px",
            backgroundColor: "#FF6256",
          }}
        />
        <Typography
          variant={isActive ? "h4" : "h3"}
          align="center"
          style={{ padding: "30px 0 50px 0" }}
        >
          Frequently Asked Questions
        </Typography>
        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              1. What is techlauncher?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Techlauncher is a platform designed to help startups launch and
              scale the products they’ve built. We make the journey a lot easier
              and more interesting by helping you with the business development,
              legal documentation and more importantly help you raise funds. In
              addition, techlauncher provides mentorships and hosts programs
              geared towards helping tech startups drive towards the path of
              sustainability.
              <br />
              Techlauncher prides herself as the platform where successful
              techstartups emerge.
              <br />
              Our vision is to see 100 startups emerge an dominate from this
              region in the next 3 years.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              2. How is techlauncher different from other incubators and
              accelerators worldwide?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              We are very unique and that’s because:
              <ul>
                <li>
                  We crafted our programs and services to suit the environment
                  where we operate.
                </li>
                <li>
                  We relate one-on-one with the tech startups and their teams.
                </li>
                <li>We are more of a hands-on incubator and accelerator.</li>
                <li>
                  We prepare and link up our tech startups with opportunities
                  available in reputable incubator and accelerator companies. In
                  other words, we leverage on collaboration to give tech
                  startups down here the very best.
                </li>
                <li>
                  We structured our fundraising processes and requirements to be
                  easy and rewarding.
                </li>
                <li>
                  We have a pool of angel investors whose interest are basically
                  in tech alone.{" "}
                </li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              3. How much do you charge usually for your services?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Tech-Startups that signs with us or enroll in any of our four
              programs don’t have to pay for anything. However, Techlauncher
              takes 3% equity of the company and 5% of the money raised by
              techlauncher for the startup.
              <br />
              The 5% covers all the services techlauncher will be providing the
              tech startup.
              <br />
              Tech startups that will just signup for our business development
              and legal documentation services will have to pay between $120 -
              $200
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              4. What are the key criteria Techlauncher looks out for in a tech
              startup?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ paddingLeft: "20px" }}>
              a. Tech startups with a good team composition.
              <br />
              b. Tech startups in Port Harcourt.
              <br />
              c. Tech startups with innovative ideas that have good potential.
              <br />
              d. We prefer startups who have been able to invest some of their
              own funds into their product asides their sweat equity.
              <br />
              e. Tech startups with clear value proposition.
              <br />
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              5. Do you look for any specific industry?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              We accept tech startups from every industry. Our well-structured
              programs and services serve a wide range of startups’ needs in
              different sectors.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              6. Which stage of tech-startup do you accept?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              We invest in startups at all stages: from idea-stage startups up
              to series Astartups or even beyond. If your startup is still in
              the idea stage then you can join ITP program, we will link you up
              with the best company to build and walk with you all the way.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              7. How much funding do startup companies receive?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Before raising funds for any startups, we do our due diligence
              with the startups’ team to arrive at amount of financial capital
              to be raised. As much as we are dedicated about the growth ofeach
              startups, we are also focused on ensuring that the investors get a
              ROI.
              <br />
              Hence, it is our duty to help the startups to cross all the Ts, do
              all the necessary paper works and do a proper risk analysis.
              <br />
              Before even raising funds, we help the startups develop and
              execute some cost-effective strategies that will enable them pilot
              properly and gain some tractions.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              8. How does Techlauncher make money?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              We will make money by the following three ways:
              <br />
              1. From subscription fees by startups that subscribe only to our
              business development and legal documentation services.
              <br />
              2. From income generated by the startups in our programs as
              shareholders. <br />
              3. By selling equity of the start-ups once they raise more capital
              or through their exit.
              <br />
              We know that investing in a startup has high risks. However, we
              strongly believe in the abilities of our team, our investment and
              business strategy, and the selection criteria that we are
              following.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              9. Do you accept new investors to invest in Techlauncher itself?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              No, unless it's an irresistibly good investor proposition. We are
              not currently searching for investors ourselves as Techlauncher is
              backed up by many strong investors. But we totally do consider a
              new and interesting partner who is ready to take the risk with us
              and will bring experience and connections. If you possess what it
              takes to become a Partner at Techlauncher, then please email us
              because we will be more than happy to connect with you.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              10. Do you sign an NDA with founders?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              We don't usually sign NDAs with entrepreneurs/investors because we
              have a lot of ideas that come along on a daily basis. Signing an
              NDA might hinder us from working with future teams who might have
              the same idea!
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginBottom: "30px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              11. What services do you offer for startups?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              We offer business development (increasing sales and revenues,
              entering new markets, product testing, improving pitching)
              services, preparing of legal documents, and fund raising.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
    </>
  );
}

export default About;
