import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import { sampleData } from "../../../app/api/sampleData";
import { Event } from "./../../../app/models/Event";
import EventList from "./EventList";

interface Props {}

export default function EventDashboard(props: Props) {
  const [events, setEvents] = useState<Event[]>(sampleData);

  // const handleCreateEvent = (event: Event) => {
  //   setEvents([...events, event]);
  // };

  // const handleUpdateEvent = (updatedEvent: Event) => {
  //   setEvents(
  //     events.map((evt) => (evt.id === updatedEvent.id ? updatedEvent : evt))
  //   );
  // };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((evt) => evt.id !== eventId));
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} deleteEvent={handleDeleteEvent} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h3>Event Filters</h3>
      </Grid.Column>
    </Grid>
  );
}
