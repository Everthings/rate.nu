import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
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

const Login = () => {
  const history = useHistory();

  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const [, setCookie] = useCookies(["access_token"]);

  const handleChange = (target) => {
    const value = target.value;
    const name = target.name;

    setLoginState((prevState) => {
      return {
        ...prevState,
        ...{
          [name]: value,
        },
      };
    });
  };

  const handleLogin = async () => {
    try {
      const {
        data: { access_token },
      } = await axios.post(
        `${config.auth_api}/auth/login?key=thisisasecret@!(*)_123`,
        {
          ...loginState,
        }
      );
      setCookie("access_token", access_token, {
        path: "/",
        domain: "nulabs.io",
      });
      history.push("/");
    } catch (err) {
      if (err.response.status === 400)
        setError("username and/or password incorrect");
    }
  };

  const handleSignUp = () => {
    history.push("/signup");
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
            value={loginState.username}
            onChange={(e) => handleChange(e.target)}
          />
        </FormElement>
        <FormElement>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={loginState.password}
            onChange={(e) => handleChange(e.target)}
          />
        </FormElement>
        <ButtonsContainer>
          <Button
            className="btn btn-primary"
            onClick={handleLogin}
            style={{ backgroundColor: "#7073fb", borderColor: "#7073fb" }}
          >
            Login
          </Button>
          <Button className="btn btn-warning" onClick={handleSignUp}>
            Sign Up ➜
          </Button>
        </ButtonsContainer>
      </Box>
    </Container>
  );
};

export default Login;
