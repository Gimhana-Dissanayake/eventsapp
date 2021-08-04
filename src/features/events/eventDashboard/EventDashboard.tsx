import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import {
  dataFromSnapshot,
  getEventsFromFirestore,
} from "../../../app/firestore/firestoreService";
import { RootState } from "../../../app/store/rootReducer";
import { listenToEvents } from "../eventActions";
import EventFilters from "./EventFilters";
import EventList from "./EventList";
import EventListItemPlaceholder from "./EventListItemPlaceholder";

export default function EventDashboard() {
  const dispatch = useDispatch();
  const { events } = useSelector((state: RootState) => state.event);
  const { loading } = useSelector((state: RootState) => state.async);

  useEffect(() => {
    const unsubscribe = getEventsFromFirestore({
      next: (snapshot: any) =>
        dispatch(
          listenToEvents(
            snapshot.docs.map((docSnapshot: any) =>
              dataFromSnapshot(docSnapshot)
            )
          )
        ),
      error: (error: any) => console.log(error),
    });
    return unsubscribe;
  }, [dispatch]);

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
