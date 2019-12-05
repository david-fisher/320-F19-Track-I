import React from "react";
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      validated: false,
      alert: { bool: false, message: "" }
    };
  }

  render() {
    var alert = <div></div>;
    if (this.state.alert.bool) {
      alert = (
        <Alert
          variant="danger"
          onClose={() => {
            this.setState({ alert: { bool: false, message: "" } });
          }}
          dismissible
        >
          {this.state.alert.message}
        </Alert>
      );
    }
    return (
      <div>
        {alert}
        <Container>
          <Row>
            {/* Register Form */}
            <Col>
              <h3>Register</h3>
              <Form onSubmit={this.validateRegister}>
                <Form.Row>
                  <Col md="2"></Col>
                  <Col>
                    <Form.Group controlId="RegisterEmail">
                      <Form.Control
                        required
                        type="email"
                        placeholder="Email Address"
                        size="md"
                      />
                    </Form.Group>
                  </Col>
                  <Col md="2"></Col>
                </Form.Row>
                <Form.Row>
                  <Col md="2"></Col>
                  <Col>
                    <Form.Group controlId="RegisterPassword">
                      <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        size="md"
                      />
                    </Form.Group>
                  </Col>
                  <Col md="2"></Col>
                </Form.Row>
                <Form.Row>
                  <Col md="2"></Col>
                  <Col>
                    <Form.Group controlId="RegisterConfirmPassword">
                      <Form.Control
                        required
                        type="password"
                        placeholder="Confirm Password"
                        size="md"
                      />
                    </Form.Group>
                  </Col>
                  <Col md="2"></Col>
                </Form.Row>
                <Form.Row>
                  <Col md="2"></Col>
                  <Col>
                    <Form.Group controlId="RegisterAccessKey">
                      <Form.Control
                        type="text"
                        placeholder="Access Key"
                        size="md"
                      />
                    </Form.Group>
                  </Col>
                  <Col md="2"></Col>
                </Form.Row>
                <div>Growers and researchers need a valid Access Key.</div>
                <div>Public users can leave the 'Access Key' field blank.</div>
                <br></br>
                <Form.Row>
                  <Col md="2"></Col>
                  <Col>
                    <Button variant="primary" type="submit">
                      Register
                    </Button>
                  </Col>
                  <Col md="2"></Col>
                </Form.Row>
              </Form>
            </Col>
            {/* Login Form */}
            <Col>
              <h3>Login</h3>
              <Form onSubmit={this.validateLogin}>
                <Form.Row>
                  <Col md="2"></Col>
                  <Col>
                    <Form.Group controlId="LoginEmail">
                      <Form.Control
                        required
                        type="email"
                        placeholder="Email Address"
                        size="md"
                      />
                    </Form.Group>
                  </Col>
                  <Col md="2"></Col>
                </Form.Row>
                <Form.Row>
                  <Col md="2"></Col>
                  <Col>
                    <Form.Group controlId="LoginPassword">
                      <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        size="md"
                      />
                    </Form.Group>
                  </Col>
                  <Col md="2"></Col>
                </Form.Row>
                <Form.Row>
                  <Col md="2"></Col>
                  <Col>
                    <Button variant="primary" type="submit">
                      Login
                    </Button>
                  </Col>
                  <Col md="2"></Col>
                </Form.Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  validateLogin = e => {
    const validity = e.currentTarget.checkValidity();
    if (validity && true) {
      // replace true with check when sending to Lambdas and wait for authToken upon successful validation or ...
      // receives boolean based on successful validation, type of user, and authToken if boolean == true
      // wrong password
      switch (document.getElementById("LoginEmail").value) {
        case "public@gmail.com":
          this.props.auth("public", "Authorized");
          break;
        case "grower@gmail.com":
          this.props.auth("grower", "Authorized");
          break;
        case "researcher@gmail.com":
          this.props.auth("researcher", "Authorized");
          break;
        default:
          this.setState({
            alert: { bool: true, message: "Wrong Email or Password" }
          });
          e.preventDefault();
          e.stopPropagation();
          break;
      }
    } else {
      if (validity) {
        this.setState({
          alert: { bool: true, message: "Wrong Email or Password" }
        });
      }
      e.preventDefault();
      e.stopPropagation();
    }
  };

  validateRegister = e => {
    var validity = e.currentTarget.checkValidity();
    if (validity) {
      const p1 = document.getElementById("RegisterPassword").value;
      const p2 = document.getElementById("RegisterConfirmPassword").value;
      if (p1.length < 8) {
        this.setState({
          alert: {
            bool: true,
            message: "Your Password should have more than 8 characters"
          }
        });
        validity = false;
      } else if (p1 !== p2) {
        this.setState({
          alert: { bool: true, message: "The Passwords do not match" }
        });
        validity = false;
      } else {
        console.log("yes");
        // send to lambdas
      }
    }
    if (!validity) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
}

export default Login;
