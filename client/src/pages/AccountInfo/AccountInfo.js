import React from "react";
import "./AccountInfo.css";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import AccountData from "./accountData.json"

export function AccountInfo() {
  return (
    <body>
      <Container className="Title">
        <h1>Account Information:</h1>
        <hr />
      </Container>
      
      <Container>
      	<img src={require("./image.jpg")} alt="ProfilePic" class="accountPic" />
	  </Container>
	  
	  {AccountData.map((accInfo, index)=> {
        return <Container>
          <h1 classname="h">Name:</h1>
          <p class="lead border border-light rounded">
            {accInfo.name}
          </p>
          
          <h1 classname="h">Email:</h1>
          <p class="lead border border-light rounded">
            {accInfo.email}
          </p>
          
          <h1 classname="h">Position:</h1>
          <p class="lead border border-light rounded">
            {accInfo.position}
          </p>
          
          <h1 classname="h">Country:</h1>
          <p class="lead border border-light rounded">
            {accInfo.country}
          </p>
          
          <h1 classname="h">Birthday:</h1>
          <p class="lead border border-light rounded">
            {accInfo.birthday}
          </p>
        	
        </Container>
      })}
      
      <Container>
        <Button className="changeInfoButton">
          Change Information
        </Button>
      </Container>
    </body>
  );
}

export default AccountInfo;
