import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button, TextField, Typography } from "@material-ui/core";
import images from "../images/image";
import Failed from "./Failed";
import Success from "./Success";

function ProgramModal({ open, close, program }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [finished, setFinished] = useState(false);
  const [failed, setFailed] = useState(false);

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const sendData = () => {
    fetch("http://localhost:5000/api/program", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        program: program,
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          setFinished(true);
          setFailed(false);
        } else {
          setFinished(false);
          setFailed(true);
        }
      });
  };

  const submit = () => {
    if (email === "") {
      setError("Please Enter An Email Address");
    } else if (!validateEmail(email)) {
      setError("Please Enter A Valid Email Address");
    } else {
      setError("");
      close(false);
      sendData();
    }
  };

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
            <img src={images.logo2} alt="" width="auto" height="120px" />
          </div>
          <TextField
            type="email"
            color="secondary"
            style={{ width: "100%", marginTop: "10px" }}
            label="Enter Your Email Address"
            value={email}
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Typography
            variant="body2"
            style={{ color: "red", marginTop: "5px" }}
          >
            {error}
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
            onClick={submit}
          >
            send
          </Button>
        </Modal.Footer>
      </Modal>
      <Success open={finished} close={setFinished} />
      <Failed openFailed={failed} closeFailed={setFailed} />
    </>
  );
}

export default ProgramModal;
