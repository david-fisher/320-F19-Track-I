import React from "react";
import { Container, Form, Button } from "react-bootstrap";

class UploadImage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <h3>Upload an Image</h3>
        <br></br>
        <Container>
          <Form></Form>
          <br></br>
          <Button onClick={() => this.props.dashboard()}>Go Back</Button>
        </Container>
      </div>
    );
  }
}

export default UploadImage;
