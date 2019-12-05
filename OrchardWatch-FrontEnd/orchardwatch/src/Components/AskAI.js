import React from 'react';
import {ClassDisp} from "./Classifier_Disp";
import "./classPopQ";
import ClassPopQ from "./classPopQ";

class AskAI extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            show: false
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
                <ClassPopQ key={this.state.show} show={this.state.show} onHide={() => this.setModalShow(false)} />
                <ClassDisp onClick = {() => this.setModalShow(true)} />
            </div>
        );
    }

}

export default AskAI;
