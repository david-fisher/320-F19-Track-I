import React from "react";
import { Table, Row, Col, Button } from "react-bootstrap";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(originalMoment);

class Data extends React.Component {
  constructor() {
    super();
    this.state = {
      select: true,
      search: false,
      date: moment.range(
        moment()
          .clone()
          .subtract(7, "days"),
        moment().clone()
      ),
      data: []
    };
  }

  onSelect = (date, states) => {
    this.setState({ date, states });
  };

  render() {
    if (this.state.select) {
      return (
        <div>
          <p>
            <b>Pick a date range to query for data</b>
          </p>
          <p>
            {this.state.date.start.format("MM/DD/YYYY")} to{" "}
            {this.state.date.end.format("MM/DD/YYYY")}
          </p>
          <DateRangePicker
            value={this.state.date}
            onSelect={this.onSelect}
            singleDateRange={true}
          />
          <br></br>
          <br></br>
          <Button
            onClick={() => {
              this.setState({ select: false, search: true });
            }}
          >
            Confirm
          </Button>
        </div>
      );
    } else if (this.state.search) {
      let data = fetch(
        // `https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/Frontend-Lambda/data/data_download/${this.state.date.start.format(
        //   "YYYY-MM-DD"
        // )}/${this.state.date.end.format("YYYY-MM-DD")}`,
        `https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/Frontend-Lambda/data/data_download/1970-01-01/2000-12-20`,
        {
          method: "GET"
        }
      )
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            return [];
          }
        })
        .then(result => {
          if (result.length !== 0) {
            console.log(result["0"]);
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
          this.setState({ search: false });
        });
    }
    if (this.state.data.length === 0) {
      return <div>No Data Available</div>;
    }
    let rows = Object.keys(this.state.data[0]).map((e, index) => {
      return <th key={index}>{e}</th>;
    });
    let dataTable = this.state.data.map((e1, index1) => {
      let rows = Object.keys(e1).map((e2, index2) => {
        return <td key={index2}>{e1[e2]}</td>;
      });
      return <tr key={index1}>{rows}</tr>;
    });
    let table = (
      <Row>
        <Col md="2" />
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>{rows}</tr>
            </thead>
            <tbody>{dataTable}</tbody>
          </Table>
        </Col>
        <Col md="2" />
      </Row>
    );
    return (
      <div>
        {table}
        <Button href={this.downloadData(this.state.data)} download="data.csv">
          Download Data
        </Button>
        <br></br>
        <br></br>
        <Button onClick={() => this.setState({ select: true })}>Go Back</Button>
      </div>
    );
  }

  downloadData(data) {
    const { Parser } = require("json2csv");
    const parser = new Parser();
    let csv = encodeURI("data:text/csv;charset=utf-8," + parser.parse(data));
    return csv;
  }
}

export default Data;
