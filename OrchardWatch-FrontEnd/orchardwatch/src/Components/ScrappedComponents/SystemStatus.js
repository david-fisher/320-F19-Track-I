import React from "react";
import { Container, Button } from "react-bootstrap";

class SystemStatus extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <h3>System Status</h3>
        <Container>
          <br></br>
          <Button onClick={() => this.props.dashboard()}>Go Back</Button>
        </Container>
      </div>
    );
  }
}

export default SystemStatus;
