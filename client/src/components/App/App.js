import React from 'react';
import logo from '../../assets/images/logo.svg'
import './App.css';

//router imports
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//bootstrap imports
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';

function App() {
  return (
  <Router>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Orchard Watch</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav">
      <li className="nav-item active">
      <Link to="/home" className="nav-link">Home</Link>
      </li>
      <li className="nav-item">
      <Link to="/about" className="nav-link">About</Link>
      </li>
      <li className="nav-item">
      <Link to="/dashboard" className="nav-link">Dashboard</Link>
      </li>
      
      
    </ul>
    </div>
  </nav>
  <Switch>
           <Route path="/home">
             <Home />
           </Route>
           <Route path="/about">
             <About />
           </Route>
           <Route path="/dashboard">
             <Dashboard />
           </Route>
         </Switch>
  </Router>
    // <Router>
    //   <div>
    //     <ul>
    //       <li>
    //         <Link to="/">Home</Link>
    //       </li>
    //       <li>
    //         <Link to="/about">About</Link>
    //       </li>
    //       <li>
    //         <Link to="/dashboard">Dashboard</Link>
    //       </li>
    //     </ul>

    //     <hr />

    //     {/*
    //       A <Switch> looks through all its children <Route>
    //       elements and renders the first one whose path
    //       matches the current URL. Use a <Switch> any time
    //       you have multiple routes, but you want only one
    //       of them to render at a time
    //     */}
    //     <Switch>
    //       <Route exact path="/">
    //         <Home />
    //       </Route>
    //       <Route path="/about">
    //         <About />
    //       </Route>
    //       <Route path="/dashboard">
    //         <Dashboard />
    //       </Route>
    //     </Switch>
    //   </div>
    // </Router>


  );
}

function Home() {
  return (
    <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
        Jake made this edit to test committing to the repo
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}


export default App;
