import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router";

const Modals = ({ header, texts, opened, close }) => {

  const history = useHistory()

  const toForm = () => {
    close()
    history.push("/apply")
  }

  return (
    <>
      <Modal
        show={opened}
        onHide={close}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{texts}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            style={{
              backgroundColor: "#fff",
              border: "1px solid #FF6256",
              borderRadius: "10px",
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
              borderRadius: "10px",
              color: "#fff",
            }}
            onClick={toForm}
          >
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Modals;
