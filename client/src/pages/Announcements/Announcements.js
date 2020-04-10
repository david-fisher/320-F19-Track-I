import React from "react";
import "./Announcements.css";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import TestData from "./testData.json"

export function Announcements() {
  return (
    <body>
      <Container className="Title">
        <h1>Announcements</h1>
        <hr />
      </Container>
      
      <Container>
		<img src={require("./announcements.jpg")} alt="Announcements" class="center" />        

		<Button className="addUpdate">
          Add Announcement
        </Button>
      </Container>
        
      {TestData.map((annInfo, index)=> {
        return <Container>
          <h1 classname="title">{annInfo.title}</h1>
          <p class="lead border border-light rounded">
            {annInfo.date}: {annInfo.description}
          </p>
        	
        </Container>
      })}
    </body>
  );
}

export default Announcements;
