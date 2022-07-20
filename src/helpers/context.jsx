import { createContext, useContext, useReducer } from "react";
import { ACTIONS } from "./constants";

const DataContext = createContext(null);
const initialData = {
  populatedFeed: [],
  searchQuery: "",
  page: 0,
  nbPages: null,
};
const dataReducer = (data, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.NO_OF_PAGES:
      return { ...data, nbPages: payload - 1 };
    case ACTIONS.NEWS_FEED:
      return { ...data, populatedFeed: payload };
    case ACTIONS.REMOVE_ARTICLE:
      const filteredData = data.populatedFeed.filter(
        (news) => news.objectID !== payload
      );
      return { ...data, populatedFeed: filteredData };
    case ACTIONS.HANDLE_SEARCH:
      return {
        ...data,
        searchQuery: payload,
      };
    case ACTIONS.INCREMENT_PAGE:
      return {
        ...data,
        page: data.page + 1,
      };
    case ACTIONS.DECREMENT_PAGE:
      return {
        ...data,
        page: data.page - 1,
      };
    case ACTIONS.HANDLE_PAGE:
      if (payload - 1 > 0 && payload - 1 <= data.nbPages)
        return {
          ...data,
          page: payload - 1,
        };
      else
        return {
          ...data,
          page: 0,
        };
    default:
      return data;
  }
};
const DataProvider = ({ children }) => {
  const [data, dispatchData] = useReducer(dataReducer, initialData);
  return (
    <DataContext.Provider value={{ data, dispatchData }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);
export { DataProvider, useData };
