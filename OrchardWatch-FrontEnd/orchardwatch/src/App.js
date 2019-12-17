import React from "react";
import logo from "./Components/PrettyEricGraphics/AltLogo.png";
import "./App.css";
import Home from "./Components/Home";
import Data from "./Components/Data";
import ImageGallery from "./Components/ImageGallery";
import Login from "./Components/Login";
import AskAI from "./Components/AskAI";
import ForgotPassword from "./Components/ForgotPassword";
import Dashboard from "./Components/Dashboard";
import {Button, Navbar, Nav} from "react-bootstrap";
import Cookies from "universal-cookie";

const cookie = new Cookies();
const myBrand = "Orchard Watch";

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
            <Navbar className="NavBar" bg="dark" variant="dark" expand="xl">
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src= {logo}
                        width="300"
                        height="50"
                        className="d-inline-block align-top"
                    />
                    </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-center" activeKey="/home">
                        <Nav.Item>
                            <Nav.Link  onClick={() => this.setState({page: "Home"})}>Home </Nav.Link>
                        </Nav.Item><Nav.Item>
                            <Nav.Link  onClick={() => this.setState({page: "Gallery"})}>Gallery </Nav.Link>
                        </Nav.Item><Nav.Item>
                            <Nav.Link  onClick={() => this.setState({page: "Login"})}>Login </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );

        if (cookie.get("user") === "public") {
            navBar = (
                <Navbar className="NavBar" bg="dark" variant="dark" expand="xl">
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src= {logo}
                            width="300"
                            height="50"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="justify-content-center">
                            <Nav.Link  onClick={() => this.setState({page: "Home"})}> Home </Nav.Link>
                            <Nav.Link  onClick={() => this.setState({page: "Gallery"})}> Gallery </Nav.Link>
                            <Nav.Link  onClick={() => this.setState({page: "Data"})}> Data </Nav.Link>
                            <Nav.Link  onClick={() => this.setState({page: "Dashboard"})}> Dashboard </Nav.Link>
                            <Nav.Link
                                    onClick={() => {
                                    cookie.set("email", "");
                                    cookie.set("user", "guest");
                                    cookie.set("authToken", null);
                                    this.setState({page: "Home"});
                                }}
                            >
                                Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            );
        } else if (
            cookie.get("user") === "grower" ||
            cookie.get("user") === "researcher"
        ) {
            navBar = (
                <Navbar className="NavBar" bg="dark" variant="dark" expand="xl">
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src= {logo}
                            width="300"
                            height="50"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="justify-content-center">
                            <Nav.Link  onClick={() => this.setState({page: "Home"})}> Home </Nav.Link>
                            <Nav.Link  onClick={() => this.setState({page: "Data"})}> Data </Nav.Link>
                            <Nav.Link  onClick={() => this.setState({page: "Gallery"})}> Gallery </Nav.Link>
                            <Nav.Link  onClick={() => this.setState({page: "AskAI"})}> Ask AI </Nav.Link>
                            <Nav.Link  onClick={() => this.setState({page: "Dashboard"})}> Dashboard </Nav.Link>
                            <Nav.Link
                                onClick={() => {
                                    cookie.set("user", "guest");
                                    cookie.set("authToken", null);
                                    cookie.set("email", "");
                                    this.setState({page: "Home"});
                                }}
                            >
                                Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            );
        }
        return (
            <div className="App">
                <div className="Header">
                    {navBar}
                    <div className= "controlledBorder">
                    </div>
                </div>
                <br></br>
                <div className="body">{page}</div>
            </div>
        );
    }

    auth(user) {
        cookie.set("user", user);
        this.setState({page: "Home"});
    }

    setPage(page) {
        this.setState({page: page});
    }

    pageRender() {
        switch (this.state.page) {
            case "Home":
                return <Home/>;
            case "Data":
                return <Data cookie={cookie}/>;
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
                return <AskAI user={cookie.get("user")}/>;
            case "Dashboard":
                return <Dashboard cookie={cookie}/>;
            case "ForgotPassword":
                return <ForgotPassword resetPass={false}/>;
            case "ResetPassword":
                return <ForgotPassword resetPass={true}/>;
            default:
                return <Home/>;
        }
    }
}

export default App;
