import React from "react";
import "./Contacts.css";
import { Container } from "react-bootstrap";
import ContactsData from "./contacts.json"

export function Contacts() {
  return (
    <body>
      <Container className="Title">
        <h1>Contact Information</h1>
        <hr />
      </Container>
      
      // Displays contact information taken from json data
      {ContactsData.map((contactsInfo, index)=> {
        return <Container>
        	<h1 classname="name">{contactsInfo.name}</h1>
        	<p class="lead border border-light rounded">
        	  {contactsInfo.position}
        	</p>
        	<p class="lead border border-light rounded">
        	  {contactsInfo.email}
        	</p>
        </Container>
      })}
    </body>
  );
}

export default Contacts;
