import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./UpdatePass.css";

export default function UpdatePass() {
  
  return (
    <div>
      <div className="UpdatePass">
        <form>
        <FormGroup controlId="email">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
            />
          </FormGroup>
          <FormGroup controlId="pass">
            <FormLabel>New Password</FormLabel>
            <FormControl
              autoFocus
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="confirmPass">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
              autoFocus
              type="password"
            />
          </FormGroup>
          <FormGroup>
            <Button block type="submit">
              Update Password
            </Button>
          </FormGroup>
        </form>
      </div>
    </div>
  );
}
