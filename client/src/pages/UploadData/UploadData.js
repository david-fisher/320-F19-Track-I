import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./UploadData.css";

export default function UploadData() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [targetfruitpertree, setTargetFruitPerTree] = useState("");
  const [averagenumberclusters, setAverageNumberClusters] = useState("");
  const [potentialfruitpertree, setPotentialFruitPerTree] = useState("");

  function validateForm() {
    return (
      name.length > 0 &&
      location.length > 0 &&
      targetfruitpertree.length > 0 &&
      averagenumberclusters.length > 0 &&
      potentialfruitpertree.length > 0
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
          name: name,
          location: location,
          targetfruitpertree: targetfruitpertree,
          averagenumberclusters: averagenumberclusters,
          potentialfruitpertree: potentialfruitpertree
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
      document.location.href = "/home";
    })
    .catch(error => {
      alert("Upload failed!");
      console.log(error);
    });
  }
  
  return (
    <div>
      <div className="UploadData">
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="name">
            <FormLabel>Orchard Name</FormLabel>
            <FormControl
              autoFocus
              type="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="location">
            <FormLabel>Location</FormLabel>
            <FormControl
              type="location"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="targetfruitpertree">
            <FormLabel>Target Fruit Per Tree</FormLabel>
            <FormControl
              type="targetfruitpertree"
              value={targetfruitpertree}
              onChange={e => setTargetFruitPerTree(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="averagenumberclusters">
            <FormLabel>Average Number of Clusters</FormLabel>
            <FormControl
              type="averagenumberclusters"
              value={averagenumberclusters}
              onChange={e => setAverageNumberClusters(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="potentialfruitpertree">
            <FormLabel>Potential Fruit Bore Per Tree</FormLabel>
            <FormControl
              type="potentialfruitpertree"
              value={potentialfruitpertree}
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
    </div>
  );
}
