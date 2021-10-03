import React from "react";
import { Modal } from "react-bootstrap";
import { Button, Typography } from "@material-ui/core";
import images from "../images/image";
import { Link } from "react-router-dom";

function ProgramSuccess({ open, close }) {
  return (
    <>
      <Modal
        show={open}
        onHide={() => close(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body>
          <div
            style={{
              width: "100%",
              height: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img src={images.good} alt="" width="auto" height="100px" />
          </div>
          <Typography variant="h5" align="center" style={{ paddingTop: 30 }}>
            Thank you for applying our team will reach out to you shortly.
          </Typography>
        </Modal.Body>
        <Modal.Footer>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#FF6256",
                border: "none",
                borderRadius: "5px",
                color: "#fff",
              }}
              onClick={() => close(false)}
            >
              back
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProgramSuccess;
