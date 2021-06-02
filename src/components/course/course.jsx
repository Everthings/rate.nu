import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import config from "./../../config";
import { averageData } from "../../utils/dataUtils";
import OverallBox from "./overallBox";
import SectionsTable from "./sectionsTable";

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

const LargeHeader = styled.h1``;

const SmallHeader = styled.h2``;

const Course = () => {
  const { courseId } = useParams();

  const [evals, setEvals] = useState([]);
  const [sections, setSections] = useState([]);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    async function fetchEvals() {
      const { data } = await axios.get(
        `${config.eval_api}/evals/${courseId}?key=thisisasecret@!(*)_123`
      );
      setEvals(data);
    }
    async function fetchSections() {
      const { data } = await axios.get(
        `${config.search_api}/sections/${courseId}?key=thisisasecret@!(*)_123`
      );
      setSections(data.sections);
      setCourse(data.course);
    }
    fetchEvals();
    fetchSections();
  }, [courseId]);

  const overall = averageData(evals, [
    "course_rating",
    "difficulty_rating",
    "extra_hours",
  ]);

  return (
    <Container>
      <SubContainer>
        {course && (
          <>
            <LargeHeader>{`${course.subject} ${course.number}`}</LargeHeader>
            <SmallHeader>{course.title}</SmallHeader>
          </>
        )}
      </SubContainer>
      <SubContainer>
        <OverallBox {...overall} />
      </SubContainer>
      <SubContainer>
        <SectionsTable sections={sections} evals={evals}></SectionsTable>
      </SubContainer>
      {evals.map(
        ({
          _id,
          section_id,
          instructor_rating,
          course_rating,
          extra_hours,
          difficulty_rating,
          comments,
          timestamp,
        }) => {
          return <div key={_id}></div>;
        }
      )}
    </Container>
  );
};

export default Course;
