import React from "react";
import { Form, Col, Button, Alert } from "react-bootstrap";

class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      resetPass: false,
      alert: false,
      message: ""
    };
  }

  componentDidMount() {
    this.setState({ resetPass: this.props.resetPass });
  }

  render() {
    if (!this.state.resetPass) {
      return (
        <Form onSubmit={this.requestPasswordReset}>
          <Form.Row>
            <Col md="2" />
            <Col>
              <Form.Group controlId="email">
                <Form.Label>
                  Enter your Email Address to request a password reset
                </Form.Label>
                <Form.Control
                  required
                  placeholder="Email Address"
                  type="email"
                />
              </Form.Group>
            </Col>
            <Col md="2" />
          </Form.Row>
          <Button type="submit">Submit</Button>
        </Form>
      );
    } else {
      let alert = <div></div>;
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
          <Form onSubmit={this.resetPassword}>
            <Form.Row>
              <Col md="2" />
              <Col>
                <Form.Group>
                  <Form.Label>Enter a new password</Form.Label>
                  <Form.Control
                    required
                    placeholder="New Password"
                    type="password"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Confirm your new password</Form.Label>
                  <Form.Control
                    placeholder="Confirm Password"
                    type="password"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md="2" />
            </Form.Row>
            <Button type="submit">Confirm</Button>
          </Form>
        </div>
      );
    }
  }

  requestPasswordReset = e => {
    let email = document.getElementById("email").value;
    fetch(
      "https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/Frontend-Lambda/account/password_request/",
      { method: "POST", body: { email: email } }
    )
      .then(response => {
        return response.json();
      })
      .then(result => {
        console.log(result);
      });
    e.preventDefault();
    e.stopPropagation();
  };

  resetPassword = e => {
    let p1 = document.getElementById("p1").value;
    let p2 = document.getElementById("p2").value;
    if (p1.length < 8) {
      this.setState({
        alert: true,
        message: "Your password should have more than 8 characters"
      });
    } else if (p1 !== p2) {
      this.setState({ alert: true, message: "The passwords do not match" });
    } else {
      this.setState({ alert: false, message: "" });
      fetch(
        "https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/Frontend-Lambda/account/password_update/"
      ).then(response => {
        console.log(response);
      });
    }
    e.preventDefault();
    e.stopPropagation();
  };
}

export default ForgotPassword;
