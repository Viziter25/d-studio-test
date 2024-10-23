import classNames from "classnames";
import { FC } from "react";

import styles from "./Loader.module.scss";

interface IProps {
  className?: string;
  classNameLoader?: string;
}

export const Loader: FC<IProps> = ({ className, classNameLoader }) => {
  return (
    <div className={classNames(styles.root, className)}>
      <div className={classNames(styles.loader, classNameLoader)}></div>
    </div>
  );
};
