import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { getEventsFromFirestore } from "../../../app/firestore/firestoreService";
import { RootState } from "../../../app/store/rootReducer";
import EventFilters from "./EventFilters";
import EventList from "./EventList";
import EventListItemPlaceholder from "./EventListItemPlaceholder";

export default function EventDashboard() {
  const { events } = useSelector((state: RootState) => state.event);
  const { loading } = useSelector((state: RootState) => state.async);

  useEffect(() => {
    const unsubscribe = getEventsFromFirestore({
      next: (snapshot: any) =>
        console.log(
          snapshot.docs.map((docSnapshot: any) => docSnapshot.data())
        ),
      error: (error: any) => console.log(error),
    });
    return unsubscribe;
  }, []);

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
        <EventFilters />
      </Grid.Column>
    </Grid>
  );
}
