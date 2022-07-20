import axios from "axios";
import { ACTIONS } from "./constants";
export const allNews = async (url, dispatchData, loading) => {
  try {
    loading(true);
    const response = await axios.get(url);
    loading(false);
    dispatchData({ type: ACTIONS.NO_OF_PAGES, payload: response.data.nbPages });
  } catch (e) {
    loading(false);
    alert("Please try again in some time");
  }
};
export const getNewsFeed = async (url, dispatchData, loading) => {
  try {
    loading(true);
    const response = await axios.get(url);
    loading(false);
    dispatchData({ type: ACTIONS.NEWS_FEED, payload: response.data.hits });
  } catch (e) {
    loading(false);
    alert("Please try again in some time");
    dispatchData({ type: ACTIONS.NEWS_FEED, payload: [] });
  }
};
export const removeNewsFeed = (dispatchData) => {
  dispatchData({ type: ACTIONS.NEWS_FEED, payload: [] });
};
