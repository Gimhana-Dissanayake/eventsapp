import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import { sampleData } from "../../../app/api/sampleData";
import EventForm from "../eventForm/EventForm";
import EventList from "./EventList";

interface Props {
  formOpen: boolean;
  setFormOpen: (value: boolean) => void;
}

export default function EventDashboard(props: Props) {
  const [events, setEvents] = useState(sampleData);

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        {props.formOpen && <EventForm setFormOpen={props.setFormOpen} />}
      </Grid.Column>
    </Grid>
  );
}
