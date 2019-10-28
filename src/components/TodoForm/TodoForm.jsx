import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form, Input } from 'semantic-ui-react'

const TaskSchema = Yup.object().shape({
  taskName: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
});

const TodoForm = ({ addTodo }) => {
  const formik = useFormik({
    initialValues: {
      taskName: ""
    },
    validationSchema: TaskSchema,
    onSubmit: ({ taskName }) => {
      addTodo(taskName);
    }
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Field>
        <label htmlFor="taskName">Task</label>
        <Input
          id="taskName"
          name="taskName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.taskName}
        />
      </Form.Field>
      <Button type="submit" disabled={formik.errors.taskName}>
        Submit
      </Button>
    </Form>
  );
};

export default TodoForm;
