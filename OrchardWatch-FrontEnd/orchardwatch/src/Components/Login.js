import React from "react";
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      alert: false,
      message: ""
    };
  }

  render() {
    var alert = <div></div>;
    if (this.state.alert) {
      alert = (
        <Alert
          variant="danger"
          onClose={() => {
            this.setState({ alert: false, message: "" });
          }}
          dismissible
        >
          {this.state.message}
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
              <div>Growers and researchers need a valid Access Key.</div>
              <div>Public users can leave the 'Access Key' field blank.</div>
              <br></br>
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
                <br></br>
                <Form.Row>
                  <Col md="2"></Col>
                  <Col>
                    <Button variant="primary">Forgot Password</Button>
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
    let email = document.getElementById("LoginEmail").value;
    let password = document.getElementById("LoginPassword").value;
    fetch(
      `https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/Frontend-Lambda/account/login/${email}/${password}/`
    ).then(response => console.log(response));
    e.preventDefault();
    e.stopPropagation();
    // const validity = e.currentTarget.checkValidity();
    // console.log(validity);
    // if (validity && true) {
    //   // replace true with check when sending to Lambdas and wait for authToken upon successful validation or ...
    //   // receives boolean based on successful validation, type of user, and authToken if boolean == true
    //   // wrong password
    //   switch (document.getElementById("LoginEmail").value) {
    //     case "public@gmail.com":
    //       this.props.auth("public", "Authorized");
    //       break;
    //     case "grower@gmail.com":
    //       this.props.auth("grower", "Authorized");
    //       break;
    //     case "researcher@gmail.com":
    //       this.props.auth("researcher", "Authorized");
    //       break;
    //     default:
    //       this.setState({
    //         alert: true,
    //         message: "Wrong Email or Password"
    //       });
    //       e.preventDefault();
    //       e.stopPropagation();
    //       break;
    //   }
    // } else {
    //   if (validity) {
    //     this.setState({
    //       alert: true,
    //       message: "Wrong Email or Password"
    //     });
    //   }
    //   e.preventDefault();
    //   e.stopPropagation();
    // }
  };

  validateRegister = e => {
    let email = document.getElementById("RegisterEmail").value;
    let p1 = document.getElementById("RegisterPassword").value;
    let p2 = document.getElementById("RegisterConfirmPassword").value;
    let access = document.getElementById("RegisterAccessKey").value;
    if (p1.length < 8) {
      this.setState({
        alert: true,
        message: "Your Password should have more than 8 characters"
      });
    } else if (p1 !== p2) {
      this.setState({
        alert: true,
        message: "The Passwords do not match"
      });
    } else {
      fetch(
        `https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/Frontend-Lambda/account/register/${email}/${p1}/${access}`
      ).then(response => console.log(response));
    }
    e.preventDefault();
    e.stopPropagation();
  };
}

export default Login;
