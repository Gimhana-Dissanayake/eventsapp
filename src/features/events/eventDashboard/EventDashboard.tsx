import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { RootState } from "../../../app/store/rootReducer";
import EventList from "./EventList";

interface Props {}

export default function EventDashboard(props: Props) {
  const { events } = useSelector((state: RootState) => state.event);

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h3>Event Filters</h3>
      </Grid.Column>
    </Grid>
  );
}
