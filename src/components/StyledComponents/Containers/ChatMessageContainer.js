import styled, { css } from "styled-components";

const ChatMessageContainer = styled.div`
  max-width: 500px;
  border-radius: 3px;
  padding: 0.5rem;
  color: var(--secondary-lightblue);

  ${(props) =>
    props.otheruser &&
    css`
      background-color: var(--primary-blue);
    `}

  ${(props) =>
    props.user &&
    css`
      background-color: var(--primary-red);
    `}
`;

export default ChatMessageContainer;
