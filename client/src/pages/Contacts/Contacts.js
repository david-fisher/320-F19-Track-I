import React, {useEffect, useState} from "react";
import "./Contacts.css";
import { Container } from "react-bootstrap";
import ContactsData from "./contacts.json";

export function Contacts() {
  const [data, setData] = useState({contacts: [], isFetching: false});
  useEffect(() => {
        const fetchContacts = async () => {
            try {
                setData({contacts: data.contacts, isFetching: true});
                fetch("https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/contacts")
                  .then(response => response.json())
                  .then(result => {
                    setData({contacts: result.map(content => ({
                      name: content.name,
                      email: content.email,
                      position: content.position,
                    })), isFetching: false})
                })
                .catch(e => {
                    console.log(e);
                    setData({contacts: data.contacts, isFetching: false});
                });
            } catch (e) {
                console.log(e);
                setData({contacts: data.contacts, isFetching: false});
            }
        };
        fetchContacts();
    }, []);
  
  return (
    <div>
      <Container className="Title">
        <h1>Contact Information</h1>
        <hr />
      </Container>
      {data.contacts.map((contactsInfo, index)=> {
        if (contactsInfo.position === "researcher" || contactsInfo.position === "grower") {
          return <Container key={index}>
            <h1 className="name">{contactsInfo.name}</h1>
            <p className="lead border border-light rounded">
              Position: {contactsInfo.position}
            </p>
            <p className="lead border border-light rounded">
              Email: <a href={"mailto:" + contactsInfo.email}> {contactsInfo.email} </a>
            </p>
          </Container>
        }
      })})}
    </div>
  );
}

export default Contacts;
