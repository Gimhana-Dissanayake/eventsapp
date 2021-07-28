import { Button, Form, Header, Segment } from "semantic-ui-react";

interface Props {
  setFormOpen: (value: boolean) => void;
}

export default function EventForm(props: Props) {
  return (
    <Segment clearing>
      <Header content="Create new event"></Header>
      <Form>
        <Form.Field>
          <input type="text" placeholder="Event title" />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="Category" />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="Description" />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="City" />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="Venue" />
        </Form.Field>
        <Form.Field>
          <input type="date" placeholder="Date" />
        </Form.Field>
        <Button
          type="submit"
          floated="right"
          positive
          content="Submit"
        ></Button>
        <Button
          type="submit"
          floated="right"
          content="Cancel"
          onClick={() => {
            props.setFormOpen(false);
          }}
        ></Button>
      </Form>
    </Segment>
  );
}
