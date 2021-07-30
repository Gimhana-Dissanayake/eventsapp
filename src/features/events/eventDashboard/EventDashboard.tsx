import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import { sampleData } from "../../../app/api/sampleData";
import EventForm from "../eventForm/EventForm";
import { Event } from "./../../../app/models/Event";
import EventList from "./EventList";

interface Props {
  formOpen: boolean;
  setFormOpen: (value: boolean) => void;
  selectEvent: (event: Event) => void;
  selectedEvent: Event | null;
}

export default function EventDashboard(props: Props) {
  const [events, setEvents] = useState<Event[]>(sampleData);

  const handleCreateEvent = (event: Event) => {
    setEvents([...events, event]);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} selectEvent={props.selectEvent} />
      </Grid.Column>
      <Grid.Column width={6}>
        {props.formOpen && (
          <EventForm
            setFormOpen={props.setFormOpen}
            createEvent={handleCreateEvent}
            selectedEvent={props.selectedEvent}
            key={props.selectedEvent ? props.selectedEvent.id : null}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
