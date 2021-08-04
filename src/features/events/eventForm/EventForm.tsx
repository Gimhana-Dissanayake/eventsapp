import { Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Confirm, Header, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import { categoryData } from "../../../app/api/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyTextInput from "../../../app/common/form/MyTextInput";
import {
  addEventToFirestore,
  cancelEventToggle,
  listenToEventFromFirestore,
  updateEventInFirestore,
} from "../../../app/firestore/firestoreService";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Event } from "../../../app/models/Event";
import { RootState } from "../../../app/store/rootReducer";
import { listenToEvents } from "../eventActions";

export default function EventForm(props: RouteComponentProps) {
  const params: any = props.match.params;

  const dispatch = useDispatch();

  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const selectedEvent = useSelector((state: RootState) =>
    state.event.events.find((e: any) => e.id === params.id)
  );

  const { loading, error } = useSelector((state: RootState) => state.async);

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

  const handleCancelToggle = async (event: Event) => {
    setConfirmOpen(false);
    setLoadingCancel(true);
    try {
      await cancelEventToggle(event);
      setLoadingCancel(false);
    } catch (error) {
      setLoadingCancel(false);
      toast.error(error.message);
    }
  };

  useFirestoreDoc({
    shouldExecute: !!params.id,
    query: () => listenToEventFromFirestore(params.id),
    data: (event: any) => dispatch(listenToEvents([event])),
    deps: [params.id, dispatch],
  });

  if (loading) return <LoadingComponent content="Loading event..." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedEvent
              ? await updateEventInFirestore(values)
              : await addEventToFirestore(values);
            setSubmitting(false);
            props.history.push("/events");
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
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

            {selectedEvent && (
              <Button
                loading={loadingCancel}
                type="button"
                floated="left"
                color={selectedEvent.isCancelled ? "green" : "red"}
                content={
                  selectedEvent.isCancelled
                    ? "Reactivate Event"
                    : "Cancel Event"
                }
                onClick={() => setConfirmOpen(true)}
              />
            )}

            <Button
              type="submit"
              floated="right"
              positive
              content="Submit"
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
            />
            <Button
              disabled={isSubmitting}
              type="submit"
              floated="right"
              content="Cancel"
              as={Link}
              to="/events"
            />
          </Form>
        )}
      </Formik>
      <Confirm
        content={
          selectedEvent?.isCancelled
            ? "This will reactivate the event - are you sure?"
            : "This will cancel the event - are you sure"
        }
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handleCancelToggle(selectedEvent)}
      />
    </Segment>
  );
}
