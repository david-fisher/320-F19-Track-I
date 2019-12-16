import React from "react";
import PropTypes from 'prop-types';
import {Modal, Button, ButtonToolbar, Image} from "react-bootstrap";
import "./classModal.css"
function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title style={{alignContent: 'center'}} id="contained-modal-title-vcenter">
                    {
                        props.title
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className= "imgWrappers">
                <Image className="avatar"  src={props.imgSrc} alt="Card image cap"/>
                <Image className="avatar2"  src={props.imgSrc} alt="Card image cap"/>
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