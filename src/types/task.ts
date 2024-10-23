export interface ITask<T> {
  id: T;
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITaskUpdate {
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: string;
}
