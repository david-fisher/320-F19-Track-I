import React from "react";
import {Image, Button} from "react-bootstrap";
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
            <div className="container-fluid">
                <div className="row" >
                    <div className="col-12 mt-3" >
                        <div className="ai_card">
                            <div className= "RowWrap" >
                                <div className="imgExtraBorder" onClick={this.state.onClick}>
                                <div className="img-square-wrapper" >
                                    <Image className="avatar"  src={this.props.imgSrc} alt="Card image cap"/>
                                </div>
                                </div>

                                <div className= "cardClassDetails">
                                    <div className= "classifierHeader">
                                    <h4 className= "classifierTitle">{this.props.title}</h4>
                                        <Button className= "Del" variant="danger"> Delete </Button>
                                </div>
                                    <p clasName= "classifierDesc" onClick={this.state.onClick}>{this.props.desc}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


