import React from "react";
import { RouteComponentProps } from "react-router";
import {
  Button,
  Container,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react";

const HomePage = (props: RouteComponentProps) => {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            style={{ marginBottom: 12 }}
          />
          Re-vents
        </Header>
        <Button
          size="huge"
          inverted
          onClick={() => {
            props.history.push("/events");
          }}
        >
          Get started
          <Icon name="arrow right" inverted />
        </Button>
      </Container>
    </Segment>
  );
};

export default HomePage;
