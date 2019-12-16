import React from "react";
import {Image} from "react-bootstrap";
import "./Ai.css";

export class ClassDisp extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            onClick: this.props.onClick
        }
    }

    render()
    {
        return(
            <div className="container-fluid" onClick={this.state.onClick}>
                <div className="row" >
                    <div className="col-12 mt-3" >
                        <div className="ai_card">
                            <div className= "RowWrap">
                                <div className="imgExtraBorder">
                                <div className="img-square-wrapper">
                                    <Image className="avatar"  src={this.props.imgSrc} alt="Card image cap"/>
                                </div>
                                </div>

                                <div className= "cardClassDetails">
                                    <h4 className= "classifierTitle">{this.props.title}</h4>
                                    <p clasName= "classifierDesc">{this.props.desc}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


