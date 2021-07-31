import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { RootState } from "../../../app/store/rootReducer";
import EventList from "./EventList";

interface Props {}

export default function EventDashboard(props: Props) {
  const { events } = useSelector((state: RootState) => state.event);

  // const handleCreateEvent = (event: Event) => {
  //   setEvents([...events, event]);
  // };

  // const handleUpdateEvent = (updatedEvent: Event) => {
  //   setEvents(
  //     events.map((evt) => (evt.id === updatedEvent.id ? updatedEvent : evt))
  //   );
  // };

  const handleDeleteEvent = (eventId: string) => {};

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
