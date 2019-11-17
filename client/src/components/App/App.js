import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Cookies from "universal-cookie";
import Routes from "../Routes/Routes";
import { Nav, Navbar, NavItem } from "react-bootstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    const cookies = new Cookies();
    this.state = {
      token: cookies.get("token")
    };
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar>
        <Routes />
      </div>
    );
  }
}

export default App;
