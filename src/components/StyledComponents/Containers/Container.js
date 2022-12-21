import styled, { css } from "styled-components";

const Container = styled.div`
  padding: 2.5rem;
  padding-right: 2.5rem;
  padding-left: 2rem;
  align-items: center;
  margin: 1rem;
  display: flex;
  flex-direction: column;

  ${(props) =>
    props.blue &&
    css`
      background-color: var(--primary-blue);
    `}

  ${(props) =>
    props.slim &&
    css`
      width: 27rem;
    `}
 

${(props) =>
    props.chatOverview &&
    css`
      background-color: var(--primary-blue);
      margin-left: 0rem;
      display: inline-block;
      margin-top: 0;
      margin-bottom: 0;
      padding-bottom:0;
      padding-top:0;
      overflow-y:scroll;
      max-height:91vh;
      grid-row:1/3;
      padding-left: 0rem
      padding-right: 0rem
    `}
`;

export default Container;
