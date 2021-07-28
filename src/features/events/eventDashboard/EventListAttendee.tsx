import React from "react";
import { Image, List } from "semantic-ui-react";
import { Attendee } from "../../../app/models/Attendee";

interface Props {
  attendee: Attendee;
}

export default function EventListAttendee(props: Props) {
  return (
    <List.Item>
      <Image size="mini" circular src={props.attendee.photoURL} />
    </List.Item>
  );
}
