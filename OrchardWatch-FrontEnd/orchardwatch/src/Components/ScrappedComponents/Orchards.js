import React from "react";
import { Form, Row, Col, Button, Table } from "react-bootstrap";

class Orchards extends React.Component {
  constructor() {
    super();
    this.state = {
      orchards: [],
      selected: 0,
      editting: false
    };
  }

  // need to implement an add orchard button that takes in orchard name and access key
  // need to implement a delete orchard button that removes an orchard from the list
  componentDidMount() {
    // fetch Orchards and their associated description from Lambdas
    var data = {
      orchards: [
        {
          name: "CSO",
          description: "CSO. Apples. Yay!\n\n\n\nblah",
          sensors: [
            { name: "sensor1", active: true },
            { name: "sensor2", active: true }
          ]
        },
        {
          name: "Some Other Orchard",
          description:
            "We have apples too! Woo!\n\n\n\nblah\n\nblah\n\nblah\n\nblah",
          sensors: [
            { name: "sensorA", active: true },
            { name: "sensorB", active: false }
          ]
        },
        {
          name: "Amherst Apple Orchard",
          description: "Apples Galore!",
          sensors: []
        }
      ]
    };
    this.setState({ orchards: data.orchards });
  }

  render() {
    if (this.state.orchards.length === 0) return <div></div>;
    var orchards = this.state.orchards.map((orchard, index) => {
      return (
        <option key={index} value={index}>
          {orchard.name}
        </option>
      );
    });
    var description = this.state.orchards[this.state.selected].description
      .split("\n")
      .map((line, key) => {
        return (
          <span key={key}>
            {line}
            <br />
          </span>
        );
      });
    let orchardSelection = (
      <Form>
        <Row>
          <Col md="2"></Col>
          <Col>
            <Form.Group>
              <Form.Control
                as="select"
                onChange={e => {
                  this.setState({ selected: e.target.value });
                }}
              >
                {orchards}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md="2"></Col>
        </Row>
      </Form>
    );
    var edit = <div></div>;
    if (this.props.user === "grower") {
      edit = (
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
        </div>
      );
      if (this.state.editting) {
        edit = (
          <div>
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
          </div>
        );
        description = (
          <Row>
            <Col md="2" />
            <Col>
              <Form>
                <Form.Group controlId="editDescription">
                  <Form.Control
                    as="textarea"
                    rows="10"
                    defaultValue={
                      this.state.orchards[this.state.selected].description
                    }
                  ></Form.Control>
                </Form.Group>
              </Form>
            </Col>
            <Col md="2" />
          </Row>
        );
      }
    }
    let sensors = <div></div>;
    if (this.props.user === "grower" || this.props.user === "researcher") {
      if (this.state.orchards[this.state.selected].sensors.length === 0) {
        sensors = <div>No active sensors.</div>;
      } else {
        sensors = this.state.orchards[this.state.selected].sensors.map(
          (e, index) => {
            let active = "No";
            if (e.active) active = "Yes";
            return (
              <tr key={index}>
                <td>{e.name}</td>
                <td>{active}</td>
              </tr>
            );
          }
        );
        sensors = (
          <Row>
            <Col sm="2" />
            <Col>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>HOBO Sensor</th>
                    <th>Active</th>
                  </tr>
                </thead>
                <tbody>{sensors}</tbody>
              </Table>
            </Col>
            <Col sm="2" />
          </Row>
        );
      }
    }
    return (
      <div>
        {edit}
        {orchardSelection}
        <div>{description}</div>
        <br></br>
        <br></br>
        {sensors}
      </div>
    );
  }

  updateDescription = e => {
    // send to lambdas
    var description = document.getElementById("editDescription").value;
    console.log(description);
    var orchards = this.state.orchards;
    orchards[this.state.selected].description = description;
    this.setState({ orchards: orchards, editting: false });
  };
}

export default Orchards;
