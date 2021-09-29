import React from "react";
import { Modal } from "react-bootstrap";
import { Button, Typography } from "@material-ui/core";
import images from "../images/image";

function Failed({ openFailed, closeFailed }) {
  return (
    <>
      <Modal
        show={openFailed}
        onHide={() => closeFailed(false)}
        backdrop="static"
        keyboard={true}
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
            <img src={images.failed} alt="" width="auto" height="100px" />
          </div>
          <Typography variant="h5" align="center" style={{ paddingTop: 30 }}>
            Sorry, there was a network issue please try again
          </Typography>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#FF6256",
              border: "none",
              borderRadius: "5px",
              color: "#fff",
            }}
            onClick={() => closeFailed(false)}
          >
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Failed;
