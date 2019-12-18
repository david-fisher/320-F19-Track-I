import React from 'react';
import ReactDom from 'react-dom';
import {Button} from "react-bootstrap";
import "../App.css";

class Annotations extends React.Component
{
    constructor(props) {
        super(props);

        };
    handleClick() {
        //Literally just leave this place.
        window.location.assign('http://www.robots.ox.ac.uk/~vgg/software/via/via.html');
    }

    render(){

        return(

            <div>

                <body className="instructions">
                <p> Click [Project > Add Local Files] in the top menu bar to load a set of images that you wish to annotate. </p>
                <p> Press n and p (or left and right arrow keys) to navigate through the loaded images. You can also use the ← and → icons in the top panel toolbar for navigation.</p>
                <p> Select images you want to annotate. (Select all: On Mac: Command + A, On Windows: Ctrl + A, Individually select multiple files: On Mac: Command + Right Click, On Window</p>
                <p> You can add more region attributes according to your needs.</p>
                <p> In the Region Shape section in the left panel, click the rectangular shape</p>
                <p> On the image area, keep pressing the right-click button as you drag the mouse cursor. This will draw a rectangular region on the image.</p>
                <p> This newly created region is automatically selected. Now you can enter the attribute value for this region in the bottom panel. For example:</p>
                <p> object_name = dog</p>
                <p> object_color = white</p>
                <p> You can annotate multiple regions in this image or other images and assign a value to each pre-defined attribute.</p>
                <p> To download the annotated region data, click [Annotation > Save as JSON] in the top menu bar. This will download a text file containing region shape and attribute data.</p>
                <p> Next time, you can start from the point you left by first loading the images and then importing the JSON file (downloaded in step 7) by clicking [Annotation > Import].</p>
            </body>



            <Button className = "colorButton" onClick={this.handleClick.bind(this) }>Begin!</Button>
            </div>
        )

    }
}

export default Annotations;