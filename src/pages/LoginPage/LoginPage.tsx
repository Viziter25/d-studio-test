import { CustomInput } from "../../FormFields/CustomInput";
import styles from "./LoginPage.module.scss";

import * as yup from "yup";
import { useFormik } from "formik";
import { MESSAGES } from "../../constants/MESSAGES";
import { CustomButton } from "../../FormFields/CustomButton";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createErrorMessage } from "../../utils/createErrorMessage";

export const LoginPage = () => {
  const [isDisabledSubmitBtn, setIsDisabledSubmitBtn] = useState(true);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .matches(
          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
          MESSAGES.EMAIL,
        )
        .required(MESSAGES.REQUIRED),
      password: yup
        .string()
        .required(MESSAGES.REQUIRED)
        .min(8, MESSAGES.PASSWORDMIN)
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s])/, MESSAGES.REQCHAR),
    }),
    onSubmit: async (data) => {
      const payload = {
        state: "Internal",
        username: data.username,
        password: data.password,
      };
      try {
        const result = await loginUser(payload);
        navigate("/");
        localStorage.setItem("accessToken", result.accessToken);
      } catch (error) {
        toast.error(createErrorMessage(error));
      }
    },
  });

  const onSignUpBtnClick = () => {
    navigate("/sign-up");
  };

  useEffect(() => {
    setIsDisabledSubmitBtn(
      !!Object.values(formik.errors).length ||
        !Object.values(formik.values).every(Boolean),
    );
  }, [formik.errors, formik.values]);

  return (
    <div className={styles.root}>
      <p className={styles.login}>LOGIN</p>
      <form className={styles.formik} onSubmit={formik.handleSubmit}>
        <CustomInput
          type="email"
          label="User name"
          id="username"
          name="username"
          placeholder="Enter your user name"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.errors.username}
        />
        <div className={styles.passwordWrapper}>
          <CustomInput
            type="password"
            label="Password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
            autoComplete="current-password"
          />
          <CustomButton
            theme="text"
            className={styles.forgotPassBtn}
            onClick={onSignUpBtnClick}
          >
            Sign-up
          </CustomButton>
        </div>
        <CustomButton
          type="submit"
          theme={"secondary"}
          className={styles.loginBtn}
          isDisabled={isDisabledSubmitBtn}
        >
          Login
        </CustomButton>
      </form>
    </div>
  );
};