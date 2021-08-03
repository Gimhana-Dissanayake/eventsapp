import GoogleMapReact from "google-map-react";
import React from "react";
import { Icon, Segment } from "semantic-ui-react";

interface Props {
  latLng: any;
}

const Marker = (props: any) => {
  return <Icon name="marker" size="big" color="red" />;
};

const EventDetailedMap = (props: Props) => {
  const zoom = 14;

  return (
    <Segment attached="bottom" style={{ padding: 0 }}>
      <div style={{ height: 300, width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "googleapikey" }}
          center={props.latLng}
          zoom={zoom}
        >
          <Marker lat={props.latLng.lat} lng={props.latLng.lng} />
        </GoogleMapReact>
      </div>
    </Segment>
  );
};
export default EventDetailedMap;
