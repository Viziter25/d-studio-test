import { CustomInput } from "../../FormFields/CustomInput";
import styles from "./CreateTaskPage.module.scss";
import { useFormik } from "formik";
import { CustomButton } from "../../FormFields/CustomButton";
import { useNavigate } from "react-router-dom";
import { createTodo } from "../../api/todos/todos";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createErrorMessage } from "../../utils/createErrorMessage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const CreateTaskPage = () => {
  const [isDisabledSubmitBtn, setIsDisabledSubmitBtn] = useState(true);
  const [startDate, setStartDate] = useState<Date | null>(null);

  const navigate = useNavigate();

  const onCancel = () => {
    navigate("/");
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      dueDate: "",
    },
    onSubmit: async (data) => {
      const payload = {
        id: null,
        title: data.title,
        description: data.description,
        isCompleted: false,
        dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      try {
        await createTodo(payload);
        navigate("/");
      } catch (error) {
        toast.error(createErrorMessage(error));
      }
    },
  });

  useEffect(() => {
    setIsDisabledSubmitBtn(
      !formik.values.title ||
        !formik.values.description ||
        !formik.values.dueDate,
    );
  }, [formik.values]);

  return (
    <div className={styles.root}>
      <p className={styles.createTask}>CREATE TASK</p>
      <form className={styles.formik} onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          label="Title"
          id="title"
          name="title"
          placeholder="Enter task title"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        <CustomInput
          type="text"
          label="Description"
          id="description"
          name="description"
          placeholder="Enter task description"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        <div className={styles.wrapperDate}>
          <label>Due Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              formik.setFieldValue("dueDate", date);
            }}
            className={styles.inputPicker}
            dateFormat="yyyy/MM/dd"
            placeholderText="Select a due date"
            isClearable
          />
        </div>
        <div className={styles.wrapperBtn}>
          <CustomButton
            type="submit"
            theme="secondary"
            className={styles.createTaskBtn}
            isDisabled={isDisabledSubmitBtn}
          >
            Create Task
          </CustomButton>
          <CustomButton theme="text" onClick={onCancel}>
            Cancel
          </CustomButton>
        </div>
      </form>
    </div>
  );
};
