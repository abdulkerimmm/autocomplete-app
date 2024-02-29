import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(false);
  const searchRef = useRef();
  const arrays = [
    {
      id: 1,
      title: "title 1",
    },
    {
      id: 2,
      title: "Title 1",
    },
    {
      id: 3,
      title: "article 2",
    },
    {
      id: 4,
      title: "Article 2",
    },
  ];

  const isTyping = search.replace(/\s+/, "").length > 0;
  // console.log("isTyping", isTyping);
  // console.log("results", results);
  search && console.log("search", search);

  useEffect(() => {
    if (search) {
      const searchResults = arrays.filter((array) =>
        array.title.toLowerCase().includes(search.toLowerCase())
      );
      console.log("searchResults.length", searchResults.length);
      {
        searchResults.length > 0
          ? setResults(searchResults)
          : setResults(false);
      }
    } else {
      setResults(false);
    }
  }, [search]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleClickOutside = (e) => {
    if (!searchRef.current.contains(e.target)) {
      setSearch("");
    }
  };

  return (
    <div className="App">
      <div ref={searchRef}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isTyping && (
        <div>
          {results &&
            results.map((result) => <div key={result.id}>{result.title}</div>)}
          {!results && <p>not result about {search}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
