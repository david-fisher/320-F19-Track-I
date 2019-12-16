import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import ImageUploader from "react-images-upload";

class UploadImage extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    //put lambda call here
    //token is under this.props.token
    fetch(
      "https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/Frontend-Lambda/picture/account_upload_picture/",
      {
        method: "PUT",
        body: JSON.stringify({ token: this.props.token, image: picture })
      }
    )
      .then(response => {
        return response.json();
      }) 
      .then(result => {
        console.log(result);
      })
  }

  render() {
    return (
      <div>
        <h3>Upload an Image</h3>
        <ImageUploader
          withIcon={true}
          buttonText='Choose Images'
          onChange={this.onDrop}
          imgExtension={['.jpg', '.gif', '.png']}
          maxFileSize={5242880}
        />
        <br></br>
      </div>
    );
  }
}

export default UploadImage;
