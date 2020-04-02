import React from "react";
import { Container, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import {
  VictoryLine,
  VictoryChart,
  VictoryLabel,
  VictoryAxis,
  VictoryTheme,
  VictoryBar,
  VictoryScatter,
  VictoryPie,
  VictoryArea,
  VictoryPolarAxis,
  VictoryVoronoi
} from "victory";

const data = [
  {
    Epochtime: 1576475402,
    HoboID: "454-788",
    Humidity: 7,
    LeafWetness: 9,
    Rainfall: 83,
    SoilMoisture: 43,
    SolarRadiation: 343413,
    Temperature: 92,
    Wind: 4
  },
  {
    Epochtime: 1576475403,
    HoboID: "454-788",
    Humidity: 7,
    LeafWetness: 9,
    Rainfall: 83,
    SoilMoisture: 43,
    SolarRadiation: 323444,
    Temperature: 12,
    Wind: 7
  },
  {
    Epochtime: 1576475404,
    HoboID: "454-788",
    Humidity: 4,
    LeafWetness: 5,
    Rainfall: 73,
    SoilMoisture: 43,
    SolarRadiation: 323413,
    Temperature: 92,
    Wind: 6
  },
  {
    Epochtime: 1576475405,
    HoboID: "454-788",
    Humidity: 3,
    LeafWetness: 2,
    Rainfall: 83,
    SoilMoisture: 13,
    SolarRadiation: 344415,
    Temperature: 92,
    Wind: 6
  },
  {
    Epochtime: 1576475402,
    HoboID: "454-789",
    Humidity: 1,
    LeafWetness: 9,
    Rainfall: 83,
    SoilMoisture: 43,
    SolarRadiation: 343413,
    Temperature: 92,
    Wind: 4
  },
  {
    Epochtime: 1576475403,
    HoboID: "454-789",
    Humidity: 3,
    LeafWetness: 9,
    Rainfall: 73,
    SoilMoisture: 73,
    SolarRadiation: 327444,
    Temperature: 12,
    Wind: 5
  },
  {
    Epochtime: 1576475404,
    HoboID: "454-789",
    Humidity: 4,
    LeafWetness: 5,
    Rainfall: 73,
    SoilMoisture: 43,
    SolarRadiation: 323413,
    Temperature: 32,
    Wind: 6
  },
  {
    Epochtime: 1576475405,
    HoboID: "454-789",
    Humidity: 3,
    LeafWetness: 2,
    Rainfall: 83,
    SoilMoisture: 13,
    SolarRadiation: 344415,
    Temperature: 92,
    Wind: 6
  }
];
class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      y: "Humidity",
      hobo: "454-788",
      sdata: this.sortData("454-788"),
      chartType: "Line"
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleSelectHobo = this.handleSelectHobo.bind(this);
    this.handleSelectHobo = this.handleSelectHobo.bind(this);
    this.handleSelectChartType = this.handleSelectChartType.bind(this);

    // this.renderTableHeader = this.renderTableHeader.bind(this);
    // this.renderTableData = this.renderTableData.bind(this);
    // this.table = this.table.bind(this);

    this.sortData = this.sortData.bind(this);
  }

  // renderTableData(props) {
  //   let ret = [];
  //   let d = new Date(0);
  //   for (let i = 0; i < props.length; i++) {
  //     ret.push(
  //       <tr key={i}>
  //         <td key={props[i].Epochtime}>
  //           {new Date(props[i].Epochtime)
  //             .toString()
  //             .slice(0, 10)
  //             .replace(/-/g, "")}
  //         </td>
  //         <td key={props[i].HoboID}>{props[i].HoboID}</td>
  //         <td key={props[i].Humidity}>{props[i].Humidity}</td>
  //         <td key={props[i].LeafWetness}>{props[i].LeafWetness}</td>
  //         <td key={props[i].Rainfall}>{props[i].Rainfall}</td>
  //         <td key={props[i].SoilMoisture}>{props[i].SoilMoisture}</td>
  //         <td key={props[i].SolarRadiation}>{props[i].SolarRadiation}</td>
  //         <td key={props[i].Temperature}>{props[i].Temperature}</td>
  //         <td key={props[i].Wind}>{props[i].Wind}</td>
  //       </tr>
  //     );
  //   }
  //   console.log(ret);
  //   return ret;
  // }
  // renderTableHeader(props) {
  //   let ret = [];
  //   for (let i = 0; i < props.length; i++) {
  //     ret.push(<th id={props[i]}>{props[i]}</th>);
  //   }
  //
  //   return ret;
  // }
  // table(props) {
  //   const page = (
  //     <tbody>
  //       {this.renderTableHeader(Object.keys(props.sdata[0]))}
  //       {this.renderTableData(props.sdata)}
  //     </tbody>
  //   );
  //   console.log(page);
  //   return page;
  // }

  handleSelect(e) {
    this.setState({ y: e.target.value });
  }
  handleSelectHobo(e) {
    this.setState({ hobo: e.target.value });
    this.setState({ sdata: this.sortData(e.target.value) });
  }
  handleSelectChartType(e) {
  	this.setState({ chartType: e.target.value});
  }
  sortData(h) {
    let newdata = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].HoboID === h) {
        newdata.push(data[i]);
      }
    }
    return newdata;
  }
  render() {
    return (
      <div>
        <select onChange={this.handleSelectHobo}>
          <option value="454-788"> 454-788 </option>
          <option value="454-789"> 454-789 </option>
        </select>
        <select onChange={this.handleSelect}>
          <option value="Humidity"> Humidity </option>
          <option value="LeafWetness"> LeafWetness </option>
          <option value="Rainfall"> Rainfall </option>
          <option value="SoilMoisture"> SoilMoisture </option>
          <option value="SolarRadiation"> SolarRadiation </option>
          <option value="Temperature"> Temperature </option>
          <option value="Wind"> Wind </option>
        </select>
        <select onChange={this.handleSelectChartType}>
          <option value="Line"> Line </option>
          <option value="Bar"> Bar </option>
          <option value="Scatter"> Scatter </option>
          <option value="Pie"> Pie </option>
          <option value="Area"> Area </option>
        </select>
        <Graph y={this.state} />
        {/*{this.table(this.state)}*/}
      </div>
    );
  }
}

function Graph(props) {
  if (props.y.chartType == "Line") {
  	const page = (
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryLabel text={props.y.y} x={50} y={30} textAnchor="middle" />
        <VictoryLabel text="Time" x={410} y={270} textAnchor="middle" />
        <VictoryLine data={props.y.sdata} x="Epochtime" y={props.y.y} 
          animate={{duration: 2000, onLoad: { duration: 1000 }}}/>
        <VictoryAxis tickFormat={() => ""} />
        <VictoryAxis dependentAxis />
      </VictoryChart>
    );
    return page;
  } else if (props.y.chartType == "Bar"){
    const page = (
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryLabel text={props.y.y} x={50} y={30} textAnchor="middle" />
        <VictoryLabel text="Time" x={410} y={270} textAnchor="middle" />
        <VictoryBar data={props.y.sdata} x="Epochtime" y={props.y.y} style={{ data: { fill: "#c43a31" } }} 
          animate={{duration: 2000, onLoad: { duration: 1000 }}} />
        <VictoryAxis tickFormat={() => ""} />
        <VictoryAxis dependentAxis />
      </VictoryChart>
    );
    return page;
  } else if (props.y.chartType == "Scatter"){
    const page = (
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryLabel text={props.y.y} x={50} y={30} textAnchor="middle" />
        <VictoryLabel text="Time" x={410} y={270} textAnchor="middle" />
        <VictoryScatter data={props.y.sdata} x="Epochtime" y={props.y.y} />
        <VictoryAxis tickFormat={() => ""} />
        <VictoryAxis dependentAxis />
      </VictoryChart>
    );
    return page;
  } else if (props.y.chartType == "Pie"){
    const page = (
      <VictoryPie colorScale={["tomato", "orange", "cyan", "navy" ]} data={props.y.sdata} y={props.y.y} />
    );
    return page;
  } else {
  	const page = (
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryLabel text={props.y.y} x={50} y={30} textAnchor="middle" />
        <VictoryLabel text="Time" x={410} y={270} textAnchor="middle" />
        <VictoryArea data={props.y.sdata} x="Epochtime" y={props.y.y} style={{ data: { fill: "#c43a31" } }} 
          animate={{duration: 2000, onLoad: { duration: 1000 }}} />
        <VictoryAxis tickFormat={() => ""} />
        <VictoryAxis dependentAxis />
      </VictoryChart>
    );
    return page;
  }
}

export default function Data() {
  function downloadData() {
    let csv =
      encodeURI("data:text/csv;charset=utf-8,") +
      'Epochtime, 1576475402, HoboID, "454-788", Humidity, 7, LeafWetness, 9, Rainfall, 23, SoilMoisture, 43, SolarRadiation, 343413, Temperature: 92, Wind, 4' +
      'Epochtime, 1576475403, HoboID, "454-788", Humidity, 9, LeafWetness, 4, Rainfall, 83, SoilMoisture, 63, SolarRadiation, 341233, Temperature: 12, Wind, 1' +
      'Epochtime, 1576475404, HoboID, "454-788", Humidity, 7, LeafWetness, 2, Rainfall, 53, SoilMoisture, 43, SolarRadiation, 343413, Temperature: 42, Wind, 4' +
      'Epochtime, 1576475405, HoboID, "454-788", Humidity, 6, LeafWetness, 9, Rainfall, 73, SoilMoisture, 13, SolarRadiation, 344412, Temperature: 52, Wind, 7' +
      'Epochtime, 1576475406, HoboID, "454-789", Humidity, 1, LeafWetness, 9, Rainfall, 73, SoilMoisture, 33, SolarRadiation, 351411, Temperature: 72, Wind, 6' +
      'Epochtime, 1576475407, HoboID, "454-789", Humidity, 2, LeafWetness, 5, Rainfall, 33, SoilMoisture, 63, SolarRadiation, 332133, Temperature: 92, Wind, 3';
    return csv;
  }
  return (
    <div>
      <Container className="Title">
        <h1>HoboNet Data</h1>
        <hr />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Time</th>
              <th>HoboID</th>
              <th>Humidity</th>
              <th>Leaf Wetness</th>
              <th>Rainfall</th>
              <th>Soil Moisture</th>
              <th>Solar Radiation</th>
              <th>Temperature</th>
              <th>Wind</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dataInfo, index)=> {
              return <tr>
                <td>12-16-19 7:34AM</td>
                <td>{dataInfo.HoboID}</td>
                <td>{dataInfo.Humidity}</td>
                <td>{dataInfo.LeafWetness}</td>
                <td>{dataInfo.Rainfall}</td>
                <td>{dataInfo.SoilMoisture}</td>
                <td>{dataInfo.SolarRadiation}</td>
                <td>{dataInfo.Temperature}</td>
                <td>{dataInfo.Wind}</td>
              </tr>
            })}
          </tbody>
        </Table>
        <Button block href={downloadData()} download="data.csv">
          Download
        </Button>
      </Container>
      <Container>
        <hr />
        <h1>Visualize</h1>
        <hr />
        <Select />
      </Container>
    </div>
  );
}
