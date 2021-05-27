import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Stars from "./stars";

const Title = styled.h1`
  margin-bottom: 1rem;
  color: #7371fc;
`;

const Error = styled.div`
  background: #ea999957;
  color: rgb(160, 6, 6);
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 34rem;
  margin: auto;
  padding: 2rem;
`;

const FormElement = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 2rem;
`;

const Input = styled.input`
  border: 2px solid #e5e5e5;
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

const TextArea = styled.textarea`
  border: 2px solid #e5e5e5;
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

const EvaluationForm = () => {
  const [formState, setFormState] = useState({
    user_id: -1,
    section_id: -1,
    instructor_rating: 0,
    course_rating: 0,
    extra_hours: 0,
    difficulty_rating: 0,
    comments: "",
  });

  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      console.log(formState);
      await axios.post(
        "https://rate-backend-api.herokuapp.com/evals",
        formState
      );
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleCancel = () => {};

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
        <label>Instruction Rating</label>
        <Stars
          value={formState.instructor_rating}
          handleChange={(val) =>
            handleChange({ name: "instructor_rating", value: val })
          }
        />
      </FormElement>

      <FormElement>
        <label>Course Rating</label>
        <Stars
          value={formState.course_rating}
          handleChange={(val) =>
            handleChange({ name: "course_rating", value: val })
          }
        />
      </FormElement>

      <FormElement>
        <label>Hours per Week Outside of Class</label>
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
        <label>Difficulty Rating</label>
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
        <Button className="btn btn-primary" onClick={handleSubmit}>
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
