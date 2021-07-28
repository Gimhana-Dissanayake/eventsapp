import { useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { Event } from "./../../../app/models/Event";

interface Props {
  setFormOpen: (value: boolean) => void;
  setEvents: (event: Event[]) => void;
}

export default function EventForm(props: Props) {
  const initialValues = {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  const [values, setValues] = useState(initialValues);

  const handleFormSubmit = () => {
    console.log("values ", values);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  return (
    <Segment clearing>
      <Header content="Create new event"></Header>
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
          onClick={() => {
            props.setFormOpen(false);
          }}
        ></Button>
      </Form>
    </Segment>
  );
}
