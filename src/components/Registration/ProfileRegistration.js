import Button from "../StyledComponents/Button";
import Input from "../Input/Input";
import Form from "../StyledComponents/Containers/Form";
import Container from "../StyledComponents/Containers/Container";
import "./Register.css";
import { useState, useContext } from "react";
import { UserStatusContext } from "../UserStatusContext";
import PictureUpload from "../ProfilePicture/PictureUpload";
import getCurrentUser, {
  registerUser,
  duplicateEmail,
} from "../../API/UserAPICalls.js";

const ProfileRegister = () => {
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    repeatpassword: "",
    nativelanguage: "",
    learninglanguage: "",
    location: "",
  });

  const [errorMessagePicture, setErrorMessagePicture] = useState("");
  const [errorMessageNativeLanguage, setErrorMessageNativeLanguage] =
    useState("");
  const [errorMessageLearningLanguage, setErrorMessageLearningLanguage] =
    useState("");
  const [errorDuplicateEmail, setErrorDuplicateEmail] = useState("");
  const [picture, setPicture] = useState("");
  const user = useContext(UserStatusContext);

  const inputs = [
    {
      id: 200,
      placeholder: "First name",
      type: "text",
      required: true,
      name: "firstname",
      errorMessage:
        "First name must start with a capital letter and can only contain letters.",
      pattern: "^[A-ZÀ-Ÿ][a-zA-ZÀ-Ÿà-ÿ-' ]*$",
    },
    {
      id: 201,
      placeholder: "Last name",
      type: "text",
      required: true,
      name: "lastname",
      errorMessage:
        "Last name must start with a capital letter and can only contain letters.",
      pattern: "^[A-ZÀ-Ÿ][a-zA-ZÀ-Ÿà-ÿ-' ]*$",
    },
    {
      id: 203,
      placeholder: "Email",
      type: "email",
      required: true,
      name: "email",
      errorMessage: "The email must be valid.",
    },
    {
      id: 204,
      placeholder: "Password",
      type: "password",
      required: true,
      name: "password",
      errorMessage:
        "Password must be 8-20 characters long and include at least 1 letter, 1 number and 1 special character.",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    },
    {
      id: 205,
      placeholder: "Repeat password",
      type: "password",
      required: true,
      name: "repeatpassword",
      errorMessage: "The password does not match the password above.",
      pattern: formValues.password,
    },
    {
      id: 206,
      placeholder: "Location, i.e., your country or city of residence.",
      type: "text",
      name: "location",
      pattern: "^[A-ZÀ-Ÿ][a-zA-ZÀ-Ÿà-ÿ-, ]*$",
      errorMessage:
        "Location must start with a capital letter and can only contain letters.",
    },
  ];

  async function handleSubmit(e) {
    e.preventDefault();

    const duplicateMail = await duplicateEmail(formValues.email);
    if (duplicateMail.length > 0) {
      setErrorDuplicateEmail(
        "This email is already registered, please use another email."
      );
    } else {
      setErrorDuplicateEmail("");
    }
    if (
      (formValues.nativelanguage === "") |
      (formValues.nativelanguage === "Select Native Language")
    ) {
      setErrorMessageNativeLanguage("Please select your native language.");
    } else {
      setErrorMessageNativeLanguage("");
    }
    if (
      (formValues.learninglanguage === "") |
      (formValues.learninglanguage === "Select Learning Language")
    ) {
      setErrorMessageLearningLanguage(
        "Please select the language you want to learn."
      );
    } else {
      setErrorMessageLearningLanguage("");
    }
    if (picture === "") {
      setErrorMessagePicture("Please upload a picture (jpg/png).");
    } else {
      setErrorMessagePicture("");
    }
    await registerUser(
      formValues.firstname,
      formValues.lastname,
      formValues.email,
      formValues.password,
      formValues.nativelanguage,
      formValues.learninglanguage,
      formValues.location,
      picture
    );
    if (getCurrentUser() !== null) user.setLoggedIn(true);
  }

  const onChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-content-container">
      <div className="register-container">
        <div className="pic-and-error-message-container">
          <PictureUpload setPicture={setPicture} />
          {errorMessagePicture !== "" && (
            <p className="error-message-pic-registration">
              {errorMessagePicture}
            </p>
          )}
        </div>
        <Container blue slim>
          <Form onSubmit={handleSubmit}>
            <div className="h3-container">
              <h3>Create account</h3>
            </div>
            {inputs.map((input) => (
              <Input
                key={input.id}
                {...input}
                values={formValues[input.name]}
                onChange={onChange}
              ></Input>
            ))}
            <div className="language-selection">
              <select id="languages" name="nativelanguage" onChange={onChange}>
                <option>Select Native Language</option>
                <option value="denmark">Danish - dansk</option>
                <option value="uk">English</option>
                <option value="fr">French - français</option>
                <option value="de">German - Deutsch</option>
              </select>
            </div>
            <div className="error-message-language">
              {errorMessageNativeLanguage !== "" && (
                <p>{errorMessageNativeLanguage}</p>
              )}
            </div>

            <div className="language-selection">
              <select
                id="languages"
                name="learninglanguage"
                onChange={onChange}
              >
                <option>Select Learning Language</option>
                <option value="denmark">Danish - dansk</option>
                <option value="uk">English</option>
                <option value="fr">French - français</option>
                <option value="de">German - Deutsch</option>
              </select>
            </div>
            <div className="error-message-language">
              {errorMessageLearningLanguage !== "" && (
                <p>{errorMessageLearningLanguage}</p>
              )}
            </div>

            <Button red className="register-button">
              Sign up
            </Button>
            <div className="error-message-duplicate-email">
              <p>{errorDuplicateEmail}</p>
            </div>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default ProfileRegister;
