import { format } from "date-fns";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Icon, Item, List, Segment } from "semantic-ui-react";
import { deleteEvent } from "../eventActions";
import { Event } from "./../../../app/models/Event";
import EventListAttendee from "./EventListAttendee";

interface Props {
  event: Event;
}

export default function EventListItem(props: Props) {
  const dispatch = useDispatch();

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
          {format(props.event.date, "MMMM d, yyyy h:mm a")}
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
            dispatch(deleteEvent(props.event.id));
          }}
          color="red"
          floated="right"
          content="Delete"
        />
        <Button
          as={Link}
          to={`/events/${props.event.id}`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
}
