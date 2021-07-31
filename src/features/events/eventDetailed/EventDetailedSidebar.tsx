import React from "react";
import { Item, Segment } from "semantic-ui-react";
import { Attendee } from "../../../app/models/Attendee";

interface Props {
  attendees: Attendee[];
}

const EventDetailedSidebar = (props: Props) => {
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {props.attendees.length}{" "}
        {props.attendees.length > 1 ? "People" : "Person"} Going
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          {props.attendees.map((attendee) => (
            <Item style={{ position: "relative" }} key={attendee.id}>
              <Item.Image
                size="tiny"
                src={attendee.photoURL || "/assets/user.png"}
              />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <span>{attendee.displayName}</span>
                </Item.Header>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </>
  );
};

export default EventDetailedSidebar;
