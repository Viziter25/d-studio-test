import classNames from "classnames";
import { nanoid } from "nanoid";
import { ChangeEvent, FC, ReactNode, useState } from "react";

import styles from "./CustomInput.module.scss";

import { ReactComponent as ErrorIcon } from "../../assets/icon/alertCircle-icon.svg";
import { ReactComponent as EyeIcon } from "../../assets/icon/eye-icon.svg";
import { ReactComponent as EyeOffIcon } from "../../assets/icon/eyeOff-icon.svg";
import { CustomButton } from "../../FormFields/CustomButton";

interface IProps {
  value: string;
  id?: string;
  name?: string;
  type?: "text" | "email" | "password" | "phone";
  label?: ReactNode | string;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const CustomInput: FC<IProps> = ({
  value,
  id = nanoid(),
  name,
  type = "text",
  label,
  placeholder = "Placeholder",
  error,
  autoComplete,
  onChange,
}) => {
  const [inputType, setInputType] = useState(type);

  const onShowPasswordClick = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className={styles.root}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <input
          id={id}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={classNames(styles.input, { [styles.error]: error })}
          autoComplete={autoComplete}
        />
        {type === "password" && (
          <CustomButton
            theme="unstyled"
            className={styles.eyeBtn}
            onClick={onShowPasswordClick}
          >
            {inputType === "password" && (
              <EyeOffIcon className={styles.eyeIcon} />
            )}
            {inputType === "text" && <EyeIcon className={styles.eyeIcon} />}
          </CustomButton>
        )}
      </div>
      {error && (
        <div className={styles.errorWrapper}>
          <div className={styles.errorIconWrapper}>
            <ErrorIcon className={styles.errorIcon} />
          </div>
          {error}
        </div>
      )}
    </div>
  );
};
