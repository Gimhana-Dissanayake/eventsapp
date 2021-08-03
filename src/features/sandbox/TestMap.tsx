import GoogleMapReact from "google-map-react";
import React from "react";

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

interface Props {
  location: any;
}

const TestMap = (props: Props) => {
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "googleapikey" }}
        center={props.location.center}
        zoom={props.location.zoom}
      >
        <AnyReactComponent
          lat={props.location.center}
          lng={props.location.lng}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
};

export default TestMap;
