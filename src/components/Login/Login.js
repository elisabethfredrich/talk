import Button from "../StyledComponents/Button";
import Input from "../Input/Input";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserStatusContext } from "../UserStatusContext";
import Form from "../StyledComponents/Containers/Form";
import HorizontalLine from "../StyledComponents/HorizontalLine";
import Container from "../StyledComponents/Containers/Container";
import "./Login.css";
import { doUserLogIn } from "../../API/UserAPICalls";

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const inputs = [
    {
      id: 1,
      placeholder: "Email",
      type: "email",
      required: true,
      name: "email",
      errorMessage: "A valid email is required",
    },
    {
      id: 2,
      placeholder: "Password",
      type: "password",
      required: true,
      name: "password",
      errorMessage: "Password is required",
    },
  ];

  const navigate = useNavigate();
  const user = useContext(UserStatusContext);

  function goToRegister() {
    navigate("/register");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await doUserLogIn(
      formValues.email,
      formValues.password,
      user,
      setErrorMessage
    );
  };

  const onChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-content-container">
      <Container slim>
        <h1>Welcome back!</h1>
        <Form id="form" onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <Input
              key={input.id}
              {...input}
              values={formValues[input.name]}
              onChange={onChange}
            ></Input>
          ))}
          <Button large>Login</Button>
          <div className="error-message-login">
            {errorMessage !== "" && <p>{errorMessage}</p>}
          </div>
        </Form>
      </Container>
      <HorizontalLine width="80%" />
      <Container>
        <h2>New here?</h2>
        <Button large onClick={goToRegister}>
          Register here
        </Button>
      </Container>
    </div>
  );
};

export default Login;
