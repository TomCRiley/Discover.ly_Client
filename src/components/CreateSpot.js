import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const SelectInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const CreateSpot = () => {
  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        location: '',
        activity: '',
        img: '',
      }}
      validationSchema={Yup.object({
        title: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        location: Yup.string().required('Required'),
        activity: Yup.string().oneOf(
          ['Running', 'Walking', 'Cycling', 'Swimming', 'Watersports'],
          'Please select an activity'
        ),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <TextInput label="Title" name="title" type="text" placeholder="Title" />

        <TextInput
          label="Description"
          name="description"
          type="textarea"
          placeholder="Description"
        />

        <TextInput
          label="Location"
          name="location"
          type="text"
          placeholder="Location"
        />

        <SelectInput label="Activity" name="activity">
          <option value="">Select an activity</option>
          <option value="Running">Running</option>
          <option value="Walking">Walking</option>
          <option value="Cycling">Cycling</option>
          <option value="Swimming">Swimming</option>
          <option value="Watersports">Watersports</option>
        </SelectInput>

        <TextInput
          label="Image"
          name="img"
          type="text"
          placeholder="Upload an image"
        />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default CreateSpot;
