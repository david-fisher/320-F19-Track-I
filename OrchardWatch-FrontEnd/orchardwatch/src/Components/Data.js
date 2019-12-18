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
      data: []
    };
  }

  onSelect = e => {
    this.setState({ date: moment.range(e.start, e.end) });
  };

  render() {
    let status = 0;
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
      status = fetch(
        `https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/Frontend-Lambda/data/data_download/${this.state.date.start.format(
          "YYYY-MM-DD%h:mm:ss"
        )}/${this.state.date.end.format("YYYY-MM-DD%h:mm:ss")}`,
        {
          method: "GET"
        }
      )
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 400) {
            return 1;
          } else {
            return 2;
          }
        })
        .then(result => {
          if (result !== 1 || result !== 2) {
            result = JSON.parse(result);
            let newData = [];
            if (result.values.length === 0){
              return 3;
            }
            result.values.map(e => {
              let obj = {};
              for (let i = 0; i < result.headers.length; ++i) {
                obj[result.headers[i]] = e[i];
              }
              newData.push(obj);
            });
            this.setState({ data: newData });
            console.log(newData);
          }
          this.setState({ search: false });
          return 4;
        });
    }
    if (status !== 4) {
      let message = 'Error retrieving data from server.';
      if (status === 1){
        message = 'Response from query is too large. Limit to a smaller query.';
      } else if (status === 3){
        message = 'No Data Available.';
      }
      return (
        <div>
          <p>{message}</p>
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
    let csv = encodeURI("data:text/csv;charset=utf-8," + parser.parse(data));
    return csv;
  }
}

export default Data;
