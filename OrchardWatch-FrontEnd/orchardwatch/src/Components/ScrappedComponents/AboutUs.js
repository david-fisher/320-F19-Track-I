import React from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import { Timeline } from "react-twitter-widgets";

class AboutUs extends React.Component {
  constructor() {
    super();
    this.state = {
      description: "",
      editting: false
    };
  }

  componentDidMount() {
    // fetch description from Lambdas
    this.setState({
      description:
        "OrchardWatch, defender of apples, slayer of apple scab, your friendly neighborhood hero!"
    });
  }

  render() {
    let description = this.state.description.split("\n").map((line, key) => {
      return (
        <span key={key}>
          {line}
          <br />
        </span>
      );
    });
    let tweets = (
      <Timeline
        dataSource={{
          sourceType: "profile",
          screenName: "iamdevloper"
        }}
        options={{
          username: "iamdevloper",
          height: "500",
          width: "250"
        }}
        onLoad={() => console.log("twitter timeline loaded!")}
      />
    );
    if (this.props.user === "researcher") {
      var edit = (
        <div>
          <Button
            onClick={() => {
              this.setState({ editting: true });
            }}
          >
            Edit Description
          </Button>
          <br></br>
          <br></br>
          {description}
        </div>
      );
      if (this.state.editting) {
        edit = (
          <div>
            <Row>
              <Col md="1" />
              <Col>
                <Button onClick={this.updateDescription}>Save</Button>
                <Button
                  onClick={() => {
                    this.setState({ editting: false });
                  }}
                >
                  Cancel
                </Button>
                <br></br>
                <br></br>
                <Form>
                  <Form.Group controlId="editDescription">
                    <Form.Control
                      as="textarea"
                      rows="10"
                      defaultValue={this.state.description}
                    ></Form.Control>
                  </Form.Group>
                </Form>
              </Col>
              <Col md="1" />
            </Row>
          </div>
        );
      }
      return (
        <div>
          <Row>
            <Col md="8">{edit}</Col>
            <Col>{tweets}</Col>
          </Row>
        </div>
      );
    } else {
      return (
        <div>
          <Row>
            <Col md="8">
              <p>{description}</p>
            </Col>
            <Col>{tweets}</Col>
          </Row>
        </div>
      );
    }
  }

  updateDescription = e => {
    // send to lambdas
    var description = document.getElementById("editDescription").value;
    console.log(description);
    this.setState({ description: description, editting: false });
  };
}

export default AboutUs;
