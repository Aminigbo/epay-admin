import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./check.css"
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Typography,
} from "@material-ui/core";

const PackageModal = ({
  open,
  close,
  nextForm,
  fundCheck,
  legalCheck,
  businessCheck,
  setFundCheck,
  setLegalCheck,
  setBusinessCheck,
  packageSelected,
}) => {
  const [error, setError] = useState("");

  const toNextForm = () => {
    if (
      businessCheck === false &&
      legalCheck === false &&
      fundCheck === false
    ) {
      setError("Select any package");
      return false;
    } else {
      packageSelected();
      nextForm();
      close();
    }
  };

  const resetBusinessCheck = () => {
    if (businessCheck === false) {
      setBusinessCheck(true);
    } else {
      setBusinessCheck(false);
    }
  };

  const resetLegalCheck = () => {
    if (legalCheck === false) {
      setLegalCheck(true);
    } else {
      setLegalCheck(false);
    }
  };

  const resetFundCheck = () => {
    if (fundCheck === false) {
      setFundCheck(true);
    } else {
      setFundCheck(false);
    }
  };

  return (
    <>
      <Modal
        show={open}
        onHide={close}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>Select any package</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl component="fieldset">
            <FormGroup aria-label="position">
              <FormControlLabel
                value="end"
                control={
                  <input
                    type="checkbox"
                    id="business"
                    className="checked"
                    checked={businessCheck}
                    onChange={resetBusinessCheck}
                    style={{ color: "#FF6256" }}
                  />
                }
                label="Business Development"
                labelPlacement="end"
              />

              {/* <label for="business">Business Development</label> */}
              <FormControlLabel
                value="end"
                control={
                  <input
                    type="checkbox"
                    className="checked"
                    checked={legalCheck}
                    onChange={resetLegalCheck}
                    style={{ margin:"15px 10px" }}
                  />
                }
                label="Legal Documentaton"
                labelPlacement="end"
              />
              <FormControlLabel
                value="end"
                control={
                  <input
                    type="checkbox"
                    className="checked"
                    checked={fundCheck}
                    onChange={resetFundCheck}
                    style={{ color: "#FF6256" }}
                  />
                }
                label="Get Funding"
                labelPlacement="end"
              />
            </FormGroup>
          </FormControl>
          <Typography variant="body1" style={{ color: "red" }}>
            {error}
          </Typography>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            style={{
              backgroundColor: "#fff",
              border: "1px solid #FF6256",
              borderRadius: "5px",
              color: "#FF6256",
            }}
            onClick={close}
          >
            Close
          </Button>
          <Button
            variant="secondary"
            style={{
              backgroundColor: "#FF6256",
              border: "none",
              borderRadius: "5px",
              color: "#fff",
            }}
            onClick={toNextForm}
          >
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PackageModal;
