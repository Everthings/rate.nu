import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { date2Text } from "../../utils/dateUtils";
import Stars from "./stars";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Box = styled.div`
  padding: 1rem;
  box-shadow: rgb(236 237 237 / 40%) 0px 2px 5px,
    rgb(142 147 148 / 20%) 0px 0px 5px;
  font-family: "Calibri", sans-serif;
  overflow: auto;
  width: fit-content;
  height: fit-content;
  margin-right: 1rem;
  margin-bottom: 1rem;

  max-width: 47%;

  @media only screen and (max-width: 600px) {
    width: 100%;
    max-width: 100%;
    margin-right: 0;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const LeftPart = styled.div`
  flex: 2;
`;

const RightPart = styled.div`
  flex: 1;
  padding: 0 10px;
  min-width: 100px;
`;

const BottomPart = styled.div`
  margin-top: 0.5rem;
  text-align: center;
`;

const TextBox = styled.p`
  background-color: #f7f8fa;
  border-radius: 10px;
  padding: 16px;
`;

const Rating = styled.div`
  margin-bottom: 10px;

  :last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.p`
  text-align: center;
`;

const Text = styled.p`
  text-align: center;
  margin-top: 0;
  text-decoration: underline;
`;

const EvalsBox = ({ evals }) => {
  const commentEvals = evals.filter(({ comments }) => comments.length > 0);

  const smallScreen = useMediaQuery({
    query: "(max-width: 600px)",
  });

  return (
    <Container>
      {commentEvals.map(
        ({
          _id,
          instructor_rating,
          course_rating,
          extra_hours,
          difficulty_rating,
          comments,
          timestamp,
        }) => {
          return (
            <Box key={_id}>
              <Row>
                <LeftPart>
                  <TextBox>{comments}</TextBox>
                </LeftPart>
                {!smallScreen && (
                  <RightPart>
                    <Rating>
                      <Label>course rating</Label>
                      <Stars value={course_rating} />
                    </Rating>
                    <Rating>
                      <Label>instructor rating</Label>
                      <Stars value={instructor_rating} />
                    </Rating>
                    <Rating>
                      <Label>difficulty rating</Label>
                      <Stars value={difficulty_rating} />
                    </Rating>
                    <Rating>
                      <Label>hours outside of class</Label>
                      <Text>{extra_hours}</Text>
                    </Rating>
                  </RightPart>
                )}
              </Row>
              <BottomPart>— {date2Text(timestamp)} —</BottomPart>
            </Box>
          );
        }
      )}
    </Container>
  );
};

export default EvalsBox;
