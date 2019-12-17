import React from "react";
import logo from "./ow-logo.png";
import "./App.css";
import Home from "./Components/Home";
import Data from "./Components/Data";
import ImageGallery from "./Components/ImageGallery";
import Login from "./Components/Login";
import AskAI from "./Components/AskAI";
import ForgotPassword from "./Components/ForgotPassword";
import Dashboard from "./Components/Dashboard";
import { Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import GoogleMap from "./Components/GoogleMap"

const cookie = new Cookies();

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      page: "Home"
    };
  }

  render() {
    console.log(cookie.get("user"));
    let page = this.pageRender();
    let navBar = (
      <div className="NavBar">
        <Button onClick={() => this.setState({ page: "Home" })}>Home</Button>
        <Button onClick={() => this.setState({ page: "Login" })}>Login</Button>
      </div>
    );
    if (cookie.get("user") === "public") {
      navBar = (
        <div className="NavBar">
          <Button onClick={() => this.setState({ page: "Home" })}>Home</Button>
          <Button onClick={() => this.setState({ page: "Data" })}>Data</Button>
          <Button onClick={() => this.setState({ page: "Dashboard" })}>
            Dashboard
          </Button>
          <Button
            onClick={() => {
              cookie.set("email", "");
              cookie.set("user", "guest");
              cookie.set("authToken", null);
              this.setState({ page: "Home" });
            }}
          >
            Logout
          </Button>
        </div>
      );
    } else if (
      cookie.get("user") === "grower" ||
      cookie.get("user") === "researcher"
    ) {
      navBar = (
        <div className="NavBar">
          <Button onClick={() => this.setState({ page: "Home" })}>Home</Button>
          <Button onClick={() => this.setState({ page: "Data" })}>Data</Button>
          <Button onClick={() => this.setState({ page: "Gallery" })}>
            Gallery
          </Button>
          <Button onClick={() => this.setState({ page: "AskAI" })}>
            Ask AI
          </Button>
          <Button onClick={() => this.setState({ page: "Dashboard" })}>
            Dashboard
          </Button>
          <Button
            onClick={() => {
              cookie.set("user", "guest");
              cookie.set("authToken", null);
              cookie.set("email", "");
              this.setState({ page: "Home" });
            }}
          >
            Logout
          </Button>
        </div>
      );
    }
    return (
      <div className="App">
        <div className="Header">
          <img src={logo} alt="OrchardWatch"></img>
        </div>
        {navBar}
        <br></br>
        <div className="body">{page}</div>
      </div>
    );
  }

  auth(user) {
    cookie.set("user", user);
    this.setState({ page: "Home" });
  }

  setPage(page) {
    this.setState({ page: page });
  }

  pageRender() {
    switch (this.state.page) {
      case "Home":
        return <Home />;
      case "Data":
        return <Data cookie={cookie} />;
      case "Gallery":
        return (
          <ImageGallery
            user={cookie.get("user")}
            token={this.state.authToken}
          />
        );
      case "Login":
        return (
          <Login
            cookie={cookie}
            auth={this.auth.bind(this)}
            setPage={this.setPage.bind(this)}
          />
        );
      case "AskAI":
        return <AskAI user={cookie.get("user")} />;
      case "Dashboard":
        return <Dashboard cookie={cookie} />;
      case "ForgotPassword":
        return <ForgotPassword resetPass={false} />;
      case "ResetPassword":
        return <ForgotPassword resetPass={true} />;
      default:
        return <Home />;
    }
  }
}

export default App;
