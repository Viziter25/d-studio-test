import { FC, ReactNode, RefObject } from "react";
import { createPortal } from "react-dom";

interface IProps {
  children: ReactNode;
  container?: RefObject<HTMLElement>;
}

export const ReactPortal: FC<IProps> = ({ container, children }) => {
  return createPortal(children, container?.current || document.body);
};
