import React from 'react';
import {ClassDisp} from "./Classifier_Disp";
import "./classPopQ";
import ClassPopQ from "./classPopQ";

class AskAI extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            title: "Object Title",
            show: false,
            avatar: "https://ballparkdigest.com/wp-content/uploads/2018/11/Rocky-Mountain-Vibes-300x300.jpg",
            desc: "Hello I'm testing the first line,\n" +
                "                                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac\n" +
                "                                        consectetur ac, vestibulum at eros.Cras mattis consectetur purus sit amet fermentum. Cras justo odio,\n" +
                "                                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac\n" +
                "                                        consectetur ac, vestibulum at eros.Cras mattis consectetur purus sit amet fermentum. Cras justo odio,\n" +
                "                                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta alcapone\n" +
                "                                        consectetur ac, vestibulum at eros"
        };

        this.setModalShow = this.setModalShow.bind(this);
    }

    setModalShow(newShow){
        this.setState({
            ...this.state,
            show: newShow
        });
        console.log(this.state);

    }

    render(){
        return(
            <div>
                <ClassPopQ key={this.state.show} imgSrc = {this.state.avatar} desc = {this.state.desc}  title = {this.state.title} show={this.state.show} onHide={() => this.setModalShow(false)} />
                <ClassDisp imgSrc = {this.state.avatar} title = {this.state.title} desc = {this.state.desc} onClick = {() => this.setModalShow(true)} />
            </div>
        );
    }

}

export default AskAI;
