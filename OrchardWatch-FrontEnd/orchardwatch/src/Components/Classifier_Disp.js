import React from "react";
import {Image} from "react-bootstrap";


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
                <div className="row">
                    <div className="col-12 mt-3">
                        <div className="card">
                            <div className="card-horizontal">
                                <div className="img-square-wrapper">
                                    <Image className="" style = {{width: 300, height: 300}} src="http://via.placeholder.com/300x180" alt="Card image cap"/>
                                </div>
                                    <h4 className="card-title">Card title</h4>
                                    <p className="card-text">Some quick example text to build on the card title and make
                                        up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}