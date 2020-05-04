import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import Cookies from "universal-cookie";
import "./UpdatePass.css";

export default function UpdatePass() {
  const cookies = new Cookies();
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const email = cookies.get("email");

  function validateForm() {
    return password.length > 0 && confirm_password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if(password != confirm_password) {
      alert("Passwords do not match!");
      return;
    }

    fetch(
      "https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/user/password",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          pass: password
        })
      }
    )
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        alert("Password successfully changed!");
        document.location.href = "/home";
        return response.json();
      } else {
        throw new Error("Server can't be reached!");
      }
    })
    .catch(error => {
      alert("Password change failed!");
      console.log(error);
    });
  }
  
  return (
    <div>
      <div className="UpdatePass">
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="pass">
            <FormLabel>New Password</FormLabel>
            <FormControl
              autoFocus
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="confirmPass">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
              type="password"
              value={confirm_password}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Button block disabled={!validateForm()} type="submit">
              Update Password
            </Button>
          </FormGroup>
        </form>
      </div>
    </div>
  );
}
