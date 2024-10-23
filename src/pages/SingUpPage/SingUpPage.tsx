import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { MESSAGES } from "../../constants/MESSAGES";
import styles from "./SingUpPage.module.scss";
import { CustomInput } from "../../FormFields/CustomInput";
import { CustomButton } from "../../FormFields/CustomButton";
import { signUpUser } from "../../api/auth/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createErrorMessage } from "../../utils/createErrorMessage";

export const SingUpPage = () => {
  const [isDisabledSubmitBtn, setIsDisabledSubmitBtn] = useState(true);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
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
      try {
        const result = await signUpUser(data);
        navigate("/login");
      } catch (error) {
        toast.error(createErrorMessage(error));
      }
    },
  });

  const onLoginBtnClick = () => {
    navigate("/login");
  };

  useEffect(() => {
    setIsDisabledSubmitBtn(
      !!Object.values(formik.errors).length ||
        !Object.values(formik.values).every(Boolean),
    );
  }, [formik.errors, formik.values]);

  return (
    <div className={styles.root}>
      <p className={styles.login}>SING UP</p>
      <form className={styles.formik} onSubmit={formik.handleSubmit}>
        <CustomInput
          type="email"
          label="Email"
          id="email"
          name="email"
          placeholder="Enter your Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
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
            onClick={onLoginBtnClick}
          >
            Login
          </CustomButton>
        </div>
        <CustomButton
          type="submit"
          className={styles.loginBtn}
          theme={"secondary"}
          isDisabled={isDisabledSubmitBtn}
        >
          Sign up
        </CustomButton>
      </form>
    </div>
  );
};
