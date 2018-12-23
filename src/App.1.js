import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { request } from "graphql-request";

import "./App.css";
const url = "http://nlbavwixs.infor.com:4000";

const peopleQuery = `
{
  courses {
    id
    title
  }
}

`;

const useInput = defaultValue => {
  const [input, setInput] = useState(defaultValue);
  return { value: input, onChange: ({ target: { value } }) => setInput(value) };
};
export default function App() {
  const [results, setResults] = useState([]);
  const search = useInput("reacthooks");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const searchInputRef = useRef();
  async function dashboardAPI() {
    setLoading(true);
    const response = await request(url, peopleQuery);
    setResults(response.courses.filter(course => course.title.includes(query)));
    setLoading(false);
    console.log(response);
  }
  useEffect(() => {
    dashboardAPI();
    //.then(response => setResults(response.data.hits));
    return () => null;
  }, []);

  let content = (
    <div>
      <form
        onSubmit={event => {
          event.preventDefault();
          dashboardAPI();
        }}
      >
        <input
          type="text"
          placeholder="Search text"
          value={query}
          onChange={({ target: { value } }) => setQuery(value)}
          ref={searchInputRef}
        />
        <button type="submit" onClick={() => dashboardAPI()}>
          Search
        </button>
        <button
          onClick={() => {
            setQuery("");
            searchInputRef.current.focus();
          }}
        >
          Clear
        </button>
      </form>
      <ul>
        {results.map(result => (
          <li key={result.id}>
            <a href={result.url}>{result.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <form
        onSubmit={event => {
          event.preventDefault();
          dashboardAPI();
        }}
      >
        <input
          type="text"
          placeholder="Search text"
          value={query}
          onChange={({ target: { value } }) => setQuery(value)}
          ref={searchInputRef}
        />
        <button type="submit" onClick={() => dashboardAPI()}>
          Search
        </button>
        <button
          onClick={() => {
            setQuery("");
            searchInputRef.current.focus();
          }}
        >
          Clear
        </button>
      </form>
      {loading ? (
        <div>Loading </div>
      ) : (
        <ul>
          {results.map(result => (
            <li key={result.id}>
              <a href={result.url}>{result.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
