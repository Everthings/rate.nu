import { useState, useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import config from "./../../config";
import { averageData } from "../../utils/dataUtils";
import { IconButton, Icon } from "rsuite";
import OverallBox from "./overallBox";
import SectionsDropdown from "./sectionsDropdown";
import EvalsBox from "./evalsBox";

const Container = styled.div`
  margin: 2rem calc(2rem -32px);
  padding: 0px 32px;
  font-family: "Roboto", sans-serif;
  overflow-y: auto;
`;

const SubContainer = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Headers = styled.div`
  :hover {
    margin: 0 -5px;
    padding: 0 5px;
    border-radius: 10px;
    background-color: #e7e8ec;
  }
`;

const LargeHeader = styled.h1``;

const SmallHeader = styled.h2``;

const Section = () => {
  const history = useHistory();
  const location = useLocation();

  const { courseId, sectionId } = useParams();

  const [evals, setEvals] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    async function fetchEvals() {
      const { data } = await axios.get(
        `${config.eval_api}/evals/${courseId}/${sectionId}?key=thisisasecret@!(*)_123`
      );
      setEvals(data);
    }
    async function fetchSection() {
      const { data } = await axios.get(
        `${config.search_api}/sections/${courseId}?key=thisisasecret@!(*)_123`
      );
      setSections(data.sections);
    }
    fetchEvals();
    fetchSection();
  }, [courseId, sectionId]);

  const handleHeadersClick = () => {
    history.push(
      `${location.pathname.substring(0, location.pathname.lastIndexOf("/"))}`
    );
  };

  const handleButtonClick = () => {
    history.push(`${location.pathname}/new-eval`);
  };

  const overall = averageData(evals, [
    "course_rating",
    "instructor_rating",
    "difficulty_rating",
    "extra_hours",
  ]);

  const section = sections.find(({ _id }) => _id === sectionId);

  return (
    <Container>
      <SubContainer>
        {section && (
          <>
            <Headers onClick={handleHeadersClick}>
              <LargeHeader>{`${section.subject} ${section.number}`}</LargeHeader>
              <SmallHeader>{section.title}</SmallHeader>
            </Headers>
            <SectionsDropdown sections={sections} sectionId={sectionId} />
          </>
        )}
      </SubContainer>
      <SubContainer>
        <h4>
          <u>section overall</u> ({evals.length} evals)
        </h4>
        <OverallBox {...overall} />
      </SubContainer>
      <SubContainer>
        <h4>
          <u>comments</u>
        </h4>
        <EvalsBox evals={evals} />
      </SubContainer>
      <SubContainer>
        <IconButton
          onClick={handleButtonClick}
          icon={
            <Icon
              icon="plus"
              style={{ backgroundColor: "#5659ff", borderColor: "#5659ff" }}
            />
          }
          appearance="primary"
          style={{ backgroundColor: "#7073fb", borderColor: "#7073fb" }}
        >
          New Evaluation
        </IconButton>
      </SubContainer>
    </Container>
  );
};

export default Section;
