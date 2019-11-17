import React from "react";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.token);
    return (
      <div>
        <h2>Dashboard</h2>
        {this.props.token}
      </div>
    );
  }
}

export default Dashboard;
