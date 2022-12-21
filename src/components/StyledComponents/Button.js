import styled, { css } from "styled-components";

const Button = styled.button`
  background: var(--primary-blue);
  border-radius: 4px;
  border: 1px solid var(--secondary-lightblue);
  color: var(--secondary-lightblue);
  margin: 0.5em 0.5em 0.5em;
  padding: 0.4em 1em;
  color: var(--secondary-lightblue);
  min-width: 6em;
  font-size: 0.9rem;
  cursor: pointer;
  z-index: 2;
  height: min-content;
  &:hover {
    background: var(--secondary-blue);
    border: 1.5px solid var(--secondary-blue);
  }

  ${(props) =>
    props.large &&
    css`
      width: 200px;
    `}

  ${(props) =>
    props.lightblue &&
    css`
      background: var(--secondary-lightblue);
      color: var(--primary-blue);
      &:hover {
        background: var(--secondary-blue);
        border: 1.5px solid var(--secondary-blue);
        color: var(--secondary-lightblue);
      }
    `}
  ${(props) =>
    props.small &&
    css`
      font-size: 0.65rem;
      margin: 0.3em 0.3em;
    `}
  ${(props) =>
    props.red &&
    css`
      background: var(--primary-red);
      border: 1.5px solid var(--primary-red);
      &:hover {
        background: var(--secondary-red);
        border: 1.5px solid var(--secondary-red);
      }
    `}
`;
export default Button;
