import classNames from "classnames";
import { ReactNode, forwardRef } from "react";

import styles from "./CustomButton.module.scss";

interface IProps {
  children: ReactNode | string;
  type?: "button" | "reset" | "submit";
  theme?: "secondary" | "text" | "unstyled";
  alignContent?: "center" | "end";
  className?: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

export const CustomButton = forwardRef<HTMLButtonElement, IProps>(
  (
    {
      children,
      type = "button",
      theme,
      alignContent,
      className,
      isDisabled = false,
      onClick,
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={classNames(styles.root, className, {
          [styles[theme || ""]]: theme,
          [styles[alignContent || ""]]: alignContent,
        })}
        type={type}
        onClick={onClick}
        disabled={isDisabled}
      >
        {children}
      </button>
    );
  },
);
