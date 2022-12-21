import Button from "../StyledComponents/Button";
import Input from "../Input/Input";
import Form from "../StyledComponents/Containers/Form";
import Container from "../StyledComponents/Containers/Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HorizontalLine from "../StyledComponents/HorizontalLine";
import PictureUpload from "../ProfilePicture/PictureUpload";
import "./Register.css";
import ShortInfo from "../ShortInfo/ShortInfo";
import getCurrentUser from "../../API/UserAPICalls";
import { registerGroup } from "../../API/SpecificAPICalls";

const GroupRegistration = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    language: "",
    location: "",
  });

  const [errorMessagePicture, setErrorMessagePicture] = useState("");
  const [errorMessageLanguage, setErrorMessageLanguage] = useState("");
  const [picture, setPicture] = useState("");
  let currentUser = getCurrentUser();
  const navigate = useNavigate();

  const inputs = [
    {
      id: 100,
      placeholder: "Group name, e.g., 'Ballet Lovers'.",
      type: "text",
      required: true,
      errorMessage: "Group name must be filled out.",
      name: "name",
    },
    {
      id: 101,
      placeholder: "Location, e.g., 'Paris' or 'Online'.",
      type: "text",
      errorMessage:
        "Location must start with a capital letter and can only contain letters.",
      pattern: "^[A-ZÀ-Ÿ][a-zA-ZÀ-Ÿà-ÿ-, ]*$",
      name: "location",
    },
  ];

  const onChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      (formValues.language === "Select Language") |
      (formValues.language === "")
    ) {
      setErrorMessageLanguage("Please select a language for the group.");
    } else {
      setErrorMessageLanguage("");
    }
    if (picture === "") {
      setErrorMessagePicture("Please upload a picture (jpg/png).");
    } else {
      setErrorMessageLanguage("");
    }
    await registerGroup(
      formValues.name,
      formValues.language,
      formValues.location,
      currentUser,
      picture,
      navigate
    );
  }

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
        <Container blue slim className="goup-register-container">
          <Form onSubmit={handleSubmit}>
            <div className="h3-container">
              <h3>Create group</h3>
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
              <select id="languages" name="language" onChange={onChange}>
                <option>Select Language</option>
                <option value="denmark">Danish - dansk</option>
                <option value="uk">English</option>
                <option value="fr">French - français</option>
                <option value="de">German - Deutsch</option>
              </select>
            </div>
            <div className="error-message-language">
              {errorMessageLanguage !== "" && <p>{errorMessageLanguage}</p>}
            </div>
            <HorizontalLine width="100%" />

            <div className="member-container">
              <p className="headline-group-members">Group Members</p>
              <ShortInfo
                info={currentUser.attributes.Name}
                img={currentUser.attributes.ProfilePicture.url()}
                badge={currentUser.attributes.NativeLanguage}
                flag={currentUser.attributes.LearningLanguage}
              />
            </div>
            <Button className="register-button" red type="submit">
              Register group
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default GroupRegistration;
