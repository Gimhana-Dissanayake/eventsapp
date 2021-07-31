import cuid from "cuid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { Event } from "./../../../app/models/Event";

interface Props {
  setFormOpen: (value: boolean) => void;
  createEvent: (event: Event) => void;
  selectedEvent: Event | null;
  updateEvent: (event: Event) => void;
}

export default function EventForm(props: Props) {
  const initialValues = props.selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  const [values, setValues] = useState(initialValues);

  const handleFormSubmit = () => {
    props.selectedEvent
      ? props.updateEvent({ ...props.selectedEvent, ...values })
      : props.createEvent({
          ...values,
          id: cuid(),
          hostedBy: "Bob",
          attendees: [],
          hostPhotoURL: "/assets/user.png",
        });
    props.setFormOpen(false);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  return (
    <Segment clearing>
      <Header
        content={props.selectedEvent ? "Edit the event" : "Create new event"}
      ></Header>
      <Form onSubmit={handleFormSubmit}>
        <Form.Field>
          <input
            type="text"
            placeholder="Event title"
            name="title"
            value={values.title}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Category"
            name="category"
            value={values.category}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="City"
            name="city"
            value={values.city}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Venue"
            name="venue"
            value={values.venue}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="date"
            placeholder="Date"
            name="date"
            value={values.date}
            onChange={handleInputChange}
          />
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
          as={Link}
          to="/events"
        ></Button>
      </Form>
    </Segment>
  );
}
