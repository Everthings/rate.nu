import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import config from "./../../config";
import Autosuggest from "react-autosuggest";
import theme from "./searchBarTheme.module.css";
import { getColor } from "./../../utils/colorUtils";

const Input = styled.input`
  height: 3rem;
  width: 100%;
  background-color: #f5efff;
  border: 3px solid #cdc1ff;
  border-radius: 10px;
  padding: 0.375rem 0.75rem;

  :focus {
    background-color: #fff;
    border-color: #86b7fe;
  }
`;

const Gray = styled.span`
  color: rgb(223, 223, 223);
`;

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const history = useHistory();

  const handleChange = (e, { newValue }) => {
    setSearch(newValue);
  };

  const handleSuggestionSelected = (e, { suggestion }) => {
    const { _id } = suggestion;
    history.push(`/course/${_id}`);
    setSearch("");
  };

  const handleSuggestionsFetchRequested = async ({ value }) => {
    try {
      const { data } = await axios.get(
        `${config.search_api}/courses?key=thisisasecret@!(*)_123&query=${value}&length=5`
      );
      setSuggestions(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Search Courses",
    value: search,
    onChange: handleChange,
  };

  return (
    <>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={handleSuggestionsClearRequested}
        getSuggestionValue={({ subject, number, title }) =>
          `${subject} ${number} — ${title}`
        }
        onSuggestionSelected={handleSuggestionSelected}
        renderSuggestion={({ subject, number, title, _id }) => (
          <div>
            📔
            <Gray> | </Gray>
            <span style={{ color: `${getColor(subject)}` }}>
              {subject} {number}
            </span>{" "}
            — {title}
          </div>
        )}
        inputProps={inputProps}
        renderInputComponent={(inputProps) => {
          return (
            <Input
              autoFocus
              type="text"
              placeholder={`Search Courses`}
              aria-label="Search"
              {...inputProps}
            />
          );
        }}
        theme={theme}
      />
    </>
  );
};

export default SearchBar;
