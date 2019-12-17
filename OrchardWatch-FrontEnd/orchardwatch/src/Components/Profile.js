import React from "react";
import { Button, Form, Container, Alert } from "react-bootstrap";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      changePassword: false,
      alert: false,
      message: ""
    };
  }

  render() {
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
    let changePassword = (
      <Button onClick={() => this.setState({ changePassword: true })}>
        Change Password
      </Button>
    );
    if (this.state.changePassword) {
      changePassword = (
        <Container>
          <Form onSubmit={this.changePassword}>
            <Form.Group controlId="oldPassword">
              <Form.Control
                required
                placeholder="Old Password"
                type="password"
              />
            </Form.Group>
            <Form.Group controlId="newPassword">
              <Form.Control
                required
                placeholder="New Password"
                type="password"
              />
            </Form.Group>
            <Form.Group controlId="confirmNewPassword">
              <Form.Control
                required
                placeholder="Confirm New Password"
                type="password"
              />
            </Form.Group>
            <Button type="submit">Confirm</Button>
          </Form>
        </Container>
      );
    }
    return (
      <div>
        {alert}
        <h3>Profile</h3>
        <p>Email: {this.props.cookie.get("email")}</p>
        {changePassword}
        <br></br>
        <br></br>
        <Button onClick={() => this.props.dashboard()}>Go Back</Button>
      </div>
    );
  }

  changePassword = e => {
    let p1 = document.getElementById("newPassword").value;
    let p2 = document.getElementById("confirmNewPassword").value;
    console.log(p1);
    console.log(p2);
    if (p1.length < 8) {
      this.setState({
        alert: true,
        message: "Your new password should have more than 8 characters"
      });
    } else if (p1 !== p2) {
      this.setState({ alert: true, message: "The passwords do not match" });
    } else {
      this.setState({ alert: false, message: "" });
      let oldPassword = document.getElementById("oldPassword");
      console.log(JSON.stringify({ email: this.props.cookie.get("email"), pass: p1 }));
      fetch(
        "https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/Frontend-Lambda/account/update_password/", 
        {
          method: "POST",
          body: JSON.stringify({ email: this.props.cookie.get("email"), pass: p1 })
        }
      )
        .then(response => {
          return response.json();
        })
        .then(result => {
          console.log(result);
        })
    }
    e.stopPropagation();
    e.preventDefault();
  };
}

export default Profile;
