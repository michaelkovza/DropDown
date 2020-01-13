import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  MouseEvent,
  useReducer,
  useRef,
  useState
} from "react";
import styles from "./index.pcss";
import List from "../List";
import Button from "../Button";
import { Content } from "../../App";
import filterBySearchValue from "../../../utils/filterBySearchValue";

interface Props {
  content: Content[];
}

const SELECT = "SELECT";
const REMOVE = "REMOVE";

interface State {
  items: Content[];
  selectedItems: Content[];
}

type Action =
  | { type: "SELECT"; payload: { item: Content } }
  | { type: "REMOVE"; payload: { item: Content } };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SELECT: {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.item.id),
        selectedItems: [...state.selectedItems, action.payload.item]
      };
    }
    case REMOVE: {
      return {
        ...state,
        items: [...state.items, action.payload.item],
        selectedItems: state.selectedItems.filter(
          item => item.id !== action.payload.item.id
        )
      };
    }
    default:
      throw Error(`Something wrong...`);
  }
};

const SearchBox: FC<Props> = ({ content }: Props) => {
  const [counter, setCounter] = useState<number>(0);
  const [isResultsListOpen, setResultsListStatus] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useReducer(reducer, {
    items: [...content],
    selectedItems: []
  });

  const selectItem = (item: Content) =>
    dispatch({ type: SELECT, payload: { item } });
  const deleteItem = (item: Content) =>
    dispatch({ type: REMOVE, payload: { item } });

  const focusOnInput = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const selectItemHandler = (item: Content) => {
    setSearchValue("");
    setResultsListStatus(false);
    setCounter(0);
    selectItem(item);
    focusOnInput();
  };

  const unselectItemHandler = (
    e: MouseEvent<HTMLButtonElement>,
    item: Content
  ) => {
    e.stopPropagation();
    setResultsListStatus(false);
    deleteItem(item);
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setResultsListStatus(true);
    setCounter(0);
  };

  const arrowsNavigationHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const filteredItems: Content[] = filterBySearchValue(
      state.items,
      searchValue
    );

    switch (e.key) {
      case "ArrowDown": {
        if (counter !== filteredItems.length - 1) {
          setCounter(counter + 1);
        }
        break;
      }
      case "ArrowUp": {
        if (counter) {
          setCounter(counter - 1);
        }
        break;
      }
      case "Escape": {
        setResultsListStatus(false);
        setCounter(0);
        break;
      }
      case "Enter": {
        selectItemHandler(filteredItems[counter]);
        break;
      }
    }
  };

  const renderSelectedItems = () => {
    const { selectedItems } = state;

    if (!selectedItems) {
      return null;
    }

    return selectedItems.map((item: Content) => {
      const { title, id } = item;

      return (
        <Button
          className={styles.selectedItem}
          key={id}
          title={`Delete: ${title}`}
          clickHandler={(e: MouseEvent<HTMLButtonElement>) =>
            unselectItemHandler(e, item)
          }
        >
          {title}
        </Button>
      );
    });
  };

  const renderList = () =>
    isResultsListOpen && (
      <List
        counter={counter}
        items={state.items}
        searchValue={searchValue}
        clickHandler={item => selectItemHandler(item)}
      />
    );

  return (
    <>
      <div
        className={styles.searchBox}
        onClick={() => {
          focusOnInput();
          setResultsListStatus(true);
        }}
      >
        {renderSelectedItems()}
        <input
          ref={inputRef}
          className={styles.searchBoxInput}
          type="text"
          placeholder="Placeholder"
          value={searchValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => inputChangeHandler(e)}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
            arrowsNavigationHandler(e)
          }
        />
      </div>
      {renderList()}
    </>
  );
};

export default SearchBox;
