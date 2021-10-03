import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Typography } from "@material-ui/core";
import images from "../images/image";
import ProgramSuccess from "./ProgramSuccess";

function ProgramModal({ open, close, program }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [finished, setFinished] = useState(false);

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
      setFinished(true);
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
          <Typography
            variant="body1"
            component="h1"
            style={{ marginTop: "10px" }}
          >
            Email-Address
          </Typography>
          <input
            type="email"
            style={{
              width: "100%",
              marginTop: "5px",
              padding: "10px 15px",
              border:"1px solid #FF6256"
            }}
            placeholder="Enter Your Email Address"
            value={email}
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
          <button
            variant="contained"
            style={{
              backgroundColor: "#FF6256",
              border: "none",
              borderRadius: "5px",
              color: "#fff",
              padding:"8px 20px"
            }}
            onClick={submit}
          >
            Send
          </button>
        </Modal.Footer>
      </Modal>
      <ProgramSuccess open={finished} close={setFinished} />
      {/* <Failed openFailed={failed} closeFailed={setFailed} /> */}
    </>
  );
}

export default ProgramModal;
