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


let IMAGES = [url1, url3, url5, url6, url7, url4, url8, url9, url10, url2];

class ImageGallery extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.processImages = this.processImages.bind(this);
  }

  /*
    Takes in an array of image URLs, processes it into a format which the library can use
    @input parameters: url, an array of image URLs (strings) that is to be processed
    @output parameters: images, an array of image objects that react-grid-gallery can use
    */
  processImages(url) {
    let imageArr = [];
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

  render() {
    let imageArr = [];
    imageArr = this.processImages(IMAGES);
    let editGallery = <div></div>;
    if (this.props.user === "grower" || this.props.user === "researcher") {
      editGallery = (
        <div>
          <Button>Add Images</Button>
          <Button>Remove Images</Button>
          <br></br>
          <br></br>
        </div>
      );
    }
    return (
      <div>
        <div className="gallery">
          <Row>
            <Col md="2" />
            <Col>
              {editGallery}
              <Gallery images={imageArr} />
            </Col>
            <Col md="2" />
          </Row>
        </div>
      </div>
    );
  }
}
export default ImageGallery;
