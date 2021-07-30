import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import { sampleData } from "../../../app/api/sampleData";
import EventForm from "../eventForm/EventForm";
import { Event } from "./../../../app/models/Event";
import EventList from "./EventList";

interface Props {
  formOpen: boolean;
  setFormOpen: (value: boolean) => void;
  selectEvent: (event: Event | null) => void;
  selectedEvent: Event | null;
}

export default function EventDashboard(props: Props) {
  const [events, setEvents] = useState<Event[]>(sampleData);

  const handleCreateEvent = (event: Event) => {
    setEvents([...events, event]);
  };

  const handleUpdateEvent = (updatedEvent: Event) => {
    setEvents(
      events.map((evt) => (evt.id === updatedEvent.id ? updatedEvent : evt))
    );
    props.selectEvent(null);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((evt) => evt.id !== eventId));
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          events={events}
          selectEvent={props.selectEvent}
          deleteEvent={handleDeleteEvent}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {props.formOpen && (
          <EventForm
            setFormOpen={props.setFormOpen}
            createEvent={handleCreateEvent}
            selectedEvent={props.selectedEvent}
            updateEvent={handleUpdateEvent}
            key={props.selectedEvent ? props.selectedEvent.id : null}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
