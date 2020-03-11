import React from "react";
import "./AccountInfo.css";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";

export function AccountInfo() {
  return (
    <body>
      <Container className="Title">
        <h1>Account Information:</h1>
        <hr />
      </Container>
      <Container>
      	<img src={require("./image.jpg")} alt="ProfilePic" class="accountPic" />

        <h1 className="h">Name:</h1>
        <p class="lead border border-light rounded">
          Farmer Bob
        </p>
        <h1 className="h">Email:</h1>
        <p class="lead border border-light rounded">
          farmersUnited@aol.com
        </p>
        <h1 className="h">Position:</h1>
        <p class="lead border border-light rounded">
          Grower
        </p>
        <h1 className="h">Country:</h1>
        <p class="lead border border-light rounded">
          United States of America
        </p>
        <Button className="changeInfoButton">
          Change Information
        </Button>
      </Container>
    </body>
  );
}

export default AccountInfo;
