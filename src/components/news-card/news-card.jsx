import React from "react";
import { ACTIONS, useData } from "../../helpers";
import "./news-card.css";
const NewsCard = ({ news }) => {
  const { dispatchData } = useData();
  const { title, author, url, objectID } = news;
  const removeArticle = () => {
    dispatchData({ type: ACTIONS.REMOVE_ARTICLE, payload: objectID });
  };
  return (
    <article className="news-card p-1 m-1 b-sm flex flex-column justify-space-bw">
      <section className="flex flex-column">
        <h1 className="text-bright">{title}</h1>
        <small className="text-light">-by {author}</small>
      </section>
      <section className="flex align-center gap-sm  mt-sm">
        <a
          href={url}
          target="_blank"
          className="text-medium text-underline cursor-pointer"
          rel="noreferrer"
        >
          Read More
        </a>
        <button onClick={removeArticle} className="b-sm remove-btn">
          Remove article
        </button>
      </section>
    </article>
  );
};

export { NewsCard };
