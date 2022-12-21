import styled, { css } from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;

  ${(props) =>
    props.required &&
    css`
      &::before {
        content: "*";
        color: var(--primary-red);
      }
    `}
`;

export default Container;
