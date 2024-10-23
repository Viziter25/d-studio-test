import React from "react";
import { Route, Routes } from "react-router";
import { MainPage } from "./pages/MainPage";
import { PATHS } from "./constants/PATHS";
import { PrivateRoute } from "./utils/privateRoute/privateRoute";
import { LoginPage } from "./pages/LoginPage";
import { SingUpPage } from "./pages/SingUpPage";
import { CreateTaskPage } from "./pages/CreateTaskPage";

function App() {
  return (
    <>
      <Routes>
        <Route path={PATHS.LOGIN} element={<LoginPage />} />
        <Route path={PATHS.SIGN_UP} element={<SingUpPage />} />
        <Route path={PATHS.BASE_PATH} element={<PrivateRoute />}>
          <Route index element={<MainPage />} />
          <Route path={PATHS.CREATE_TASK} element={<CreateTaskPage />} />
          <Route path={PATHS.UPDATE_TASK} element={<CreateTaskPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
