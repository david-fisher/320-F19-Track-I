import React from "react";
import logo from "./ow-logo.png";
import "./App.css";
import Home from "./Components/Home";
import Orchards from "./Components/Orchards";
import Data from "./Components/Data";
import ImageGallery from "./Components/ImageGallery";
import Login from "./Components/Login";
import Observations from "./Components/Observations";
import AskAI from "./Components/AskAI";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      page: "Home",
      user: "guest"
    };
  }

  render() {
    console.log(this.state.user);
    var page = this.pageRender();
    var navBar = (
      <div className="NavBar">
        <button onClick={() => this.setState({ page: "Home" })}>Home</button>
        <button onClick={() => this.setState({ page: "Data" })}>Data</button>
        <button onClick={() => this.setState({ page: "Login" })}>Login</button>
      </div>
    );
    if (this.state.user === "grower" || this.state.user === "researcher") {
      navBar = (
        <div className="NavBar">
          <button onClick={() => this.setState({ page: "Home" })}>Home</button>
          <button onClick={() => this.setState({ page: "Data" })}>Data</button>
          <button onClick={() => this.setState({ page: "Gallery" })}>
            Gallery
          </button>
          <button onClick={() => this.setState({ page: "Observations" })}>
            Observations
          </button>
          <button onClick={() => this.setState({ page: "AskAI" })}>
            Ask AI
          </button>
          <button
            onClick={() => {
              this.setState({ page: "Home", user: "public", authToken: null });
            }}
          >
            Logout
          </button>
        </div>
      );
    } else if (this.state.user === "public") {
      navBar = (
        <div className="NavBar">
          <button onClick={() => this.setState({ page: "Home" })}>Home</button>
          <button onClick={() => this.setState({ page: "Data" })}>Data</button>
          <button
            onClick={() => {
              this.setState({ page: "Home", user: "public", authToken: null });
            }}
          >
            Logout
          </button>
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

  auth(user, token) {
    this.setState({ page: "Home", user: user, authToken: token });
  }

  pageRender() {
    switch (this.state.page) {
      case "Home":
        return <Home user={this.state.user} />;
      case "Orchards":
        return <Orchards user={this.state.user} />;
      case "Data":
        return (
          <Data
            user={this.state.user}
            authorized={this.state.authToken !== null}
          />
        );
      case "Gallery":
        return <ImageGallery user={this.state.user} />;
      case "Login":
        return <Login user={this.state.user} auth={this.auth.bind(this)} />;
      case "Observations":
        return <Observations user={this.state.user} />;
      case "AskAI":
        return <AskAI user={this.state.user} />;
      default:
        return <Home user={this.state.user} />;
    }
  }
}

export default App;
