import styled from "styled-components";

const Input = styled.input`
  height: 3rem;
  background-color: #f5efff;
  border: 3px solid #cdc1ff;
  border-radius: 10px;
  margin-left: 1rem;

  :focus {
    background-color: #fff;
    outline: none;
    box-shadow: 0 0 0;
  }
`;

const SearchBar = () => {
  return (
    <Input
      autoFocus
      className="form-control"
      type="search"
      placeholder={`Search Courses`}
      aria-label="Search"
      data-testid="search-bar"
    />
  );
};

export default SearchBar;
