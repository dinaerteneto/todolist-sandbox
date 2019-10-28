import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Popup } from 'semantic-ui-react'

const TaskSchema = Yup.object().shape({
  taskName: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
});

const TodoForm = ({ addTodo, todoItem }) => {
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
      <Form.Group>
        <Form.Input fluid
          id="taskName"
          name="taskName"
          onChange={formik.handleChange}
          value={formik.values.taskName}
          width={8}
          placeholder="Digite o título da tarefa"
        />
        
        <Popup content='Adicionar tarefa' trigger={<Form.Button primary fluid type="submit" disabled={formik.errors.taskName || todoItem.updateItem}>
          Add
        </Form.Button>} />
      </Form.Group>
    </Form>
  );
};

export default TodoForm;
