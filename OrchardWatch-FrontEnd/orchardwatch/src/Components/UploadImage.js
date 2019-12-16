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
  }

  render() {
    return (
      <div>
        <h3>Upload an Image</h3>
        <br></br>
        <ImageUploader
          withIcon={true}
          buttonText='Choose Images'
          onChange={this.onDrop}
          imgExtension={['.jpg', '.gif', '.png']}
          maxFileSize={5242880}
        />
      </div>
    );
  }
}

export default UploadImage;
