import React from "react";
import "./Announcements.css";
import {Container, Nav} from "react-bootstrap";
import { Button } from "react-bootstrap";
import TestData from "./testData.json"
import Cookies from "universal-cookie";

const cookies = new Cookies();
const email = cookies.get("email");

const announcementData = fetch(
    "https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/announcements/",
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }
)

export function Announcements() {
  return (
    <body>
      <Container className="Title">
        <h1>Announcements</h1>
        <hr />
      </Container>
      
      <Container>
            {email !== undefined && <Button className="addUpdate" href="/addannouncement">
          Add Announcement
        </Button>}
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
