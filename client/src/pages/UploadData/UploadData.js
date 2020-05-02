import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel, Col, Row } from "react-bootstrap";
import "./UploadData.css";

export default function UploadData() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [targetFruitPerTree, setTargetFruitPerTree] = useState("");
  const [averageNumberOfClusters, setAverageNumberOfClusters] = useState("");
  const [potentialFruitPerTree, setPotentialFruitPerTree] = useState("");

  function validateForm() {
    return (
      name.length > 0 &&
      location.length > 0 &&
      targetFruitPerTree.length > 0 &&
      averageNumberOfClusters.length > 0 &&
      potentialFruitPerTree.length > 0
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch(
      "https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/orchards",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "name": name,
          "location": location,
          "targetFruitPerTree": targetFruitPerTree,
          "averageNumberOfClusters": averageNumberOfClusters,
          "potentialFruitPerTree": potentialFruitPerTree
        })
      }
    )
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        alert("You have successfully uploaded the data entry!");
        return response.json();
      } else {
        throw new Error("Server can't be reached!");
      }
    })
    .then(() => {
      document.location.href = "/data";
    })
    .catch(error => {
      alert("Upload failed!");
      console.log(error);
    });
  }
  
  return (
   <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <div className="" style={{ marginTop: "60px" }}>
          <form onSubmit={handleSubmit}>
            <FormGroup as={Col} controlId="name">
              <FormLabel>Orchard Name</FormLabel>
              <FormControl
                autoFocus
				type="name"
				value={name}
				onChange={e => setName(e.target.value)}
              />
            </FormGroup>
			<FormGroup as={Col} controlId="location">
			  <FormLabel>Location</FormLabel>
			  <FormControl
				type="location"
				value={location}
				onChange={e => setLocation(e.target.value)}
			  />
			</FormGroup>
			<FormGroup as={Col} controlId="targetFruitPerTree">
			  <FormLabel>Target Fruit Per Tree (Ex: 12.0)</FormLabel>
			  <FormControl
				type="targetFruitPerTree"
				value={targetFruitPerTree}
				onChange={e => setTargetFruitPerTree(e.target.value)}
			  />
			</FormGroup>
			<FormGroup as={Col} controlId="averageNumberOfClusters">
			  <FormLabel>Average Number of Clusters (Ex: 5.0)</FormLabel>
			  <FormControl
				type="averageNumberOfClusters"
				value={averageNumberOfClusters}
				onChange={e => setAverageNumberOfClusters(e.target.value)}
			  />
			</FormGroup>
			<FormGroup as={Col} controlId="potentialFruitPerTree">
			  <FormLabel>Potential Fruit Bore Per Tree (Ex: 6.0)</FormLabel>
			  <FormControl
				type="potentialFruitPerTree"
				value={potentialFruitPerTree}
				onChange={e => setPotentialFruitPerTree(e.target.value)}
			  />
			</FormGroup>
			<FormGroup>
			  <Button block disabled={!validateForm()} type="submit">
				Upload Data
			  </Button>
			</FormGroup>
          </form>
        </div>
      </Col>
    </Row>
  );
}
