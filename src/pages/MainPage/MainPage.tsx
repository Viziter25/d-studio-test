import { CustomButton } from "../../FormFields/CustomButton";
import { Task } from "../../components/Task";
import { Loader } from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { useGetTodos } from "../../hooks/useGetTodos";
import styles from "./MainPage.module.scss";

export const MainPage = () => {
  const navigate = useNavigate();

  const onCreatTask = () => {
    navigate("/create-task");
  };

  const { data, isLoading, refetch } = useGetTodos();

  return (
    <div className={styles.root}>
      {!data?.length && <div>You don't have any tasks yet.</div>}
      {isLoading && <Loader />}
      <div className={styles.wrapper}>
        {!isLoading &&
          data &&
          data.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              updatedAt={task.updatedAt}
              dueDate={task.dueDate}
              createdAt={task.createdAt}
              isCompleted={task.isCompleted}
              refetch={refetch}
            />
          ))}
      </div>
      <CustomButton onClick={onCreatTask} className={styles.createButton}>
        Create task
      </CustomButton>
    </div>
  );
};
