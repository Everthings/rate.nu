import styled from "styled-components";
import ReactStars from "react-stars";

const StarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Stars = ({ value }) => {
  return (
    <StarContainer>
      <ReactStars
        count={5}
        char="⬤"
        color1={"#e5e5e5"}
        color2={"#7371fc"}
        value={value}
        edit={false}
      />
    </StarContainer>
  );
};

export default Stars;
