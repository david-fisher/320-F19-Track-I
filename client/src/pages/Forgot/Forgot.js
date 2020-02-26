import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Forgot.css";

export default function Forgot() {
  
  return (
    <div>
      <div className="Forgot">
        <form>
          <FormGroup controlId="email">
            <FormLabel>Recovery Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
            />
          </FormGroup>
          <FormGroup>
            <Button block type="submit">
              Send Recovery Email
            </Button>
          </FormGroup>
        </form>
      </div>
    </div>
  );
}
