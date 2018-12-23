import React, { useState, useEffect } from "react";
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
  async function dashboardAPI() {
    const response = await request(url, peopleQuery);
    setResults(response.courses.filter(course => course.title.includes(query)));
    console.log(response);
  }
  useEffect(() => {
    dashboardAPI();
    //.then(response => setResults(response.data.hits));
    return () => null;
  }, []);
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
        />
        <button type="submit" onClick={() => dashboardAPI()}>
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
