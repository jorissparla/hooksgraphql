import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import "./App.css";

const useInput = defaultValue => {
  const [input, setInput] = useState(defaultValue);
  return { value: input, onChange: ({ target: { value } }) => setInput(value) };
};
export default function App() {
  const [results, setResults] = useState([]);
  const search = useInput("reacthooks");
  const [query, setQuery] = useState("reacthooks");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchInputRef = useRef();
  async function useHackernewsAPI() {
    setLoading(true);
    try {
      const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
      setResults(response.data.hits);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  }
  useEffect(() => {
    useHackernewsAPI();
    //.then(response => setResults(response.data.hits));
    return () => null;
  }, []);
  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded">
      <img src="https://icon.now.sh/react/c0c" className="float-right h-12" alt="" />

      <h1 className="text-grey-darkest font-thin">Hooks News</h1>
      <form
        className="mb-2"
        onSubmit={event => {
          event.preventDefault();
          useHackernewsAPI();
        }}
      >
        <input
          className="border p-1 rounded"
          type="text"
          placeholder="Search text"
          value={query}
          onChange={({ target: { value } }) => setQuery(value)}
          ref={searchInputRef}
        />
        <button type="submit" onClick={() => useHackernewsAPI()}>
          Search
        </button>
        <button
          className="bg-orange"
          onClick={() => {
            setQuery("");
            searchInputRef.current.focus();
          }}
        >
          Clear
        </button>
      </form>
      {loading ? (
        <div>Loading</div>
      ) : (
        <ul className="list-reset leading-normal">
          {results.map(result => (
            <li key={result.objectID}>
              <a className="text-indigo-dark hover:text-indigo-darkest" href={result.url}>
                {result.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      {error && <div>{error.message}</div>}
    </div>
  );
}
