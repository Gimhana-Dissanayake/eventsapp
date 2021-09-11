import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Image, Item, Segment } from "semantic-ui-react";
import { Event } from "../../../app/models/Event";

interface Props {
  event: Event;
  isGoing: boolean;
  isHost: boolean;
}

const EventDetailedHeader = (props: Props) => {
  const eventImageStyle = {
    filter: "brightness(30%)",
  };

  const eventImageTextStyle = {
    position: "absolute",
    bottom: "5%",
    left: "5%",
    width: "100%",
    height: "auto",
    color: "white",
  };

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${props.event.category}.jpg`}
          fluid
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={props.event.title}
                  style={{ color: "white" }}
                />
                <p>{format(props.event.date, "MMMM d, yyyy h:mm a")}</p>
                <p>
                  Hosted by <strong>{props.event.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom" clearing>
        {!props.isHost && (
          <>
            {props.isGoing ? (
              <Button>Cancel My Place</Button>
            ) : (
              <Button color="teal">JOIN THIS EVENT</Button>
            )}
          </>
        )}

        {props.isHost && (
          <Button
            as={Link}
            to={`/manage/${props.event.id}`}
            color="orange"
            floated="right"
          >
            Manage Event
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailedHeader;
