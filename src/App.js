import React, { useState, useEffect } from "react";
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
  async function useHackernewsAPI() {
    const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
    setResults(response.data.hits);
    console.log(response);
  }
  useEffect(() => {
    useHackernewsAPI();
    //.then(response => setResults(response.data.hits));
    return () => null;
  }, []);
  return (
    <div>
      <form
        onSubmit={event => {
          event.preventDefault();
          useHackernewsAPI();
        }}
      >
        <input
          type="text"
          placeholder="Search text"
          value={query}
          onChange={({ target: { value } }) => setQuery(value)}
        />
        <button type="submit" onClick={() => useHackernewsAPI()}>
          Search
        </button>
      </form>
      <ul>
        {results.map(result => (
          <li key={result.objectID}>
            <a href={result.url}>{result.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
