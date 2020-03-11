import React from "react";
import "./Contacts.css";
import { Container } from "react-bootstrap";

export function Contacts() {
  return (
    <body>
      <Container className="Title">
        <h1>Contact Information</h1>
        <hr />
      </Container>
      <Container>
        <h1 className="name">Farmer Bob</h1>
        <p class="lead border border-light rounded">
          Email: farmersUnited@gmail.com
        </p>
        
        <h1 className="name">Researcher Phil</h1>
        <p class="lead border border-light rounded">
          Email: researchersUnited@gmail.com
        </p>
        
        <h1 className="name">Donut Monkey</h1>
        <p class="lead border border-light rounded">
          Email: giveMeDonuts@aol.com
        </p>
        
        <h1 className="name">Dirty Dan</h1>
        <p class="lead border border-light rounded">
          Email: imNotPinheadLarry@aol.com
        </p>
      </Container>
    </body>
  );
}

export default Contacts;
