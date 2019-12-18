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
import ImageUploader from "react-images-upload";


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
    /* fetch(
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
        imageArr.push({
          src: image,
          thumbnail: image,
          thumbnailWidth: 500,
          thumbnailHeight: 400,
          nano:image
        })
        console.log(this.state.image);
      }) */
    return imageArr;
  }

  componentDidMount() {

  }

  render() {
    let imageArr = [];
    imageArr = this.processImages(IMAGES);
    //const B64ToImage = ({ text }) => <img src={"${text}"} />;



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
            <div>
              <h3>Upload an Image</h3>
              <input type="file" onChange={() => this.onDrop()}/>
              <br></br>
              //THIS PART RIGHT HERE, HOW DO I GET THIS THING BELOW TO GO BACK WHILE KEEPING UPDATES TO THE GLOBAL VARIABLE IMAGES
              <Button onClick={() => console.log("eat pant")}>Go Back</Button>
              <br></br>
            </div>
            <br></br>
          </div>
        );
      }
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

  resetPage() {
    this.setState({ page: "" });
  }

  onDrop(){
    let preview = document.querySelector('img');
    let file = document.querySelector('input[type=file]').files[0];
    let reader = new FileReader();

    reader.addEventListener("load", function () {
      console.log(reader.result)
      IMAGES.push(reader.result)
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }

  }

  downloadImages(){

  }

}
export default ImageGallery;
