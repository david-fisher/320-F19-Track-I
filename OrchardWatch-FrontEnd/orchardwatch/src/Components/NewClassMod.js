import React from "react";
import PropTypes from 'prop-types';
import {Modal, Button, ButtonToolbar, Image, FormControl, Form, Dropdown, DropdownButton, InputGroup, Input} from "react-bootstrap";
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
                        controlId = "className"
                        onChange = {(e) => props.handleTitleChange(e)}
                    />
                    <DropdownButton
                        as={InputGroup.Append}
                        variant="outline-secondary"
                        title="File Extension"
                        id="input-group-dropdown-2"
                    >
                        <Dropdown.Item href="#">.py</Dropdown.Item>
                        <Dropdown.Item href="#">.h5</Dropdown.Item>
                    </DropdownButton>

                </InputGroup>
                <div className="input-group mb-3">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="inputGroupFile01" onChange={(e) => props.handleModelUpload(e)} ></input>
                        <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                    </div>
                </div>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Classifer Description</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl as="textarea" controlId="classiferDescription" onChange={(e) => props.handleDescChange(e)} />
                </InputGroup>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={e => props.submitClass(e)}> Submit </Button>
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
        this.modelUpload = this.modelUpload.bind(this)
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.submitClass = this.submitClass.bind(this);
        this.state = {
            file: null,
            fileName: null,
            imgSrc: props.imgSrc,
            desc: props.desc,
            onHide: props.onHide,
            title: props.title,
            imgPreview: null
        }
    }
    stopBreaking(e)
    {
        e.stopPropagation();
        e.preventDefault();
    }

    onOpenFilePicker(e) {
        this.stopBreaking(e)
        const picker = document.getElementById('filePicker');
        picker.click();
    }
    handleDescChange(e){
        this.stopBreaking(e)
        this.setState({desc: e.target.value});
    }

    handleTitleChange(e){
        this.stopBreaking(e)
        this.setState({title: e.target.value});
        ///console.log(this.state.title);
    }
    submitClass(e){
        this.stopBreaking(e)
        console.log(this.state.title);
        console.log(this.state.desc);
    }
    modelUpload(e){

    }

    onChangeFile(e) {
        this.stopBreaking(e)
        let file = e.target.files[0];
        console.log(file);
        this.setState({
            imgPreview: URL.createObjectURL(file)
        });
    }
    render() {

        return (
            <ButtonToolbar>
                <MyVerticallyCenteredModal
                    imgSrc ={this.state.imgSrc}
                    imgPreview ={this.state.imgPreview}
                    show   ={this.props.show}
                    onHide ={this.state.onHide}
                    title  ={this.state.title}
                    desc   ={this.state.desc}
                    upload ={this.handleClick}
                    handleModelUpload = {this.modelUpload}
                    openFilePicker = {this.openFilePicker}
                    handleDescChange = {this.handleDescChange}
                    handleTitleChange = {this.handleTitleChange}
                    submitClass = {this.submitClass}
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