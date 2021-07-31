import cuid from "cuid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { RootState } from "../../../app/store/rootReducer";
import { createEvent, updateEvent } from "../eventActions";

export default function EventForm(props: RouteComponentProps) {
  const params: any = props.match.params;

  const selectedEvent = useSelector((state: RootState) =>
    state.event.events.find((e) => e.id === params.id)
  );

  const dispatch = useDispatch();

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  const [values, setValues] = useState(initialValues);

  const handleFormSubmit = () => {
    selectedEvent
      ? dispatch(updateEvent({ selectedEvent, ...values }))
      : dispatch(
          createEvent({
            ...values,
            id: cuid(),
            hostedBy: "Bob",
            attendees: [],
            hostPhotoURL: "/assets/user.png",
          })
        );
    props.history.push("/events");
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  return (
    <Segment clearing>
      <Header
        content={selectedEvent ? "Edit the event" : "Create new event"}
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
