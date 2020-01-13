import React from "react";
import ReactDOM from "react-dom";
import DropDown from "./components/DropDown";

export interface Content {
  title: string;
  id: number;
}

let _id = 0;

const movies: Content[] = [
  {
    title: "Star Wars",
    id: _id++
  },
  {
    title: "Dark Knight",
    id: _id++
  },
  {
    title: "Lego Movie",
    id: _id++
  },
  {
    title: "Jaws",
    id: _id++
  },
  {
    title: "Mission Impossible",
    id: _id++
  }
];

const food: Content[] = [
  {
    title: "Adulterated food",
    id: _id++
  },
  {
    title: "Camping food",
    id: _id++
  },
  {
    title: "Diet food",
    id: _id++
  },
  {
    title: "Finger food",
    id: _id++
  },
  {
    title: "Fresh food",
    id: _id++
  },
  {
    title: "Frozen food",
    id: _id++
  },
  {
    title: "Functional food",
    id: _id++
  }
];

const App = () => (
  <>
    <DropDown content={movies} title="Movies:" />
    <DropDown width={300} content={food} title="Food:" />
  </>
);

ReactDOM.render(<App />, document.getElementById("root"));
