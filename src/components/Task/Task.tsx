import { FC, useRef, useState } from "react";

import styles from "./Task.module.scss";
import { CustomButton } from "../../FormFields/CustomButton";
import { deleteTodo } from "../../api/todos/todos";
import { ReactPortal } from "../ReactPortal";
import { ReactPortalSubstrate } from "../ReactPortalSubstrate";
import { UpdateTaskModal } from "../UpdateTaskModal";
import { useClickOutside } from "../../hooks/useClickOutside";

interface IProps {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  refetch: () => void;
}

export const Task: FC<IProps> = ({
  id,
  title,
  description,
  isCompleted,
  createdAt,
  updatedAt,
  dueDate,
  refetch,
}) => {
  const [isUpdateOpen, seIsUpdateOpen] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  const onOpenClick = () => {
    seIsUpdateOpen(true);
  };

  const onCloseClick = () => {
    seIsUpdateOpen(false);
  };

  useClickOutside(formRef, onCloseClick);

  const onDeleteTask = async (id: string) => {
    await deleteTodo(id);
    refetch();
  };

  const onUpdateTask = async () => {
    onOpenClick();
  };

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <p className={styles.status}>
        Status: <strong>{isCompleted ? "Completed" : "Pending"}</strong>
      </p>
      {dueDate && (
        <p className={styles.dueDate}>
          Due Date: {new Date(dueDate).toLocaleDateString()}
        </p>
      )}
      <p className={styles.date}>
        Created At: {new Date(createdAt).toLocaleDateString()} | Updated At:{" "}
        {new Date(updatedAt).toLocaleDateString()}
      </p>
      <div className={styles.wrapperBtn}>
        <CustomButton onClick={onUpdateTask}>Update</CustomButton>
        <CustomButton theme={"text"} onClick={() => onDeleteTask(id)}>
          Delete
        </CustomButton>
      </div>

      {isUpdateOpen && (
        <ReactPortal>
          <ReactPortalSubstrate className={styles.portalWrapper}>
            <UpdateTaskModal
              id={id}
              title={title}
              description={description}
              isCompleted={isCompleted}
              createdAt={createdAt}
              updatedAt={updatedAt}
              dueDate={dueDate}
              ref={formRef}
              onClose={onCloseClick}
              refetch={refetch}
            />
          </ReactPortalSubstrate>
        </ReactPortal>
      )}
    </div>
  );
};
