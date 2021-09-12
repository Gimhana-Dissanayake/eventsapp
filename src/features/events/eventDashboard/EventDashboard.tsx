import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { listenToEventsFromFirestore } from "../../../app/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { RootState } from "../../../app/store/rootReducer";
import { listenToEvents } from "../eventActions";
import EventFilters from "./EventFilters";
import EventList from "./EventList";
import EventListItemPlaceholder from "./EventListItemPlaceholder";

export default function EventDashboard() {
  const dispatch = useDispatch();
  const { events } = useSelector((state: RootState) => state.event);
  const { loading } = useSelector((state: RootState) => state.async);

  const [predicate, setPredicate] = useState(
    new Map<string, any>([
      ["startDate", new Date()],
      ["filter", "all"],
    ])
  );

  function handleSetPredicate(key: string, value: any) {
    setPredicate(new Map(predicate.set(key, value)));
  }

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(predicate),
    data: (events: any) => dispatch(listenToEvents(events)),
    deps: [dispatch, predicate],
  });

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
        <EventFilters
          predicate={predicate}
          setPredicate={handleSetPredicate}
          loading={loading}
        />
      </Grid.Column>
    </Grid>
  );
}
