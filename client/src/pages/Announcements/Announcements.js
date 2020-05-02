import React, {useEffect, useState} from "react";
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
    const [data, setData] = useState({announcements: [], isFetching: false});
    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                setData({announcements: data.announcements, isFetching: true});
                fetch('https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/announcements')
                    .then(response => response.json())
                    .then(result => {
                        setData({
                            announcements: result.map(content => ({
                                num: content[0].longValue,
                                title: content[1].stringValue,
                                description: content[2].stringValue,
                                date: content[3].stringValue,
                                email: content[4].stringValue,
                            })), isFetching: false})
                    })
                    .catch(e => {
                        console.log(e);
                        setData({contacts: data.contacts, isFetching: false});
                    });
            } catch (e) {
                console.log(e);
                setData({announcements: data.announcements, isFetching: false});
            }
        };
        fetchAnnouncements();
    }, []);

  return (
    <div>
      <p id="demo"></p>

      <Container className="Title">
        <h1>Announcements</h1>
        <hr />
      </Container>

    <Container>
    {email !== undefined && <Button className="addUpdate" href="/addannouncement">
        Add Announcement
    </Button>}
    </Container>

      {data.announcements.map((announcementsInfo, index)=> {
          return <Container key={index}>
              <h1 className="title">
                {announcementsInfo.title}
              </h1>
              <p className="lead border border-light rounded">
                Posted on {announcementsInfo.date}, by {announcementsInfo.email}
              </p>
              <p className="lead border border-light rounded">
                {announcementsInfo.description}
              </p>
          </Container>
    })})}
    </div>
  );
}

export default Announcements;