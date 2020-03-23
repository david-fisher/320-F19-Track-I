import React from "react";
import "./Contacts.css";
import { Container } from "react-bootstrap";
import ContactsData from './contacts.json'

// This function will be used in order to get the list of contacts that will be displayed
// on the contacts page. At the moment, it will simply return a list of researcher and 
// grower contact information. In the future, it will get this information using a GET 
// request on a specific endpoint.
function getContactsList() {
	//return testList;
}

export function Contacts() {
  return (
    <body>
      <Container className="Title">
        <h1>Contact Information</h1>
        <hr />
      </Container>
      
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
