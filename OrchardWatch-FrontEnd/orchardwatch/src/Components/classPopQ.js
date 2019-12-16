import React from "react";
import PropTypes from 'prop-types';
import {Modal, Button, ButtonToolbar, Image} from "react-bootstrap";
import "./classModal.css"
import camGraphic from "./PrettyEricGraphics/classificationUpload.png";


function MyVerticallyCenteredModal(props) {
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
                <div className= "button">
                    <input type='file'   onChange={props.onChange} />
                </div>
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
        this.state = {
            imgSrc: props.imgSrc,
            desc: props.desc,
            onHide: props.onHide,
            title: props.title,
            show: props.show
        }
    }


    render() {

        return (
            <ButtonToolbar>
                <MyVerticallyCenteredModal
                    imgSrc={this.state.imgSrc}
                    show={this.state.show}
                    onHide={this.state.onHide}
                    title={this.state.title}
                    desc = {this.state.desc}
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