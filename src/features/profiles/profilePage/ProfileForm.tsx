import { Form, Formik } from "formik";
import React from "react";
import { Button } from "semantic-ui-react";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../../app/firestore/firestoreService";

const ProfileForm = (props: any) => {
  return (
    <Formik
      initialValues={{
        displayName: props.profile.displayName,
        description: props.profile.description || "",
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await updateUserProfile(values);
        } catch (error: any) {
          toast.error(error.message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form">
          <MyTextInput name="displayName" placeholder="Display Name" />
          <MyTextInput name="description" placeholder="Description" />
          <Button
            loading={isSubmitting}
            disabled={isSubmitting || !isValid || !dirty}
            floated="right"
            type="submit"
            size="large"
            positive
            content="Update profile"
          />
        </Form>
      )}
    </Formik>
  );
};

export default ProfileForm;
