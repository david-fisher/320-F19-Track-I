import React from "react";
import PropTypes from 'prop-types';
import {Modal, Button, ButtonToolbar, Image, FormControl, Form, Dropdown, DropdownButton, InputGroup} from "react-bootstrap";
import camGraphic from './PrettyEricGraphics/newClassificationUpload.png';
import confGraphic from './PrettyEricGraphics/pictureCheck.png';
import "./classModal.css"
import newIcon from "./PrettyEricGraphics/NewClassIcon.png"


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
                    Upload A New Classifier
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className= "imgWrappers">
                    <Image className="classAvatar"  src={props.imgPreview || newIcon} alt="Card image cap"/>

                    <div className= "button" primary = {false} onClick={(e)=>{props.openFilePicker(e)}} hidden={props.imgPreview}>
                        <Image className="uploadBase"   src={props.imgPreview? (confGraphic):(camGraphic)} />
                    </div>

                    <input type='file' id = 'filePicker'
                           onChange={(e) => props.upload(e)}
                           accept="image/*"
                           style={{display: "none"}} />
                </div>

                <h4>New Classifier Title</h4>
                <div className= "classForm">
                <InputGroup>
                    <FormControl
                        placeholder=""
                        aria-describedby="basic-addon2"
                    />

                    <DropdownButton
                        as={InputGroup.Append}
                        variant="outline-secondary"
                        title="File Extension"
                        id="input-group-dropdown-2"
                    >
                        <Dropdown.Item href="#">Action</Dropdown.Item>
                        <Dropdown.Item href="#">Another action</Dropdown.Item>
                        <Dropdown.Item href="#">Something else here</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#">Separated link</Dropdown.Item>
                    </DropdownButton>

                </InputGroup>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Classifer Description</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl as="textarea" aria-label="Classifer Description" />
                </InputGroup>
                </div>
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