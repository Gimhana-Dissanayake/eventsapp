import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { listenToEventFromFirestore } from "../../../app/firestore/firestoreService";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootState } from "../../../app/store/rootReducer";
import { listenToEvents } from "../eventActions";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSidebar from "./EventDetailedSidebar";

const EventDetailedPage = (props: RouteComponentProps) => {
  const dispatch = useDispatch();

  const params: any = props.match.params;

  const event = useSelector((state: RootState) =>
    state.event.events.find((e: any) => e.id === params.id)
  );

  const { loading } = useSelector((state: RootState) => state.async);

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(params.id),
    data: (event: any) => dispatch(listenToEvents([event])),
    deps: [params.id, dispatch],
  });

  if (loading || !event) return <LoadingComponent content="Loading event..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={event?.attendees} />
      </Grid.Column>
    </Grid>
  );
};

export default EventDetailedPage;
