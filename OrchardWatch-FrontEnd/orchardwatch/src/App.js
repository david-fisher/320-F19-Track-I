import React from 'react';
import logo from './ow-logo.png';
import './App.css';
import Home from './Components/Home';
import Data from './Components/Data';
import ImageGallery from './Components/ImageGallery';
import Login from './Components/Login';
import AskAI from './Components/AskAI';
import ForgotPassword from './Components/ForgotPassword';
import Dashboard from './Components/Dashboard';
import { Button } from 'react-bootstrap';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 'Home',
      user: 'guest',
      authToken: null
    };
  }

  render() {
    console.log(this.state.user);
    let page = this.pageRender();
    let navBar = (
      <div className='NavBar'>
        <Button onClick={() => this.setState({ page: 'Home' })}>Home</Button>
        <Button onClick={() => this.setState({ page: 'Login' })}>Login</Button>
      </div>
    );
    if (this.state.user === 'public') {
      navBar = (
        <div className='NavBar'>
          <Button onClick={() => this.setState({ page: 'Home' })}>Home</Button>
          <Button onClick={() => this.setState({ page: 'Data' })}>Data</Button>
          <Button onClick={() => this.setState({ page: 'Dashboard' })}>
            Dashboard
          </Button>
          <Button
            onClick={() => {
              this.setState({ page: 'Home', user: 'guest', authToken: null });
            }}
          >
            Logout
          </Button>
        </div>
      );
    } else if (
      this.state.user === 'grower' ||
      this.state.user === 'researcher'
    ) {
      navBar = (
        <div className='NavBar'>
          <Button onClick={() => this.setState({ page: 'Home' })}>Home</Button>
          <Button onClick={() => this.setState({ page: 'Data' })}>Data</Button>
          <Button onClick={() => this.setState({ page: 'Gallery' })}>
            Gallery
          </Button>
          <Button onClick={() => this.setState({ page: 'AskAI' })}>
            Ask AI
          </Button>
          <Button onClick={() => this.setState({ page: 'Dashboard' })}>
            Dashboard
          </Button>
          <Button
            onClick={() => {
              this.setState({ page: 'Home', user: 'guest' });
            }}
          >
            Logout
          </Button>
        </div>
      );
    }
    return (
      <div className='App'>
        <div className='Header'>
          <img src={logo} alt='OrchardWatch'></img>
        </div>
        {navBar}
        <br></br>
        <div className='body'>{page}</div>
      </div>
    );
  }

  auth(user, token=null) {
    this.setState({ page: 'Home', user: user, authToken: token });
  }

  setPage(page) {
    this.setState({ page: page });
  }

  pageRender() {
    switch (this.state.page) {
      case 'Home':
        return <Home user={this.state.user} />;
      case 'Data':
        return (
          <Data
            user={this.state.user}
            authorized={this.state.authToken !== null}
          />
        );
      case 'Gallery':
        return (
          <ImageGallery 
            user={this.state.user} 
            token={this.state.authToken}
          />
        );
      case 'Login':
        return (
          <Login
            user={this.state.user}
            auth={this.auth.bind(this)}
            setPage={this.setPage.bind(this)}
          />
        );
      case 'AskAI':
        return <AskAI user={this.state.user} />;
      case 'Dashboard':
        return <Dashboard user={this.state.user} />;
      case 'ForgotPassword':
        return <ForgotPassword resetPass={false} />;
      case 'ResetPassword':
        return <ForgotPassword resetPass={true} />;
      default:
        return <Home user={this.state.user} />;
    }
  }
}

export default App;
