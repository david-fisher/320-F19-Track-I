import React from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Accordion,
  Card,
  Alert
} from "react-bootstrap";

class Observations extends React.Component {
  constructor() {
    super();
    this.state = {
      observations: [],
      postObservations: true,
      alert: false
    };
  }

  componentDidMount() {
    this.setState({
      observations: [
        {
          title: "Some Observation",
          description: "Some Description",
          orchard: "Cold Spring Orchards"
        },
        {
          title: "Another Observation",
          description: "Another Description",
          orchard: "Cold Spring Orchards"
        },
        {
          title: "Yet Another Observation",
          description: "Yet Another Description",
          orchard: "Cold Spring Orchards"
        }
      ]
    });
  }

  render() {
    var alert = <div></div>;
    if (this.state.alert) {
      alert = (
        <Alert
          variant="success"
          onClose={() => {
            this.setState({ alert: false });
          }}
          dismissible
        >
          Observation Submitted
        </Alert>
      );
    }
    var observations = (
      <div>
        {alert}
        <Row>
          <Col md="2" />
          <Col>
            <Form onSubmit={this.submitObservation}>
              <Form.Group>
                <Form.Group controlId="ObservationTitle">
                  <Form.Control
                    required
                    type="text"
                    placeholder="Observation Title"
                  />
                </Form.Group>
              </Form.Group>
              <Form.Group>
                <Form.Group controlId="ObservationDescription">
                  <Form.Control
                    required
                    as="textarea"
                    rows="10"
                    placeholder="Observation Description/Comments"
                  />
                </Form.Group>
              </Form.Group>
              <Button onClick={() => {}} block>
                Upload Images
              </Button>
              <br></br>
              <br></br>
              <Button type="submit" block>
                Submit Observations
              </Button>
            </Form>
          </Col>
          <Col md="2" />
        </Row>
      </div>
    );
    if (!this.state.postObservations) {
      let list = this.state.observations.map((e, index) => {
        return (
          <Card key={index}>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                {e.orchard} - {e.title}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={index}>
              <Card.Body>{e.description}</Card.Body>
            </Accordion.Collapse>
          </Card>
        );
      });
      observations = (
        <div>
          <Accordion>{list}</Accordion>
        </div>
      );
    }
    var switchViews = (
      <Button
        onClick={() => {
          this.setState({ postObservations: true });
        }}
      >
        Post Observations
      </Button>
    );
    if (this.state.postObservations) {
      switchViews = (
        <Button
          onClick={() => {
            this.setState({ postObservations: false });
          }}
        >
          View Observations
        </Button>
      );
    }
    if (this.props.user === "researcher") {
      return (
        <div>
          {switchViews}
          <br></br>
          <br></br>
          {observations}
        </div>
      );
    } else {
      return <div>{observations}</div>;
    }
  }

  submitObservation = e => {
    e.preventDefault();
    e.stopPropagation();
    let title = document.getElementById("ObservationTitle").value;
    let description = document.getElementById("ObservationDescription").value;
    console.log(title, description);
    this.setState({ alert: true });
  };
}

export default Observations;
