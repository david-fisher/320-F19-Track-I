import React from "react";
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";
import Cookies from "universal-cookie";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      alert: false,
      success: false,
      message: ""
    };
  }

  render() {
    var alert = <div></div>;
    if (this.state.alert) {
      let alertVariant = "danger";
      if (this.state.success) {
        alertVariant = "success";
      }
      alert = (
        <Alert
          variant={alertVariant}
          onClose={() => {
            this.setState({ alert: false, success: false, message: "" });
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
              <br></br>
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
                    <Button
                      variant="primary"
                      onClick={() => {
                        this.props.setPage("ForgotPassword");
                      }}
                    >
                      Forgot Password
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
    e.preventDefault();
    e.stopPropagation();
    let email = document.getElementById("LoginEmail").value;
    let password = document.getElementById("LoginPassword").value;
    if (email === "grower@gmail.com" && password === "grower") {
      this.props.auth("grower");
    } else if (email === "researcher@gmail.com" && password === "researcher") {
      this.props.auth("researcher");
    } else if (email === "public@gmail.com" && password === "public") {
      this.props.auth("public");
    } else {
    fetch(
      "https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/Frontend-Lambda/account/login/",
      {
        method: "POST",
        body: JSON.stringify({ email: email, pass: password })
      }
    )
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 404) {
          this.setState({
            alert: true,
            success: false,
            message: "Wrong email or password"
          });
          return null;
        } else {
          console.log(response);
          this.setState({
            alert: true,
            success: false,
            message: "Something went wrong with Login"
          });
          return null;
        }
      })
      .then(result => {
        if (result === null) {
          return;
        }
        this.props.cookie.set('email', email);
        this.props.cookie.set("authToken", result.token);
        if (result.user === "p") {
          this.props.auth("public");
        } else if (result.user === "g") {
          this.props.auth("grower");
        } else if (result.user === "r") {
          this.props.auth("researcher");
        }
      });
    }
  };

  validateRegister = e => {
    e.preventDefault();
    e.stopPropagation();
    let email = document.getElementById("RegisterEmail").value;
    let p1 = document.getElementById("RegisterPassword").value;
    let p2 = document.getElementById("RegisterConfirmPassword").value;
    if (p1.length < 8) {
      this.setState({
        alert: true,
        success: false,
        message: "Your password should have more than 8 characters"
      });
    } else if (p1 !== p2) {
      this.setState({
        alert: true,
        success: false,
        message: "The passwords do not match"
      });
    } else {
      fetch(
        "https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/Frontend-Lambda/account/register/",
        { method: "POST", body: JSON.stringify({ email: email, pass: p1 }) }
      ).then(response => {
        if (response.status === 200) {
          this.setState({
            alert: true,
            success: true,
            message: "Account registered successfully"
          });
        } else if (response.status === 409) {
          this.setState({
            alert: true,
            success: false,
            message: "An account already exists with this email"
          });
        } else {
          this.setState({
            alert: true,
            success: false,
            message: "Something went wrong for Registering"
          });
        }
      });
    }
  };
}

export default Login;
