import React from 'react';
import {ClassDisp} from "./Classifier_Disp";
import "./classPopQ";
import ClassPopQ from "./classPopQ";
import Api from '../api';

class AskAI extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            classifiers: [],
            currentModalId: null
        };

        this.setModalShow = this.setModalShow.bind(this);
    }

    setModalShow(isVisible, id) {
        if(!isVisible) {
            this.setState({
                currentModalId: null
            });
            return;
        }

        const classifier = this.state.classifiers.find(x => x.id === id);
        // .find() will be falsey if not found
        if (!classifier) return;

        this.setState({
            currentModalId: classifier.id
        });
    }

    removeClassifier(idToRemove) {
        const newClassifiers = this.state.classifiers.filter(x => x.id !== idToRemove);
        this.setState({
            classifiers: newClassifiers
        });

        Api.setAIClassifiers(newClassifiers);
    }

    componentDidMount() {
        // This should be handled by some state management but it'll do for now
        const classifiers = Api.getAIClassifiers();
        this.setState({
            classifiers
        });
    }

    render(){
        const elements = this.state.classifiers.map(e =>
                <div>
                    <ClassPopQ onHide={() => this.setModalShow(false, e.id)}
                               show={this.state.currentModalId === e.id}
                               key={this.state.show}
                               imgSrc={e.img}
                               title={e.title}
                               desc={e.desc} />
                    <ClassDisp imgSrc={e.img}
                               title={e.title}
                               desc={e.desc}
                               canDelete={this.state.classifiers.length > 1}
                               onClick = {() => this.setModalShow(true, e.id)}
                               onDelete = {() => this.removeClassifier(e.id)}/>
                </div>
        );

        return(
            elements
        );
    }

}

export default AskAI;
