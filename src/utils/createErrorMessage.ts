import { AxiosError } from "axios";

export interface IResponsError {
  ErrorMessage: string;
  Success: boolean;
}

export const createErrorMessage = (error: unknown) => {
  const message = ((error as AxiosError).response?.data as IResponsError)
    .ErrorMessage;

  return message;
};
