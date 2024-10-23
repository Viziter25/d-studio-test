import styles from "./UpdateTaskModal.module.scss";
import { forwardRef, useEffect, useState } from "react";
import { CustomInput } from "../../FormFields/CustomInput";
import { CustomButton } from "../../FormFields/CustomButton";
import { useFormik } from "formik";
import { updateTodo } from "../../api/todos/todos";
import { toast } from "react-toastify";
import { createErrorMessage } from "../../utils/createErrorMessage";
import DatePicker from "react-datepicker";

interface IProps {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  onClose: () => void;
  refetch: () => void;
}

export const UpdateTaskModal = forwardRef<HTMLDivElement, IProps>(
  ({ id, title, description, dueDate, isCompleted, onClose, refetch }, ref) => {
    const [startDate, setStartDate] = useState<Date | null>(
      dueDate ? new Date(dueDate) : null,
    );
    const [isTaskCompleted, setIsTaskCompleted] = useState(isCompleted);
    const [isDisabledSubmitBtn, setIsDisabledSubmitBtn] = useState(true);

    const handleCheckboxChange = () => {
      setIsTaskCompleted((prev) => !prev);
    };

    const onCancel = () => {
      onClose();
    };

    const formik = useFormik({
      initialValues: {
        title: title,
        description: description,
        dueDate: dueDate,
      },
      onSubmit: async (data) => {
        const payload = {
          title: data.title,
          description: data.description,
          isCompleted: isTaskCompleted,
          dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : "",
        };
        try {
          await updateTodo(id, payload);
          onClose();
          refetch();
        } catch (error) {
          toast.error(createErrorMessage(error));
        }
      },
    });

    useEffect(() => {
      setIsDisabledSubmitBtn(
        !formik.values.title || !formik.values.description,
      );
    }, [formik.values]);

    return (
      <div ref={ref} className={styles.root}>
        <p className={styles.updateTask}>UPDATE TASK</p>
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
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              id="isCompleted"
              checked={isTaskCompleted}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="isCompleted">Completed</label>
          </div>
          <div className={styles.wrapperBtn}>
            <CustomButton
              type="submit"
              theme="secondary"
              className={styles.createTaskBtn}
              isDisabled={isDisabledSubmitBtn}
            >
              Save
            </CustomButton>
            <CustomButton theme="text" onClick={onCancel}>
              Cancel
            </CustomButton>
          </div>
        </form>
      </div>
    );
  },
);
