import React from "react";
import { Button, Icon, Item, List, Segment } from "semantic-ui-react";
import { Event } from "./../../../app/models/Event";
import EventListAttendee from "./EventListAttendee";

interface Props {
  event: Event;
  selectEvent: (event: Event) => void;
  deleteEvent: (eventId: string) => void;
}

export default function EventListItem(props: Props) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={props.event.hostPhotoURL} />
            <Item.Content>
              <Item.Header content={props.event.title} />
              <Item.Description>
                Hosted by {props.event.hostedBy}
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {props.event.date}
          <Icon name="marker" /> {props.event.venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {props.event.attendees.map((attendee) => (
            <EventListAttendee key={attendee.id} attendee={attendee} />
          ))}
        </List>
      </Segment>
      <Segment clearing>
        <div>{props.event.description}</div>
        <Button
          onClick={() => {
            props.deleteEvent(props.event.id);
          }}
          color="red"
          floated="right"
          content="Delete"
        />
        <Button
          onClick={() => {
            props.selectEvent(props.event);
          }}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
}
