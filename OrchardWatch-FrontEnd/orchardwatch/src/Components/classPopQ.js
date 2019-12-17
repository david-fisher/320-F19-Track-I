import React from "react";
import PropTypes from 'prop-types';
import {Modal, Button, ButtonToolbar, Image} from "react-bootstrap";
import camGraphic from './PrettyEricGraphics/classificationUpload.png';
import "./classModal.css"


// We are ""
function MyVerticallyCenteredModal(props) {
    console.log(props);
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className = "modalBase"
        >
            <Modal.Header className = "modHead">
                <Modal.Title className = "modTitle" style={{alignContent: 'center'}} id="contained-modal-title-vcenter">
                    {
                        props.title
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className= "imgWrappers">
                <Image className="classAvatar"  src={props.imgSrc} alt="Card image cap"/>

                <div className= "button" primary = {false} onClick={(e)=>{props.openFilePicker(e)}}>
                    <Image className="uploadBase"   src={props.imgPreview || camGraphic} />
                </div>

                <input type='file' id = 'filePicker'
                       onChange={(e) => props.upload(e)}
                       accept="image/*"
                       style={{display: "none"}} />
            </div>

                <h4>Centered Modal</h4>
                <p>
                    {props.desc}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

class ClassPopQ extends React.Component {

    constructor(props){
        super(props);
        this.openFilePicker = (e) => this.onOpenFilePicker(e);
        this.handleClick = (e) =>  this.onChangeFile(e);
        this.state = {
            imgSrc: props.imgSrc,
            desc: props.desc,
            onHide: props.onHide,
            title: props.title,
            imgPreview: null
        }
    }

    onOpenFilePicker(e) {
        e.stopPropagation();
        e.preventDefault();
        // Can possible use React refs
        const picker = document.getElementById('filePicker');
        picker.click();
    }

    onChangeFile(e) {
        e.stopPropagation();
        e.preventDefault();
        let file = e.target.files[0];
        console.log(file);
        this.setState({
            imgPreview: URL.createObjectURL(file)
        }); /// if you want to upload latter
    }
    render() {

        return (
            <ButtonToolbar>
                <MyVerticallyCenteredModal
                    imgSrc ={this.state.imgSrc}
                    imgPreview = {this.state.imgPreview}
                    show   ={this.props.show}
                    onHide ={this.state.onHide}
                    title  ={this.state.title}
                    desc   ={this.state.desc}
                    upload ={this.handleClick}
                    openFilePicker = {this.openFilePicker}
                />
            </ButtonToolbar>
        );

    }

}

ClassPopQ.propTypes= {
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
}
export default ClassPopQ;
