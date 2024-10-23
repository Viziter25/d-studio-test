import { API_PATHS } from "../API_PATHS";
import { request } from "../utils";
import { ITask, ITaskUpdate } from "../../types/task";

export const fetchTodos = () => {
  return request({
    url: `${API_PATHS.BASE_URL}${API_PATHS.TODOS.GET_TODOS}`,
    method: "GET",
  });
};

export const createTodo = (data: ITask<null>) => {
  return request({
    url: `${API_PATHS.BASE_URL}${API_PATHS.TODOS.POST_TODOS}`,
    method: "POST",
    data,
  });
};

export const deleteTodo = (id: string) => {
  return request({
    url: `${API_PATHS.BASE_URL}${API_PATHS.TODOS.DELETE_TODOS}${id}`,
    method: "DELETE",
  });
};

export const updateTodo = (id: string, data: ITaskUpdate) => {
  return request({
    url: `${API_PATHS.BASE_URL}${API_PATHS.TODOS.UPDATE_TODOS}${id}`,
    method: "PUT",
    data,
  });
};
