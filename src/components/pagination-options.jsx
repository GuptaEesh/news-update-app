import React, { useEffect, useRef, useState } from "react";
import { ACTIONS, useData } from "../helpers";

const PaginationOptions = () => {
  const [pageInput, setPageInput] = useState({ status: false, value: "" });
  const {
    data: { nbPages, page },
    dispatchData,
  } = useData();
  const inputRef = useRef();
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [pageInput]);
  const changePage = (action) => {
    dispatchData({ type: action });
  };
  const activateInput = () => {
    setPageInput((prev) => ({ ...prev, status: !prev.status, value: "" }));
  };
  const deactivateInput = (e) => {
    if (e.key === "Enter") {
      dispatchData({ type: ACTIONS.HANDLE_PAGE, payload: e.target.value });
      setPageInput((prev) => ({ ...prev, status: !prev.status, value: "" }));
    }
  };
  const changeHandler = (e) => {
    setPageInput((prev) => ({ ...prev, value: e.target.value }));
  };
  return (
    <div className="text-center">
      {!pageInput.status && (
        <button
          disabled={page < 1 || page > nbPages}
          className="remove-btn change-page b-sm text-md"
          onClick={() => changePage(ACTIONS.DECREMENT_PAGE)}
        >
          &lt;
        </button>
      )}
      {pageInput.status ? (
        <input
          ref={inputRef}
          className="page-input"
          type="number"
          max={nbPages}
          value={pageInput.value}
          onChange={changeHandler}
          onKeyDown={deactivateInput}
        />
      ) : (
        <span onClick={activateInput} className="text-md page-flasher">
          {Number(page) + 1}/{Number(nbPages) + 1}
        </span>
      )}
      {!pageInput.status && (
        <button
          disabled={page >= nbPages || page > nbPages}
          className="remove-btn change-page b-sm text-md"
          onClick={() => changePage(ACTIONS.INCREMENT_PAGE)}
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export { PaginationOptions };
