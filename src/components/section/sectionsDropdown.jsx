import { useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import Select from "react-select";

const Container = styled.div`
  margin-top: 0.5rem;
`;

const dropdownStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#f5f5f7",
    border: 0,
    boxShadow: 0,
    fontSize: "2rem",
    borderRadius: "10px",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    ":hover": {
      backgroundColor: "#e7e8ec",
    },
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: "0 4px",
    border: "0",
  }),
  option: (styles, state) => ({
    ...styles,
    color: state.isSelected ? "#ffffff" : "#505050",
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "#8b8b8b",
  }),
};

const SectionsDropdown = ({ sections, sectionId }) => {
  const history = useHistory();
  const location = useLocation();

  const formattedSections = sections.map(({ section, instructors, _id }) => {
    return {
      value: _id,
      label: `Section ${section} — ${
        (instructors && instructors.join(", ")) || "no listed instructors"
      }`,
    };
  });

  const getSection = () => {
    const found = formattedSections.find(({ value }) => value === sectionId);
    return found ? found : { value: -1, label: "-" };
  };

  const handleChange = ({ value }) => {
    if (value > 0) {
      history.push(
        `${location.pathname.substring(
          0,
          location.pathname.lastIndexOf("/")
        )}/${value}`
      );
    }
  };

  return (
    <Container>
      <Select
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        defaultValue={getSection()}
        isSearchable={false}
        menuPlacement={"auto"}
        name="sections"
        options={[{ value: -1, label: "-" }, ...formattedSections]}
        onChange={handleChange}
        styles={dropdownStyles}
      />
    </Container>
  );
};

export default SectionsDropdown;
