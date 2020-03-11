import React from "react";
import "./Announcements.css";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";

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
        
        <h1 className="title ">Monkeys Invade</h1>
        <p class="lead border border-light rounded">
          03/10/20: Monkeys have been eating up my apples. I need some help! They are
          everywhere and they are tearing up the place.
        </p>
        
        <h1 className="title ">Donuts</h1>
        <p class="lead border border-light rounded">
          03/08/20: Donuts have been scattered all over my orchard! Who did this?
        </p>
        
        <h1 className="title ">Biggest Apple Contest</h1>
        <p class="lead border border-light rounded">
          03/7/20: I will be hosting the biggest apple contest at my orchard on 
          April fools day. I hope to see yall there!
        </p>
      </Container>
    </body>
  );
}

export default Announcements;
