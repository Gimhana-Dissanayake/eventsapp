import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router-dom";
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
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const params: any = props.match.params;

  const event = useSelector((state: RootState) =>
    state.event.events.find((e: any) => e.id === params.id)
  );

  const { loading, error } = useSelector((state: RootState) => state.async);
  const isHost = event?.hostUid === currentUser.uid;
  const isGoing = event?.attendees?.some((a: any) => a.id === currentUser.uid);

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(params.id),
    data: (event: any) => dispatch(listenToEvents([event])),
    deps: [params.id, dispatch],
  });

  if (loading || (!event && !error))
    return <LoadingComponent content="Loading event..." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} isGoing={isGoing} isHost={isHost} />
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
