import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createErrorMessage } from "../utils/createErrorMessage";
import { fetchTodos } from "../api/todos/todos";
import { ITask } from "../types/task";
import { useState } from "react";

export const useGetTodos = () => {
  const [loading, setLoading] = useState(true);
  const { data, error, refetch } = useQuery<ITask<string>[]>({
    queryKey: ["getTodos"],
    queryFn: async () => {
      setLoading(true);
      try {
        const res = await fetchTodos();
        return res.data;
      } catch (error) {
        toast.error(createErrorMessage(error));
      } finally {
        setLoading(false);
      }
    },
    staleTime: 0,
  });

  return {
    data: data,
    isLoading: loading,
    error,
    refetch,
  };
};
