import React, { FC, ReactNode, MouseEvent } from "react";
import styles from "./index.pcss";
import classNames from "classnames";

interface Props {
  className: string;
  children: ReactNode | string;
  title: string;
  clickHandler: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<Props> = ({
  className,
  title,
  children,
  clickHandler
}: Props) => (
  <button
    className={classNames(styles.button, className)}
    onClick={clickHandler}
    title={title}
  >
    {children}
  </button>
);

export default Button;
