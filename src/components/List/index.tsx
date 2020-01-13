import React, { FC, useEffect, useRef } from "react";
import styles from "./index.pcss";
import Button from "../Button";
import { Content } from "../../App";
import classNames from "classnames";
import filterBySearchValue from "../../../utils/filterBySearchValue";

interface Props {
  counter: number;
  items: Content[];
  searchValue: string;
  clickHandler: (item: Content) => void;
}

const List: FC<Props> = ({ counter, items, searchValue, clickHandler }) => {
  if (!items.length) {
    return null;
  }

  const listRef = useRef<HTMLUListElement>(null);

  const scrollToSelectedItem = () => {
    if (listRef && listRef.current) {
      const childElements: HTMLLIElement[] = [
        ...listRef.current.querySelectorAll("li")
      ];
      childElements[counter] && childElements[counter].scrollIntoView(true);
    }
  };

  useEffect(() => {
    scrollToSelectedItem();
  }, [counter, searchValue]);

  const getItemMarkUp = (item: Content, index: number) => {
    const buttonClassName = classNames(styles.button, {
      [styles.selected]: counter === index
    });

    return (
      <li className={styles.item} key={item.id}>
        <Button
          className={buttonClassName}
          title={`Add: ${item.title}`}
          clickHandler={() => clickHandler(item)}
        >
          {item.title}
        </Button>
      </li>
    );
  };

  const renderItems = () => {
    const filteredItems = filterBySearchValue(items, searchValue);

    if (!filteredItems.length) {
      return (
        <li className={styles.item}>
          <p>No results found.</p>
        </li>
      );
    }

    return filteredItems.map((item: Content, index: number) =>
      getItemMarkUp(item, index)
    );
  };

  return (
    <ul ref={listRef} className={styles.list}>
      {renderItems()}
    </ul>
  );
};

export default List;
