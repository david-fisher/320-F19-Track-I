import React from "react";
import "./Announcements.css";
import { Container } from "react-bootstrap";

export function Announcements() {
  return (
    <body>
      <Container className="Title">
        <h1>Announcements</h1>
        <hr />
      </Container>
      <Container>
		<img src={require("./announcements.jpg")} alt="Announcements" class="center" />        

        <h1 className="header ">Recent Updates</h1>
        <p class="lead border border-light rounded">
          Update 1: Monkeys have been eating up my apples. I need some help! They are
          everywhere and they are tearing up the place. Update 2: Why are there donuts all over my orchard?
        </p>
      </Container>
    </body>
  );
}

export default Announcements;
