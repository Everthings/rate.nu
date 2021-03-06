import styled from "styled-components";
import { getRatingColor } from "../../utils/colorUtils";

const Box = styled.div`
  padding: 1rem;
  box-shadow: rgb(236 237 237 / 40%) 0px 2px 5px,
    rgb(142 147 148 / 20%) 0px 0px 5px;
  font-family: "Calibri", sans-serif;
  max-width: 25rem;
`;

const Ratings = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  :hover {
    border-radius: 10px;
    background-color: ${({ value }) =>
      value === -1 ? "rgba(229, 229, 229, 0.25)" : getRatingColor(value, 0.25)};
  }
`;

const Value = styled.div`
  margin: 0.5rem;
  height: 4.5rem;
  width: 4.5rem;
  border-radius: 20px;
  font-size: 1.5rem;
  color: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Label = styled.div`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  text-align: center;
  color: #5e5e5e;
`;

const OverallBox = ({ course_rating, difficulty_rating, extra_hours }) => {
  return (
    <Box>
      <Ratings>
        <Container value={isNaN(course_rating) ? -1 : course_rating}>
          <Value style={{ backgroundColor: getRatingColor(course_rating) }}>
            {`${(isNaN(course_rating) && "-") || course_rating}`}
          </Value>
          <Label>
            Course <br /> Rating
          </Label>
        </Container>
        <Container value={isNaN(difficulty_rating) ? -1 : difficulty_rating}>
          <Value style={{ backgroundColor: getRatingColor(difficulty_rating) }}>
            {`${(isNaN(difficulty_rating) && "-") || difficulty_rating}`}
          </Value>
          <Label>
            Difficulty <br /> Rating
          </Label>
        </Container>
        <Container value={isNaN(extra_hours) ? -1 : extra_hours}>
          <Value style={{ backgroundColor: getRatingColor(extra_hours) }}>
            {`${(isNaN(extra_hours) && "-") || extra_hours}`}
          </Value>
          <Label>
            Hours Outside <br /> of Class
          </Label>
        </Container>
      </Ratings>
    </Box>
  );
};

export default OverallBox;
