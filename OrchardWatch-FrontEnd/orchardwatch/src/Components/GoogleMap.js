import React from "react";
import GoogleMapReact from "google-map-react";

const TestMarker = ({ text }) => <div>{text}</div>

class GoogleMap extends React.Component {
    constructor() {
        super();
    }

    static defaultProps = {
        center: {
            lat: 42.254725,
            lng: -72.360374
        },
        zoom: 16
    };

    render() {
        return (
            <div style={{ height: '75vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyAtet06EefOdjCUF-YFsWceI6DMPUt54O4", language: "en" }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    options={function (maps) { return { mapTypeId: "hybrid" } }}
                >
                    <TestMarker
                        lat={42.253702}
                        lng={-72.359837}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default GoogleMap;