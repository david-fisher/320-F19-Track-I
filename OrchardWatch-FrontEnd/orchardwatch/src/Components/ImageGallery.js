import React from "react";
import Gallery from "react-grid-gallery";
import url1 from "./low-level-images/burningtree.jpg";
import url2 from "./low-level-images/sans_fisher.png";
import url3 from "./low-level-images/toopowerful.png";
import url4 from "./low-level-images/fisherpick.png";
import url5 from "./low-level-images/apples1.jpg";
import url6 from "./low-level-images/apple2.png";
import url7 from "./low-level-images/apples3.jpg";
import url8 from "./low-level-images/HOBO1.jpeg";
import url9 from "./low-level-images/weliveinasociety.jpg";
import url10 from "./low-level-images/placehold.jpg";
import { Col, Row, Button } from "react-bootstrap";
import UploadImage from "./UploadImage";
import ReactImageUploadComponent from "react-images-upload";
import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "file-saver";


let IMAGES = [url1, url3, url5, url6, url7, url4, url8, url9, url10, url2];

class ImageGallery extends React.Component {
  constructor() {
    super();
    this.state = { page: "" };
    this.processImages = this.processImages.bind(this);
  }

  /*
    Takes in an array of image URLs, processes it into a format which the library can use
    @input parameters: url, an array of image URLs (strings) that is to be processed
    @output parameters: images, an array of image objects that react-grid-gallery can use
    */

  processImages(url) {
    let imageArr = [];

    // fetch images here

    for (let i = 0; i < url.length; i++) {
      imageArr.push({
        src: url[i],
        thumbnail: url[i],
        thumbnailWidth: 500,
        thumbnailHeight: 400
      });
    }
    return imageArr;
  }

  componentDidMount() {
    fetch(
      "https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/Frontend-Lambda/ml/dl_unannotated_imgs/",
      {
        method: "GET",
      }
    )
      .then(response => {
        return response.json();
      }) 
      .then(result => {
        let image = "data:image/jpeg;base64," + result.img1;
        this.setState({ image: image });
        console.log(this.state.image);
      })
  }

  render() {
    let imageArr = [];
    imageArr = this.processImages(IMAGES);

    /*
    let editGallery = <div></div>;
    if (this.props.user === "grower" || this.props.user === "researcher") {
      if (this.state.page == "") {
        editGallery = (
          <div>
            <Button onClick={() => this.setState({ page: "Upload" })}>Add Images</Button>
            <Button onClick={() => this.downloadImages()}> Download Images</Button>
            <br></br>
            <br></br>
          </div>
        );
      } else if (this.state.page == "Upload") {
        editGallery = (
          <div>
            <UploadImage
              token={this.props.token}
              dashboard={this.resetPage.bind(this)}
            />
            <br></br>
          </div>
        );
      }
    }
    */

    return (
      <div>
        <div className="gallery">
          <Row>
            <Col md="2" />
            <Col>
              <img src={this.state.image} height="100%" width="40%" />
            </Col>
            <Col md="2" />
          </Row>
          <Row>
            <Col md="2" />
            <Col>
              <Gallery images={imageArr} />
            </Col>
            <Col md="2" />
          </Row>
          <Row>
            <Col md="2" />
            <Col>
              <Button onClick={this.downloadImages(imageArr).then((content) => {saveAs(content, "images.zip")})} >
                Download Images
              </Button>
            </Col>
            <Col md="2" />
          </Row>
        </div>
      </div>
    );
  }

  resetPage() {
    this.setState({ page: "" });
  }

  downloadImages(imgArr){
    let zip = new JSZip();
    imgArr.forEach(element => {
      let url = element.src;
      console.log(url);
      let file = document.getElementById(url);
      zip.file("image", file);
    });
    return zip.generateAsync({ type: "blob" });
  }

}
export default ImageGallery;
