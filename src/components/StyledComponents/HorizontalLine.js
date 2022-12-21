import styled, { css } from "styled-components";

const HorizontalLine = styled.hr`
  background-color: var(--primary-red);
  height: 1px;
  border: none;

  ${(props) =>
    props.blue &&
    css`
      background-color: var(--secondary-darkblue);
    `}
`;

export default HorizontalLine;
