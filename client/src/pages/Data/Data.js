import React, {useEffect, useState} from "react";
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

const hoboData = [
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

const appleData = [
  {
    TreeNum: 10,
    ClusterID: "219-18",
    AppleGrowthRates: [5, 12, 6, 3, 4, 1]
  },
  {
    TreeNum: 10,
    ClusterID: "261-25",
    AppleGrowthRates: [7, 16, 2, 13, 4, 5]
  },
  {
    TreeNum: 11,
    ClusterID: "162-12",
    AppleGrowthRates: [15, 2, 14, 3, 4, 11]
  },
  {
    TreeNum: 11,
    ClusterID: "54-39",
    AppleGrowthRates: [5, 12, 4, 3, 22, 1]
  },
  {
    TreeNum: 12,
    ClusterID: "73-27",
    AppleGrowthRates: [5, 17, 20, 3, 1, 1]
  },
  {
    TreeNum: 12,
    ClusterID: "201-17",
    AppleGrowthRates: [7, 12, 1, 3, 4, 12]
  },
  {
    TreeNum: 13,
    ClusterID: "17-20",
    AppleGrowthRates: [8, 1, 16, 3, 14, 1]
  },
  {
    TreeNum: 13,
    ClusterID: "59-30",
    AppleGrowthRates: [10, 12, 16, 3, 4, 21]
  },
  {
    TreeNum: 14,
    ClusterID: "76-12",
    AppleGrowthRates: [15, 2, 6, 3, 4, 11]
  },
  {
    TreeNum: 14,
    ClusterID: "109-39",
    AppleGrowthRates: [5, 12, 6, 3, 14, 1]
  },
]

const treeData = [
  {
    TreeNum: 10,
    PotentialBoreRate: 12
  },
  {
    TreeNum: 11,
    PotentialBoreRate: 17
  },
  {
    TreeNum: 12,
    PotentialBoreRate: 22
  },
  {
    TreeNum: 13,
    PotentialBoreRate: 7
  },
  {
    TreeNum: 14,
    PotentialBoreRate: 6
  }
];

let orchardData = [];

function downloadData() {
    let csv =
      "data:text/csv;charset=utf-8," +
      'Epochtime, 1576475402, HoboID, "454-788", Humidity, 7, LeafWetness, 9, Rainfall, 23, SoilMoisture, 43, SolarRadiation, 343413, Temperature: 92, Wind, 4' +
      'Epochtime, 1576475403, HoboID, "454-788", Humidity, 9, LeafWetness, 4, Rainfall, 83, SoilMoisture, 63, SolarRadiation, 341233, Temperature: 12, Wind, 1' +
      'Epochtime, 1576475404, HoboID, "454-788", Humidity, 7, LeafWetness, 2, Rainfall, 53, SoilMoisture, 43, SolarRadiation, 343413, Temperature: 42, Wind, 4' +
      'Epochtime, 1576475405, HoboID, "454-788", Humidity, 6, LeafWetness, 9, Rainfall, 73, SoilMoisture, 13, SolarRadiation, 344412, Temperature: 52, Wind, 7' +
      'Epochtime, 1576475406, HoboID, "454-789", Humidity, 1, LeafWetness, 9, Rainfall, 73, SoilMoisture, 33, SolarRadiation, 351411, Temperature: 72, Wind, 6' +
      'Epochtime, 1576475407, HoboID, "454-789", Humidity, 2, LeafWetness, 5, Rainfall, 33, SoilMoisture, 63, SolarRadiation, 332133, Temperature: 92, Wind, 3';
    return encodeURI(csv);
}

class SelectDataType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataType: "Hobonet Data"
    };
    
    this.handleSelect = this.handleSelect.bind(this);
  }
  
  handleSelect(e) {
    this.setState({ dataType: e.target.value });
  }
  
  render() {
    return (
      <div>
        <select onChange={this.handleSelect}>
          <option value="Hobonet Data"> Hobonet Data </option>
          <option value="Apple Growth Rates"> Apple Growth Rates </option>
          <option value="Potential Fruit Bore Per Tree"> Potential Fruit Bore Per Tree </option>
          <option value="Orchard Data"> Orchard Data </option>
        </select>
        {this.state.dataType === "Hobonet Data" && 
          <h1>HoboNet Data</h1>
        }
        {this.state.dataType === "Apple Growth Rates" &&
          <h1>Apple Growth Rates</h1>
        }
        {this.state.dataType === "Potential Fruit Bore Per Tree" && 
          <h1>Potential Fruit Bore Per Tree</h1>
        }
        {this.state.dataType === "Orchard Data" && 
          <h1>Orchard Data</h1>
        }
        <hr />
        <CustomTable y={this.state} />
        <Button block href={downloadData()} download="data.csv">
          Download
        </Button>
        {this.state.dataType === "Orchard Data" && 
          <Button block href="/uploaddata">
            Upload Orchard Data
          </Button>
        }
        <Container>
          <hr />
          <h1>Visualize</h1>
          <hr />
          {this.state.dataType === "Hobonet Data" &&
            <SelectHobo />
          }
          {this.state.dataType === "Apple Growth Rates" &&
            <SelectGrowthRates />
          }
          {this.state.dataType === "Potential Fruit Bore Per Tree" && 
            <SelectFruitBore />
          }
          {this.state.dataType === "Orchard Data" && 
            <SelectOrchardData />
          }
        </Container>
      </div>
    );
  }
}

function CustomTable(props) {
  if (props.y.dataType === "Hobonet Data") {
    const page = (
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
          {hoboData.map((dataInfo, index)=> {
            return <tr key={index}>
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
    );
    return page;
  } else if (props.y.dataType === "Apple Growth Rates") {
    const page = (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tree Number</th>
            <th>ClusterID</th>
            <th>Apple #1 Growth Rate (cm/day)</th>
            <th>Apple #2 Growth Rate (cm/day)</th>
            <th>Apple #3 Growth Rate (cm/day)</th>
            <th>Apple #4 Growth Rate (cm/day)</th>
            <th>Apple #5 Growth Rate (cm/day)</th>
            <th>Apple #6 Growth Rate (cm/day)</th>
          </tr>
        </thead>
        <tbody>
          {appleData.map((dataInfo, index)=> {
            return <tr key={index}>
              <td>{dataInfo.TreeNum}</td>
              <td>{dataInfo.ClusterID}</td>
              <td>{dataInfo.AppleGrowthRates[0]}</td>
              <td>{dataInfo.AppleGrowthRates[1]}</td>
              <td>{dataInfo.AppleGrowthRates[2]}</td>
              <td>{dataInfo.AppleGrowthRates[3]}</td>
              <td>{dataInfo.AppleGrowthRates[4]}</td>
              <td>{dataInfo.AppleGrowthRates[5]}</td>
            </tr>
          })}
        </tbody>
      </Table>
    );
    return page;
  } else if (props.y.dataType === "Potential Fruit Bore Per Tree") {
    const page = (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tree Number</th>
            <th>Potential Bore (apples)</th>
          </tr>
        </thead>
        <tbody>
          {treeData.map((dataInfo, index)=> {
            return <tr key={index}>
              <td>{dataInfo.TreeNum}</td>
              <td>{dataInfo.PotentialBoreRate}</td>
            </tr>
          })}
        </tbody>
      </Table>
    );
    return page;
  } else {
    const page = (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>OrchardID</th>
            <th>Orchard Name</th>
            <th>Location</th>
            <th>Target Fruit Per Tree</th>
            <th>Average Number of Clusters</th>
            <th>Potential Fruit Bore Per Tree</th>
          </tr>
        </thead>
        <tbody>
          {orchardData.map((dataInfo, index)=> {
            return <tr key={index}>
              <td>{dataInfo.orchardid}</td>
              <td>{dataInfo.name}</td>
              <td>{dataInfo.location}</td>
              <td>{dataInfo.targetfruitpertree}</td>
              <td>{dataInfo.averagenumberclusters}</td>
              <td>{dataInfo.potentialfruitpertree}</td>
            </tr>
          })}
        </tbody>
      </Table>
    );
    return page;
  }
}

class SelectHobo extends React.Component {
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
    for (let i = 0; i < hoboData.length; i++) {
      if (hoboData[i].HoboID === h) {
        newdata.push(hoboData[i]);
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
        <HoboGraph y={this.state} />
        {/*{this.table(this.state)}*/}
      </div>
    );
  }
}

function HoboGraph(props) {
  if (props.y.chartType === "Line") {
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
  } else if (props.y.chartType === "Bar"){
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
  } else if (props.y.chartType === "Scatter"){
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
  } else if (props.y.chartType === "Pie"){
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

class SelectGrowthRates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cluster: "219-18",
      sdata: this.sortData("219-18"),
      chartType: "Line"
    };

    this.handleSelectCluster = this.handleSelectCluster.bind(this);
    this.handleSelectChartType = this.handleSelectChartType.bind(this);

    this.sortData = this.sortData.bind(this);
  }
  
  handleSelectCluster(e) {
    this.setState({ cluster: e.target.value });
    this.setState({ sdata: this.sortData(e.target.value) });
  }
  handleSelectChartType(e) {
  	this.setState({ chartType: e.target.value});
  }
  sortData(c) {
    let newdata = [];
    for (let i = 0; i < appleData.length; i++) {
      if (appleData[i].ClusterID === c) {
        for (let z = 0; z < appleData[i].AppleGrowthRates.length; z++) {
          let temp = {
            x: z, 
            y: appleData[i].AppleGrowthRates[z]
          };
          newdata.push(temp);
        }
      }
    }
    return newdata;
  }
  
  render() {
    return (
      <div>
        <select onChange={this.handleSelectCluster}>
          <option value="219-18"> 219-18 </option>
          <option value="261-25"> 261-25 </option>
          <option value="162-12"> 162-12 </option>
          <option value="54-39"> 54-39 </option>
          <option value="73-27"> 73-27 </option>
          <option value="201-17"> 201-17 </option>
          <option value="17-20"> 17-20 </option>
          <option value="59-30"> 59-30 </option>
          <option value="76-12"> 76-12 </option>
          <option value="109-39"> 109-39 </option>
        </select>
        <select onChange={this.handleSelectChartType}>
          <option value="Line"> Line </option>
          <option value="Bar"> Bar </option>
          <option value="Scatter"> Scatter </option>
          <option value="Pie"> Pie </option>
          <option value="Area"> Area </option>
        </select>
        <AppleGraph y={this.state} />
        {/*{this.table(this.state)}*/}
      </div>
    );
  }
}

function AppleGraph(props) {
  if (props.y.chartType === "Line") {
  	const page = (
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryLabel text={"ClusterID: " + props.y.cluster} x={50} y={30} textAnchor="inherit" />
        <VictoryLabel text="Time" x={410} y={270} textAnchor="middle" />
        <VictoryLine data={props.y.sdata} 
          animate={{duration: 2000, onLoad: { duration: 1000 }}}/>
        <VictoryAxis tickFormat={() => ""} />
        <VictoryAxis dependentAxis />
      </VictoryChart>
    );
    return page;
  } else if (props.y.chartType === "Bar"){
    const page = (
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryLabel text={"ClusterID: " + props.y.cluster} x={50} y={30} textAnchor="inherit" />
        <VictoryLabel text="Time" x={410} y={270} textAnchor="middle" />
        <VictoryBar data={props.y.sdata} style={{ data: { fill: "#c43a31" } }} 
          animate={{duration: 2000, onLoad: { duration: 1000 }}} />
        <VictoryAxis tickFormat={() => ""} />
        <VictoryAxis dependentAxis />
      </VictoryChart>
    );
    return page;
  } else if (props.y.chartType === "Scatter"){
    const page = (
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryLabel text={"ClusterID: " + props.y.cluster} x={50} y={30} textAnchor="inherit" />
        <VictoryLabel text="Time" x={410} y={270} textAnchor="middle" />
        <VictoryScatter data={props.y.sdata} />
        <VictoryAxis tickFormat={() => ""} />
        <VictoryAxis dependentAxis />
      </VictoryChart>
    );
    return page;
  } else if (props.y.chartType === "Pie"){
    const page = (
      <VictoryPie colorScale={["tomato", "orange", "cyan", "navy" ]} data={props.y.sdata} />
    );
    return page;
  } else {
  	const page = (
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryLabel text={"ClusterID: " + props.y.cluster} x={50} y={30} textAnchor="inherit" />
        <VictoryLabel text="Time" x={410} y={270} textAnchor="middle" />
        <VictoryArea data={props.y.sdata} style={{ data: { fill: "#c43a31" } }} 
          animate={{duration: 2000, onLoad: { duration: 1000 }}} />
        <VictoryAxis tickFormat={() => ""} />
        <VictoryAxis dependentAxis />
      </VictoryChart>
    );
    return page;
  }
}

class SelectFruitBore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sdata: this.sortData(),
      chartType: "Line"
    };

    this.handleSelectChartType = this.handleSelectChartType.bind(this);
    this.sortData = this.sortData.bind(this);
  }
  
  handleSelectChartType(e) {
  	this.setState({ chartType: e.target.value});
  }
  
  sortData(c) {
    let newdata = [];
    for (let i = 0; i < treeData.length; i++) {
          let temp = {
            x: i,
            y: treeData[i].PotentialBoreRate
          };
          newdata.push(temp);
    }
    return newdata;
  }
  
  render() {
    return (
      <div>
        <select onChange={this.handleSelectChartType}>
          <option value="Line"> Line </option>
          <option value="Bar"> Bar </option>
          <option value="Scatter"> Scatter </option>
          <option value="Pie"> Pie </option>
          <option value="Area"> Area </option>
        </select>
        <BoreRateGraph y={this.state} />
        {/*{this.table(this.state)}*/}
      </div>
    );
  }
}

function BoreRateGraph(props) {
  if (props.y.chartType === "Line") {
  	const page = (
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryLabel text="Potential Fruit Bore Per Tree" x={50} y={30} textAnchor="inherit" />
        <VictoryLabel text="Time" x={410} y={270} textAnchor="middle" />
        <VictoryLine data={props.y.sdata} 
          animate={{duration: 2000, onLoad: { duration: 1000 }}}/>
        <VictoryAxis tickFormat={() => ""} />
        <VictoryAxis dependentAxis />
      </VictoryChart>
    );
    return page;
  } else if (props.y.chartType === "Bar"){
    const page = (
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryLabel text="Potential Fruit Bore Per Tree" x={50} y={30} textAnchor="inherit" />
        <VictoryLabel text="Time" x={410} y={270} textAnchor="middle" />
        <VictoryBar data={props.y.sdata} style={{ data: { fill: "#c43a31" } }} 
          animate={{duration: 2000, onLoad: { duration: 1000 }}} />
        <VictoryAxis tickFormat={() => ""} />
        <VictoryAxis dependentAxis />
      </VictoryChart>
    );
    return page;
  } else if (props.y.chartType === "Scatter"){
    const page = (
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryLabel text="Potential Fruit Bore Per Tree" x={50} y={30} textAnchor="inherit" />
        <VictoryLabel text="Time" x={410} y={270} textAnchor="middle" />
        <VictoryScatter data={props.y.sdata} />
        <VictoryAxis tickFormat={() => ""} />
        <VictoryAxis dependentAxis />
      </VictoryChart>
    );
    return page;
  } else if (props.y.chartType === "Pie"){
    const page = (
      <VictoryPie colorScale={["tomato", "orange", "cyan", "navy" ]} data={props.y.sdata} />
    );
    return page;
  } else {
  	const page = (
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryLabel text="Potential Fruit Bore Per Tree" x={50} y={30} textAnchor="inherit" />
        <VictoryLabel text="Time" x={410} y={270} textAnchor="middle" />
        <VictoryArea data={props.y.sdata} style={{ data: { fill: "#c43a31" } }} 
          animate={{duration: 2000, onLoad: { duration: 1000 }}} />
        <VictoryAxis tickFormat={() => ""} />
        <VictoryAxis dependentAxis />
      </VictoryChart>
    );
    return page;
  }
}

class SelectOrchardData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "Target Fruit Per Tree",
      sdata: this.sortData("Target Fruit Per Tree"),
      chartType: "Line"
    };

    this.handleSelectCategory = this.handleSelectCategory.bind(this);
    this.handleSelectChartType = this.handleSelectChartType.bind(this);

    this.sortData = this.sortData.bind(this);
  }
  
  handleSelectCategory(e) {
    this.setState({ category: e.target.value });
    this.setState({ sdata: this.sortData(e.target.value) });
  }
  handleSelectChartType(e) {
  	this.setState({ chartType: e.target.value});
  }
  sortData(c) {
    let newdata = [];
    for (let i = 0; i < orchardData.length; i++) {
      if (c === "Target Fruit Per Tree") {
        let temp = {
          x: i, 
          y: orchardData[i].targetfruitpertree
        };
        newdata.push(temp);
      } else if (c === "Average Number of Clusters") {
        let temp = {
          x: i, 
          y: orchardData[i].averagenumberclusters
        };
        newdata.push(temp);
      } else {
        let temp = {
          x: i, 
          y: orchardData[i].potentialfruitpertree
        };
        newdata.push(temp);
      }
    }
    return newdata;
  }
  
  render() {
    return (
      <div>
        <select onChange={this.handleSelectCategory}>
          <option value="Target Fruit Per Tree"> Target Fruit Per Tree </option>
          <option value="Average Number of Clusters"> Average Number of Clusters </option>
          <option value="Potential Fruit Bore Per Tree"> Potential Fruit Bore Per Tree </option>
        </select>
        <select onChange={this.handleSelectChartType}>
          <option value="Line"> Line </option>
          <option value="Bar"> Bar </option>
          <option value="Scatter"> Scatter </option>
          <option value="Pie"> Pie </option>
          <option value="Area"> Area </option>
        </select>
        <OrchardGraph y={this.state} />
        {/*{this.table(this.state)}*/}
      </div>
    );
  }
}

function OrchardGraph(props) {
  if (props.y.chartType === "Line") {
  	const page = (
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryLabel text={props.y.category} x={50} y={30} textAnchor="inherit" />
        <VictoryLabel text="Time" x={410} y={270} textAnchor="middle" />
        <VictoryLine data={props.y.sdata} 
          animate={{duration: 2000, onLoad: { duration: 1000 }}}/>
        <VictoryAxis tickFormat={() => ""} />
        <VictoryAxis dependentAxis />
      </VictoryChart>
    );
    return page;
  } else if (props.y.chartType === "Bar"){
    const page = (
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryLabel text={props.y.category} x={50} y={30} textAnchor="inherit" />
        <VictoryLabel text="Time" x={410} y={270} textAnchor="middle" />
        <VictoryBar data={props.y.sdata} style={{ data: { fill: "#c43a31" } }} 
          animate={{duration: 2000, onLoad: { duration: 1000 }}} />
        <VictoryAxis tickFormat={() => ""} />
        <VictoryAxis dependentAxis />
      </VictoryChart>
    );
    return page;
  } else if (props.y.chartType === "Scatter"){
    const page = (
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryLabel text={props.y.category} x={50} y={30} textAnchor="inherit" />
        <VictoryLabel text="Time" x={410} y={270} textAnchor="middle" />
        <VictoryScatter data={props.y.sdata} />
        <VictoryAxis tickFormat={() => ""} />
        <VictoryAxis dependentAxis />
      </VictoryChart>
    );
    return page;
  } else if (props.y.chartType === "Pie"){
    const page = (
      <VictoryPie colorScale={["tomato", "orange", "cyan", "navy" ]} data={props.y.sdata} />
    );
    return page;
  } else {
  	const page = (
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryLabel text={props.y.category} x={50} y={30} textAnchor="inherit" />
        <VictoryLabel text="Time" x={410} y={270} textAnchor="middle" />
        <VictoryArea data={props.y.sdata} style={{ data: { fill: "#c43a31" } }} 
          animate={{duration: 2000, onLoad: { duration: 1000 }}} />
        <VictoryAxis tickFormat={() => ""} />
        <VictoryAxis dependentAxis />
      </VictoryChart>
    );
    return page;
  }
}

export default function Data() {
  const [data, setData] = useState({orchards: [], isFetching: false});
  useEffect(() => {
        const fetchOrchards = async () => {
            try {
                setData({orchards: data.orchards, isFetching: true});
                fetch("https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/orchards")
                  .then(response => response.json())
                  .then(result => {
                    setData({orchards: result.map(content => ({
                      orchardid: content.orchardid,
                      name: content.name,
                      location: content.location,
                      targetfruitpertree: content.targetfruitpertree,
                      averagenumberclusters: content.averagenumberclusters,
                      potentialfruitpertree: content.potentialfruitpertree,
                    })), isFetching: false})
                })
                .catch(e => {
                    console.log(e);
                    setData({orchards: data.orchards, isFetching: false});
                });
            } catch (e) {
                console.log(e);
                setData({orchards: data.orchards, isFetching: false});
            }
        };
        fetchOrchards();
    }, []);
  orchardData = data.orchards;
  return (
    <div>
      <Container className="Title">
        <SelectDataType />
      </Container>
    </div>
  );
}