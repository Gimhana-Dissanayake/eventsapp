import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { RootState } from "../../../app/store/rootReducer";
import EventList from "./EventList";
import EventListItemPlaceholder from "./EventListItemPlaceholder";

export default function EventDashboard() {
  const { events } = useSelector((state: RootState) => state.event);
  const { loading } = useSelector((state: RootState) => state.async);

  return (
    <Grid>
      <Grid.Column width={10}>
        {loading && (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        )}
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h3>Event Filters</h3>
      </Grid.Column>
    </Grid>
  );
}
