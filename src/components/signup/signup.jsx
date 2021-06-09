import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import config from "./../../config";

const Container = styled.div`
  height: calc(100% - 5rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  padding: 2rem;
  box-shadow: rgb(236 237 237 / 40%) 0px 2px 5px,
    rgb(142 147 148 / 20%) 0px 0px 5px;
  font-family: "Calibri", sans-serif;

  display: flex;
  flex-direction: column;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  margin-right: 1rem;
`;

const FormElement = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;

  :last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.h6``;

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

const SignUp = () => {
  const history = useHistory();

  const [signupState, setSignUpState] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (target) => {
    const value = target.value;
    const name = target.name;

    setSignUpState((prevState) => {
      return {
        ...prevState,
        ...{
          [name]: value,
        },
      };
    });
  };

  const handleSignUp = async () => {
    try {
      await axios.post(
        `${config.auth_api}/auth/signup?key=thisisasecret@!(*)_123`,
        {
          ...signupState,
        }
      );
      history.push("/login");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <Container>
      <Box>
        {error && <Error>{error}</Error>}
        <FormElement>
          <Label>Username</Label>
          <Input
            type="text"
            name="username"
            value={signupState.username}
            onChange={(e) => handleChange(e.target)}
          />
        </FormElement>
        <FormElement>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={signupState.password}
            onChange={(e) => handleChange(e.target)}
          />
        </FormElement>
        <ButtonsContainer>
          <Button
            className="btn btn-primary"
            onClick={handleSignUp}
            style={{ backgroundColor: "#7073fb", borderColor: "#7073fb" }}
          >
            Sign Up
          </Button>
        </ButtonsContainer>
      </Box>
    </Container>
  );
};

export default SignUp;
