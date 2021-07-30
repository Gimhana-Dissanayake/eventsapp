import React from "react";
import { Event } from "./../../../app/models/Event";
import EventListItem from "./EventListItem";

interface Props {
  events: Event[];
  selectEvent: (event: Event) => void;
  deleteEvent: (eventId: string) => void;
}

export default function EventList(props: Props) {
  return (
    <>
      {props.events.map((event) => (
        <EventListItem
          event={event}
          key={event.id}
          selectEvent={props.selectEvent}
          deleteEvent={props.deleteEvent}
        />
      ))}
    </>
  );
}
