import { useEffect, useState } from "react";
import "./App.css";
import { NewsFeed } from "./components/news-feed";
import { allNews, useData } from "./helpers";
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    data: { page },
    dispatchData,
  } = useData();
  let url = `https://hn.algolia.com/api/v1/search?query=REACT&page=${page}`;
  useEffect(() => {
    allNews(url, dispatchData, setIsLoading);
  }, []);
  return (
    <div className="App">
      <h1 className="bold m-1 text-lg ">Stay Updated With React</h1>
      <NewsFeed url={url} isLoading={isLoading} setIsLoading={setIsLoading} />
    </div>
  );
}

export default App;
