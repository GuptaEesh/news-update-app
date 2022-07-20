import React from "react";
import { ACTIONS, useData } from "../helpers";

const SearchField = () => {
  const {
    data: { searchQuery },
    dispatchData,
  } = useData();
  const handleInput = (e) => {
    dispatchData({ type: ACTIONS.HANDLE_SEARCH, payload: e.target.value });
  };
  const clearTextField = () => {
    dispatchData({ type: ACTIONS.HANDLE_SEARCH, payload: "" });
  };
  return (
    <section className="relative flex align-center ">
      <input
        placeholder="Search by title or author..."
        type="text"
        value={searchQuery}
        onChange={handleInput}
      />
      <span
        aria-roledescription="button"
        onClick={clearTextField}
        className="bold clear-search absolute cursor-pointer"
      >
        X
      </span>
    </section>
  );
};

export { SearchField };
