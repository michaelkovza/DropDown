import React, { FC } from "react";
import SearchBox from "../SearchBox";
import styles from "./index.pcss";
import { Content } from "../../App";

interface Props {
  title: string;
  width?: number;
  content: Content[];
}

const DropDown: FC<Props> = ({ title, width = 300, content }: Props) => (
  <div style={{ width }} className={styles.dropDown}>
    <h1>{title}</h1>
    <SearchBox content={content} />
  </div>
);

export default DropDown;
