import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, FormField, Header, Label, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import { RootState } from "../../../app/store/rootReducer";

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

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a title"),
  });

  // const [values, setValues] = useState(initialValues);

  // const handleFormSubmit = () => {
  //   selectedEvent
  //     ? dispatch(updateEvent({ selectedEvent, ...values }))
  //     : dispatch(
  //         createEvent({
  //           ...values,
  //           id: cuid(),
  //           hostedBy: "Bob",
  //           attendees: [],
  //           hostPhotoURL: "/assets/user.png",
  //         })
  //       );
  //   props.history.push("/events");
  // };

  return (
    <Segment clearing>
      <Header
        content={selectedEvent ? "Edit the event" : "Create new event"}
      ></Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        <Form className="ui form">
          <FormField>
            <Field name="title" placeholder="Event title" />
            <ErrorMessage
              name="title"
              render={(error) => <Label basic color="red" content={error} />}
            />
          </FormField>
          <FormField>
            <Field name="category" placeholder="Category" />
          </FormField>
          <FormField>
            <Field name="description" placeholder="Description" />
          </FormField>
          <FormField>
            <Field name="city" placeholder="City" />
          </FormField>
          <FormField>
            <Field name="venue" placeholder="Venue" />
          </FormField>
          <FormField>
            <Field name="date" placeholder="Event date" type="date" />
          </FormField>

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
      </Formik>
    </Segment>
  );
}
