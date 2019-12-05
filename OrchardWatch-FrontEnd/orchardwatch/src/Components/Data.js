import React from "react";
import { Table, Row, Col, Button } from "react-bootstrap";

class Data extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  // implement dropdown to select which orchard to view data of
  componentDidMount() {
    this.setState({
      data: [
        {
          Date: "11/12/2018",
          Time: "12:00",
          "Tempertaure (F)": 84.32,
          "Wind Speed": 1.5,
          "Wetness (%)": 7.6,
          "Rain (in.)": 0
        },
        {
          Date: "11/13/2018",
          Time: "12:00",
          "Tempertaure (F)": 83.24,
          "Wind Speed": 0.7,
          "Wetness (%)": 7.1,
          "Rain (in.)": 0
        },
        {
          Date: "11/14/2018",
          Time: "12:00",
          Tempertaure: 84.95,
          "Wind Speed": 3,
          "Wetness (%)": 7.6,
          "Rain (in.)": 0
        }
      ]
    });
  }

  render() {
    if (this.state.data.length === 0) {
      return <div>No Data Available</div>;
    }
    let rows = Object.keys(this.state.data[0]).map((e, index) => {
      return <th key={index}>{e}</th>;
    });
    let data = this.state.data.map((e1, index1) => {
      let rows = Object.keys(e1).map((e2, index2) => {
        return <td key={index2}>{e1[e2]}</td>;
      });
      return <tr key={index1}>{rows}</tr>;
    });
    let downloadData = <div>Login in to download a csv file of the data.</div>;
    if (this.props.authorized){
        downloadData = <Button block>Download Data</Button>;
    }
    return (
      <div>
        <Row>
          <Col md="2" />
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>{rows}</tr>
              </thead>
              <tbody>{data}</tbody>
            </Table>
            <br></br>
            {downloadData}
          </Col>
          <Col md="2" />
        </Row>
      </div>
    );
  }
}

export default Data;
