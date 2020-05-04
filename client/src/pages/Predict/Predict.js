import React, { useState } from "react";
import { Container, Button, Jumbotron, Col, FormControl, FormGroup, FormLabel, } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./Predict.css";

function openFileExplorer() {
  document.getElementById("fileInput").click();
}

export default function Predict() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [clusterNum, setClusterNum] = useState("");
  

  function fileChangeHandler(e) {
    setSelectedFile(e.target.files[0]);

    var previewPlaceholder = document.getElementsByClassName("imageContainer");
    previewPlaceholder[0].children[0].classList.add("hiddenFile");
    previewPlaceholder[0].children[1].classList.remove("hiddenFile");

    

    let reader = new FileReader();

    reader.onloadend = () => {
        setImagePreviewUrl(reader.result)
    };

    reader.readAsDataURL(e.target.files[0]);
  }

  function submit(event) {
    console.log(selectedFile);

    var data = new FormData();
    data.append('cluster_img', selectedFile);

    let endpointURL = "https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/ml/cluster/" + clusterNum;
    console.log(endpointURL);

    console.log(data);

    fetch(
      endpointURL,
      {
        method: "POST",
        body: data
      }
    )
    .then(response => {
      response.json().then(json => {
        if (response.status >= 200 && response.status < 300) {
          var clustNum = json["cluster_num"];
          alert("Success! Cluster number: " + clustNum);
        }
        else {
          var error_message = json["error"];
          alert("Error: " + error_message);
        }
      })
      console.log(response.status);
      console.log(response.statusText);

    })
    .catch(error => {
      console.log(error);
    })
    
  }

  return (
    <Container>
      <Container className="jumb">
        <Jumbotron>
          <h1>Predict</h1>
          <hr />
          <p className="lead">
            Upload an image and click the predict button to see if your apple
            may have applescab using the magic of machine learning
          </p>
        </Jumbotron>
      </Container>
      
      <div className="imageContainer" >
        <div className="previewPlaceholder"><h1>Preview</h1></div>
        <img className="hiddenFile previewImage" src={imagePreviewUrl} /> 
      </div>

      <div className="buttonCenter" > 
      <Button onClick={openFileExplorer}>
        Select Image
      </Button>

      <FormGroup controlId="clusterNum" className="clusterNumForm" >
        <FormControl
          autoFocus
          type="firstName"
          value={clusterNum}
          onChange={e => setClusterNum(e.target.value)}
          placeholder="Cluster num."
        />
      </FormGroup>
      </div>

      <div className="buttonCenter">
      <Button onClick={e => submit(e)}>
        Predict
      </Button>
      </div>

      <input className="hiddenFile" id="fileInput" type="file" onChange={e => fileChangeHandler(e)} />
    </Container>
  );
}
