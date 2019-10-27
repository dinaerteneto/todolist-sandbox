import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

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
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="taskName">Task</label>
      <input
        id="taskName"
        name="taskName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.taskName}
      />
      <button type="submit" disabled={formik.errors.taskName}>
        Submit
      </button>
    </form>
  );
};

export default TodoForm;
