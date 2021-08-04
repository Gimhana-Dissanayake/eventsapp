import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import { RootState } from "../../store/rootReducer";

export const ErrorComponent = () => {
  const { error } = useSelector((state: RootState) => state.async);

  return (
    <Segment placeholder>
      <Header
        textAlign="center"
        content={error?.message || "Oops - we have an error"}
      />
      <Button
        as={Link}
        to="/events"
        primary
        style={{ marginTop: 20 }}
        content="Return to events page"
      />
    </Segment>
  );
};
