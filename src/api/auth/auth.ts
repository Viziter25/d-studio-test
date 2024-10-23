import axios from "axios";
import { API_PATHS } from "../API_PATHS";
import { ILoginUser, INewUser } from "../../types/auth";

export const signUpUser = async (data: INewUser) => {
  const response = await axios.post(
    `${API_PATHS.BASE_URL}${API_PATHS.AUTH.SING_UP}`,
    data,
  );

  return response.data;
};

export const loginUser = async (data: ILoginUser) => {
  const response = await axios.post(
    `${API_PATHS.BASE_URL}${API_PATHS.AUTH.LOGIN}`,
    data,
  );
  return response.data;
};
