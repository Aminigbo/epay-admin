import React from "react";
import { Modal } from "react-bootstrap";
import { Button, Typography } from "@material-ui/core";
import images from "../images/image";
import { Link } from "react-router-dom";

function Success({ open, close }) {
  return (
    <>
      <Modal
        show={open}
        onHide={() => close(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        {/* <Modal.Header>
          <Modal.Title>Select any package</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <div
            style={{
              width: "100%",
              height: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img src={images.good} alt="" width="auto" height="120px" />
          </div>
          <Typography variant="h4" align="center" style={{ paddingTop: 30 }}>
            Thank you for choosing Techlauncher
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
              Home
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Success;
