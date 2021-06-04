import { useState, useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import config from "./../../config";
import Stars from "./stars";

const Form = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 34rem;
  margin: auto;
  padding: 2rem;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  color: #7371fc;
`;

const Error = styled.div`
  border: 2px dashed rgb(160, 6, 6);
  background: #ea999957;
  color: rgb(160, 6, 6);
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const FormElement = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 2rem;
`;

const Input = styled.input`
  border: 2px solid #e5e5e5;
  border-radius: 3px;
  padding: 6px;

  :hover {
    border: 2px solid #bfbfbf;
  }

  :focus,
  :active {
    border: 2px solid #2d7ff9;
    box-shadow: inset 0 0 0 2px #cfdfff;
  }
`;

const Select = styled.select`
  background-color: #fff;
  border: 2px solid #e5e5e5;
  border-radius: 3px;
  padding: 6px;

  outline: none;

  :hover {
    border: 2px solid #bfbfbf;
  }

  :focus,
  :active {
    border: 2px solid #2d7ff9;
    box-shadow: inset 0 0 0 2px #cfdfff;
  }
`;

const TextArea = styled.textarea`
  border: 2px solid #e5e5e5;
  border-radius: 3px;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem;
  padding-bottom: 2rem;

  :hover {
    border: 2px solid #bfbfbf;
  }

  :focus,
  :active {
    border: 2px solid #2d7ff9;
    box-shadow: inset 0 0 0 2px #cfdfff;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  margin-right: 1rem;
`;

const Red = styled.span`
  color: red;
`;

const EvaluationForm = () => {
  const history = useHistory();
  const location = useLocation();

  const { courseId, sectionId } = useParams();

  const [formState, setFormState] = useState({
    user_id: 1,
    section_id: -1,
    instructor_rating: 0,
    course_rating: 0,
    extra_hours: 0,
    difficulty_rating: 0,
    comments: "",
  });

  const [courseName, setCourseName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [sectionOptions, setSectionOptions] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        `${config.search_api}/sections/${courseId}?key=thisisasecret@!(*)_123`
      );
      setSectionOptions(data.sections);
      if (data.course) {
        const { subject, number, title } = data.course;
        setCourseName(`${subject} ${number} — ${title}`);
      }
      const found = data.sections.find(({ _id }) => _id === sectionId);
      if (found) {
        const { section, instructors } = found;
        setSectionName(
          `${section} — ${
            (instructors && instructors.join(", ")) || "no listed instructors"
          }`
        );
      }
    }
    fetchData();
  }, [courseId, sectionId]);

  const handleSubmit = async () => {
    try {
      await axios.post(`${config.eval_api}/evals?key=thisisasecret@!(*)_123`, {
        ...formState,
        course_id: courseId,
        section_id: sectionId ? sectionId : formState.section_id,
      });
      history.push(location.pathname.split("/new-eval")[0]);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleCancel = () => {
    history.push(location.pathname.split("/new-eval")[0]);
  };

  const handleChange = (target) => {
    let value = target.value;
    const name = target.name;

    if (name === "extra_hours") value = parseInt(value);

    setFormState((prevState) => {
      return {
        ...prevState,
        ...{
          [name]: value,
        },
      };
    });
  };

  return (
    <Form>
      <Title>New Course Evaluation</Title>

      {error && <Error>{error}</Error>}

      <FormElement>
        <label>
          Course <Red>*</Red>
        </label>
        <Input type="text" value={courseName} disabled />
      </FormElement>

      <FormElement>
        <label>
          Section <Red>*</Red>
        </label>
        {!sectionId && (
          <Select
            onChange={(e) => {
              handleChange({
                name: "section_id",
                value: e.target[e.target.selectedIndex].value,
              });
            }}
          >
            <option value={-1}>-</option>
            {sectionOptions.map(({ _id, section, instructors }) => {
              return (
                <option value={_id} key={section}>
                  {section} —{" "}
                  {(instructors && instructors.join(", ")) ||
                    "no listed instructors"}
                </option>
              );
            })}
          </Select>
        )}
        {sectionId && <Input type="text" value={sectionName} disabled />}
      </FormElement>

      <FormElement>
        <label>
          Instruction Rating <Red>*</Red>
        </label>
        <Stars
          value={formState.instructor_rating}
          handleChange={(val) =>
            handleChange({ name: "instructor_rating", value: val })
          }
        />
      </FormElement>

      <FormElement>
        <label>
          Course Rating <Red>*</Red>
        </label>
        <Stars
          value={formState.course_rating}
          handleChange={(val) =>
            handleChange({ name: "course_rating", value: val })
          }
        />
      </FormElement>

      <FormElement>
        <label>
          Hours per Week Outside of Class <Red>*</Red>
        </label>
        <Input
          type="number"
          min="0"
          max="100"
          name="extra_hours"
          value={formState.extra_hours}
          onChange={(e) => handleChange(e.target)}
        />
      </FormElement>

      <FormElement>
        <label>
          Difficulty Rating <Red>*</Red>
        </label>
        <Stars
          value={formState.difficulty_rating}
          handleChange={(val) =>
            handleChange({ name: "difficulty_rating", value: val })
          }
        />
      </FormElement>

      <FormElement>
        <label>Comments</label>
        <TextArea
          rows="4"
          cols="50"
          name="comments"
          value={formState.comments}
          onChange={(e) => handleChange(e.target)}
        />
      </FormElement>

      <ButtonsContainer>
        <Button
          className="btn btn-primary"
          onClick={handleSubmit}
          style={{ backgroundColor: "#7073fb", borderColor: "#7073fb" }}
        >
          Submit
        </Button>
        <Button className="btn btn btn-secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </ButtonsContainer>
    </Form>
  );
};

export default EvaluationForm;
