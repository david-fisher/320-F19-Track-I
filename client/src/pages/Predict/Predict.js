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
    }

    reader.readAsDataURL(e.target.files[0])
  }

  function submit(event) {
    console.log(selectedFile);

    const cluster_image = new FormData();
    cluster_image.append('cluster_img', selectedFile);

    let endpointURL = "https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/ml/cluster/" + clusterNum;
    console.log(endpointURL);

    fetch(
      endpointURL,
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data"
        },
        body: cluster_image
      }
    )
    .then(response => {
      console.log(response.status);
    });

    
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

      <FormGroup controlId="clusterNum">
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
