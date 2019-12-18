import React from "react";
import { Table, Row, Col, Button, Container } from "react-bootstrap";
import DatetimeRangePicker from "react-datetime-range-picker";
import originalMoment from "moment";
import { extendMoment } from "moment-range";

const { Parser } = require("json2csv");
const parser = new Parser();
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
          .subtract(3, "days"),
        moment().clone()
      ),
      data: [{ loading: true }]
    };
  }

  onSelect = e => {
    this.setState({ date: moment.range(e.start, e.end) });
  };

  render() {
    if (this.state.select) {
      return (
        <div>
          <h3>Data</h3>
          <br></br>
          <p>
            <b>Pick a date range to query for data</b>
          </p>
          <Container>
            <DatetimeRangePicker
              startDate={this.state.date.start}
              endDate={this.state.date.end}
              onChange={this.onSelect}
            />
          </Container>
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
      fetch(
        `https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/Frontend-Lambda/data/data_download/${this.state.date.start.format(
          "YYYY-MM-DD+h:mm:ss"
        )}/${this.state.date.end.format("YYYY-MM-DD+h:mm:ss")}`,
        {
          method: "GET"
        }
      )
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 400) {
            return null;
          } else {
            return null;
          }
        })
        .then(result => {
          if (result !== null) {
            result = JSON.parse(result);
            if (Object.keys(result).length === 0) {
              return [];
            }
            let newData = [];
            result.values.map(e => {
              let obj = {};
              for (let i = 0; i < result.headers.length; ++i) {
                obj[result.headers[i]] = e[i];
              }
              newData.push(obj);
            });
            return newData;
          }
          return null;
        })
        .then(newData => {
          this.setState({ data: newData });
          this.setState({ search: false });
        });
    }
    if (this.state.data === null || this.state.data.length === 0) {
      let message = <b>No Available Data</b>;
      if (this.state.data === null) {
        message = (
          <b>
            <p>Error retrieving data from server</p>
            <br></br>
            <p>The response for the specified query may have been too large</p>
            <p>Try limiting your query to a couple of days</p>
            <br></br>
            <p>If the problem persists, please contact a site administrator</p>
          </b>
        );
      }
      return (
        <div>
          <p className="WhiteDescription">{message}</p>
          <br></br>
          <Button onClick={() => this.setState({ select: true })}>
            Go Back
          </Button>
        </div>
      );
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
      <div className="dataTable">
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
      </div>
    );
    return (
      <div>
        <Row>
          <Col>
            <Button onClick={() => this.setState({ select: true })}>
              Go Back
            </Button>
          </Col>
          <Col>
            <Button
              href={this.downloadData(this.state.data)}
              download="data.csv"
            >
              Download Data
            </Button>
          </Col>
        </Row>
        <br></br>
        <br></br>
        {table}
      </div>
    );
  }

  downloadData(data) {
    let csv = encodeURI("data:text/csv;charset=utf-8," + parser.parse(data));
    return csv;
  }
}

export default Data;
