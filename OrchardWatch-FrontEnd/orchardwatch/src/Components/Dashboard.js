import React from "react";
import { Button, Form, Container, Card } from "react-bootstrap";
import PostAnnouncement from "./PostAnnouncement";
import UploadImage from "./UploadImage";
import SystemStatus from "./SystemStatus";
import Profile from "./Profile";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      user: "guest",
      page: "dashboard"
    };
  }

  componentDidMount() {
    this.setState({ user: this.props.user });
  }

  render() {
    return this.pageRender();
  }

  pageRender() {
    let dashboard = (
      <Container>
        <Card>
          <Card.Header onClick={() => this.setState({ page: "profile" })}>
            Profile
          </Card.Header>
        </Card>
      </Container>
    );
    if (this.props.user === "grower" || this.props.user === "researcher") {
      dashboard = (
        <Container>
          <Card>
            <Card.Header onClick={() => this.setState({ page: "profile" })}>
              Profile
            </Card.Header>
          </Card>
          <Card>
            <Card.Header
              onClick={() => this.setState({ page: "postAnnouncement" })}
            >
              Post Announcement
            </Card.Header>
          </Card>
          <Card>
            <Card.Header onClick={() => this.setState({ page: "uploadImage" })}>
              Upload Image
            </Card.Header>
          </Card>
          <Card>
            <Card.Header
              onClick={() => this.setState({ page: "systemStatus" })}
            >
              System Status
            </Card.Header>
          </Card>
        </Container>
      );
    }
    switch (this.state.page) {
      case "profile":
        return <Profile dashboard={this.resetDashboard.bind(this)} />;
      case "postAnnouncement":
        return <PostAnnouncement dashboard={this.resetDashboard.bind(this)} />;
      case "uploadImage":
        return <UploadImage dashboard={this.resetDashboard.bind(this)} />;
      case "systemStatus":
        return <SystemStatus dashboard={this.resetDashboard.bind(this)} />;
      default:
        return <div>{dashboard}</div>;
    }
  }

  resetDashboard() {
    this.setState({ page: "" });
  }
}

export default Dashboard;
