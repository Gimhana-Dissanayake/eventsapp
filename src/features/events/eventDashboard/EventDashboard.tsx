import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import { sampleData } from "../../../app/api/sampleData";
import EventForm from "../eventForm/EventForm";
import { Event } from "./../../../app/models/Event";
import EventList from "./EventList";

interface Props {
  formOpen: boolean;
  setFormOpen: (value: boolean) => void;
}

export default function EventDashboard(props: Props) {
  const [events, setEvents] = useState(sampleData);

  function handleCreateEvent(event: Event) {
    setEvents([...events, event]);
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        {props.formOpen && (
          <EventForm
            setFormOpen={props.setFormOpen}
            setEvents={setEvents}
            createEvent={handleCreateEvent}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
