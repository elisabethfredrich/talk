import Container from "../StyledComponents/Containers/InputContainer";
import "./Input.css";
import { useState } from "react";

const Input = (props) => {
  const [focused, setFocused] = useState(false);

  const { id, onChange, onBlur, errorMessage, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="input-container">
      {props.required ? (
        <Container required></Container>
      ) : (
        <Container></Container>
      )}
      <input
        className="input-field"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
        onFocus={() => inputProps.name === "description" && setFocused(true)}
      ></input>
      <span className="error-message">{errorMessage}</span>
    </div>
  );
};
export default Input;
