import styled from "styled-components";
import ReactStars from "react-stars";

const StarContainer = styled.div`
  border: 2px solid #e5e5e5;
  padding-top: 2px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 3px;

  :hover {
    border: 2px solid #bfbfbf;
  }
`;

const Stars = ({ handleChange, value }) => {
  return (
    <StarContainer>
      <ReactStars
        count={5}
        size={20}
        color1={"#e5e5e5"}
        color2={"#ffd700"}
        value={value}
        onChange={handleChange}
      />
    </StarContainer>
  );
};

export default Stars;
