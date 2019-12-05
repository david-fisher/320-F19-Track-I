import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import GoogleMapReact from "google-map-react";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      activeVariable: "t"
    };
  }

  render() {
    var hobonetswitch = (
      <Row>
        <Col xs={1} />
        <Col xs={2}>
          <Button
            onClick={() => {
              this.setState({ activeVariable: "t " });
            }}
            block
          >
            Temperature
          </Button>
          <Button
            onClick={() => {
              this.setState({ activeVariable: "h" });
            }}
            block
          >
            Humidity
          </Button>
          <Button
            onClick={() => {
              this.setState({ activeVariable: "sr" });
            }}
            block
          >
            Solar Radiation
          </Button>
          <Button
            onClick={() => {
              this.setState({ activeVariable: "sm" });
            }}
            block
          >
            Soil Moisture
          </Button>
          <Button
            onClick={() => {
              this.setState({ activeVariable: "lw" });
            }}
            block
          >
            Leaf Wetness
          </Button>
          <Button
            onClick={() => {
              this.setState({ activeVariable: "r" });
            }}
            block
          >
            Rainfall
          </Button>
          <Button
            onClick={() => {
              this.setState({ activeVariable: "ws" });
            }}
            block
          >
            Wind Speed
          </Button>
          <Button
            onClick={() => {
              this.setState({ activeVariable: "wd" });
            }}
            block
          >
            Wind Direction
          </Button>
        </Col>
        <Col>
          <Map />
        </Col>
        <Col xs={1} />
      </Row>
    );
    return <div>{hobonetswitch}</div>;
  }
}

const Test = ({ text }) => <div>{text}</div>;

class Map extends React.Component {
  static defaultProps = {
    center: {
      lat: 42.253659,
      lng: -72.359804
    },
    zoom: 18
  };
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div style={{ height: "75vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyAtet06EefOdjCUF-YFsWceI6DMPUt54O4",
            language: "en"
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave}
        >
          <Test lat={42.253659} lng={-72.359804} text="My Marker" />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Home;
