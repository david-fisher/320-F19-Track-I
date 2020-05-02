import React, { useState } from "react";
import {
    Button,
    Col,
    FormControl,
    FormGroup,
    FormLabel,
    Row
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./AddAnnouncement.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import SuccessModal from "../../components/SuccessModal/SuccessModal";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const email = cookies.get("email");

var dateSendTemp = new Date();
var dateSend = (dateSendTemp.getMonth()+1) + '-' + dateSendTemp.getDate() + '-' + dateSendTemp.getFullYear() + ' '+ dateSendTemp.getHours()%12 +':'+ dateSendTemp.getMinutes();

export default function AddAnnouncement() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [modalShow, setModalShow] = React.useState(false);

    function validateForm() {
        return (
            email.length > 0
        );
    }

    function handleSubmit(event) {
        event.preventDefault();
        fetch(
            "https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/announcements/",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "title": title,
                    "description": description,
                    "date": dateSend,
                    "email": email
                })
            }
        )
            .then(response => {
                if (response.status >= 200 && response.status < 300) {

                    return response.json();
                } else {
                    throw new Error();
                }
            })
            .then(json => {
                console.log(json);
                setModalShow(true);

            })
            .catch(error => {
                alert("Failed to post announcement, please try again.");
            });
    }

        return (
            <Row>
            <Col md={{ span: 6, offset: 3 }}>
    <div className="" style={{ marginTop: "60px" }}>
    <form onSubmit={handleSubmit}>
        <Row>
        <FormGroup as={Col} controlId="Title">
            <FormLabel>Title</FormLabel>
        <FormControl
        autoFocus
        type="Title"
        onChange={e => setTitle(e.target.value)}
        placeholder = "Free Apples For Everyone!"
        />
        </FormGroup>
        </Row>
        <Row>
        <FormGroup as={Col} controlId="Announcement Description">
            <FormLabel>Announcement Description</FormLabel>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"
        autoFocus
        type="Announcement Description"
        onChange={e => setDescription(e.target.value)}
        placeholder = "Super Interesting Orchard Event! Bring your family, bring your friends! Free apples!!!!"
        />
        </FormGroup>
            </Row>
            <Button block disabled={!validateForm()} type="submit">
            Post Announcement
        </Button>
        </form>
        </div>
        </Col>
        <SuccessModal
        show={modalShow}
        onHide={() => {
            setModalShow(false);
            window.location.reload();
        }}
        />
        </Row>
    );
}