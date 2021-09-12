import React from "react";
import { Link } from "react-router-dom";
import { Image, List } from "semantic-ui-react";
import { Attendee } from "../../../app/models/Attendee";

interface Props {
  attendee: Attendee;
}

export default function EventListAttendee(props: Props) {
  return (
    <List.Item as={Link} to={`/profile/${props.attendee.id}`}>
      <Image size="mini" circular src={props.attendee.photoURL} />
    </List.Item>
  );
}
