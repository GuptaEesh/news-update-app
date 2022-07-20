import React, { useEffect } from "react";
import { getNewsFeed, removeNewsFeed, useData } from "../helpers";
import { NewsCard } from "./news-card/news-card";
import { PaginationOptions } from "./pagination-options";
import { SearchField } from "./search-field";
import Loading from "react-loading";
const NewsFeed = ({ url, isLoading, setIsLoading }) => {
  const {
    data: { page, populatedFeed, searchQuery },
    dispatchData,
  } = useData();
  useEffect(() => {
    getNewsFeed(url, dispatchData, setIsLoading);
  }, [page]);
  let filteredFeed = populatedFeed.filter(
    (news) =>
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.author.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      <SearchField />
      <PaginationOptions />
      {isLoading ? (
        <div className="flex align-center justify-center h-full">
          <Loading type="spinningBubbles" color="var(--loader)" />
        </div>
      ) : !filteredFeed?.length ? (
        <span className="flex align-center justify-center m-1 bold">
          No records found, kindly change the page
        </span>
      ) : (
        <section className="feed-grid m-1">
          {filteredFeed?.map((news) => (
            <NewsCard key={news.objectID} news={news} />
          ))}
        </section>
      )}
    </div>
  );
};

export { NewsFeed };
