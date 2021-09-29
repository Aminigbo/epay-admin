import React, {useState} from 'react'
import {
  Container,
  Typography,
  Button,
} from "@material-ui/core";
import images from "../images/image";
import PackageModal from './PackageModal';
import Failed from './Failed';

function Packages({
  display,
  nextForm,
  fundCheck,
  legalCheck,
  businessCheck,
  setFundCheck,
  setLegalCheck,
  setBusinessCheck,
  packageSelected,
}) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <Container
        style={{
          marginTop: "100px",
          paddingBottom: "50px",
          display: display,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "120px",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <img src={images.logo2} alt="" height="100%" width="auto" />
        </div>
        <Typography
          align="center"
          style={{ paddingBottom: "10px" }}
          variant="h5"
        >
          You Are Welcome
        </Typography>
        <Typography
          align="center"
          style={{ paddingBottom: "20px" }}
          variant="h5"
        >
          Lets Help You Bring Your Dreams To Reality.
        </Typography>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            style={{
              padding: "10px 25px",
              backgroundColor: "#FF5F59",
              color: "#fff",
            }}
            onClick={() => setModal(true)}
          >
            Select Package
          </Button>
        </div>
      </Container>
      <PackageModal
        open={modal}
        close={() => setModal(false)}
        nextForm={nextForm}
        businessCheck={businessCheck}
        setBusinessCheck={setBusinessCheck}
        legalCheck={legalCheck}
        setLegalCheck={setLegalCheck}
        fundCheck={fundCheck}
        setFundCheck={setFundCheck}
        packageSelected={packageSelected}
      />
      <Failed/>
    </>
  );
}

export default Packages
