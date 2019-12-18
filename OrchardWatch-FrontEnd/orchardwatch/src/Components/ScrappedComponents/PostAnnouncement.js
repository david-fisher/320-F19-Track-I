import React from "react";
import { Form, Button, Container, Col } from "react-bootstrap";

class PostAnnouncements extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <h3>Post an Announcement</h3>
        <br></br>
        <Container>
          <Form onSubmit={this.postAnnouncement}>
            <Form.Group controlId="title">
              <Form.Control
                required
                placeholder="Announcement Title"
                type="input"
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Control
                required
                as="textarea"
                rows="10"
                placeholder="Announcement Description"
              />
            </Form.Group>
            <Col>
              <Button type="submit">Post</Button>
            </Col>
          </Form>
          <br></br>
          <Button onClick={() => this.props.dashboard()}>Go Back</Button>
        </Container>
      </div>
    );
  }

  postAnnouncement = e => {};
}

export default PostAnnouncements;
