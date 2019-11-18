import React from "react";
import Button from "react-bootstrap/Button";
import Cookies from "universal-cookie";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>This is the home page.</p>
      </div>
    );
  }
}

function checkCookie() {
  const cookies = new Cookies();
  console.log(cookies.get("token"));
}

export default Home;
