import React from "react";
import {Image, Button} from "react-bootstrap";
import "./Ai.css";
import newIcon from "./PrettyEricGraphics/NewClassIcon.png"

export class NewClassDisp extends React.Component
{

    constructor(props)
    {
        super(props);
    }

    render()
    {
        const canDelete = false;

        return(
            <div className="container-fluid"  >
                <div className="row" >
                    <div className="col-12 mt-3" >
                        <div className="ai_card">
                            <div className= "RowWrap" >
                                <div className="imgExtraBorder" onClick={this.props.onClick}>
                                    <div className="img-square-wrapper" >
                                        <Image className="avatar"  src={newIcon}/>
                                    </div>
                                </div>

                                <div className= "newClassDetails" onClick={this.props.onClick}>
                                    <h4> Upload New Classifier</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
