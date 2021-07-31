import cuid from "cuid";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import { categoryData } from "../../../app/api/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyTextInput from "../../../app/common/form/MyTextInput";
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

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a title"),
    category: Yup.string().required("You must provide a category"),
    description: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
    date: Yup.string().required(),
  });

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
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
        }}
      >
        <Form className="ui form">
          <Header sub color="teal" content="Event Details" />
          <MyTextInput name="title" placeholder="Event title" />
          <MySelectInput
            name="category"
            placeholder="Event category"
            options={categoryData}
          />
          <MyTextArea name="description" placeholder="Description" rows={3} />
          <Header sub color="teal" content="Event Location Details" />
          <MyTextInput name="city" placeholder="City" />
          <MyTextInput name="venue" placeholder="Venue" />
          <MyDateInput
            name="date"
            placeholderText="Event date"
            timeFormat="HH:mm"
            showTimeSelect
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm a"
          />

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
