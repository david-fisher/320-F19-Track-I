import React from "react";
import { Button, Form, Container, Card } from "react-bootstrap";
import UploadImage from "./UploadImage";
import SystemStatus from "./SystemStatus";
import Profile from "./Profile";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      page: "dashboard"
    };
  }

  render() {
    return this.pageRender();
  }

  pageRender() {
    let dashboard = (
      <Container>
        <Button
          variant="secondary"
          size="lg"
          block
          onClick={() => this.setState({ page: "profile" })}
        >
          Profile
        </Button>
      </Container>
    );
    if (
      this.props.cookie.get("user") === "grower" ||
      this.props.cookie.get("user") === "researcher"
    ) {
      dashboard = (
        <Container>
          <Button
            variant="secondary"
            size="lg"
            block
            onClick={() => this.setState({ page: "profile" })}
          >
            Profile
          </Button>
          <Button
            variant="secondary"
            size="lg"
            block
            onClick={() => this.setState({ page: "uploadImage" })}
          >
            Upload Image
          </Button>
          <Button
            variant="secondary"
            size="lg"
            block
            onClick={() => this.setState({ page: "systemStatus" })}
          >
            System Status
          </Button>
        </Container>
      );
    }
    switch (this.state.page) {
      case "profile":
        return (
          <Profile
            dashboard={this.resetDashboard.bind(this)}
            cookie={this.props.cookie}
          />
        );
      case "uploadImage":
        return <UploadImage dashboard={this.resetDashboard.bind(this)} />;
      case "systemStatus":
        return <SystemStatus dashboard={this.resetDashboard.bind(this)} />;
      default:
        return <div>{dashboard}</div>;
    }
  }

  resetDashboard() {
    this.setState({ page: "dashboard" });
  }
}

export default Dashboard;
