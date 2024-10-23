import { Navigate, Outlet } from "react-router-dom";

import { PATHS } from "../../constants/PATHS";

export const PrivateRoute = () => {
  const accessToken = localStorage.getItem("accessToken");

  return accessToken ? <Outlet /> : <Navigate to={PATHS.LOGIN} />;
};
